import { TextEditorComponent } from './../text-editor/text-editor.component';
import { Router } from '@angular/router';
import { Template } from 'src/app/entities/template/template';
import { TemplateService } from 'src/app/services/template.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Ace } from 'ace-builds';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent:TextEditorComponent;
  ngAfterViewInit() {
    this.codeEditor = this.textEditorComponent.codeEditor;

    //Add Key Binding
    this.codeEditor.commands.bindKey("ctrl-d",(editor:Ace.Editor) => {this.addCapture();this.refreshTemplate();this.compileTemplates()});


    this.getTemplateFromDB();
  }
  codeEditor: Ace.Editor;


  template: Template = new Template();
  templateID: number;
  uptoDate = true;
  registeredCaptures =[];



  constructor(private http: HttpClient, private svc: TemplateService, private currentroute: ActivatedRoute, private router: Router) { }

  getTemplateFromDB(){
    let templateId = this.currentroute.snapshot.paramMap.get('id');
    if (!isNaN(parseInt(templateId))) {
      this.svc.show(parseInt(templateId)).subscribe(
        data => {
          this.template = data;
          this.codeEditor.setValue(this.template.content);
          this.codeEditor.clearSelection();
        },
        err => {
          console.error(err);
        }
      );


    }else{
      let tempTemplate = new Template();
      tempTemplate.name = "Untitled Template";
      tempTemplate.content = "";
      this.svc.create(tempTemplate).subscribe(
        data => {
          this.template = data;
          this.templateID = this.template.id;
          this.router.navigateByUrl("template/edit/" + this.templateID);
        },
        err => {
          console.error(err);
        }
      );
    }

  }


  ngOnInit(): void {

  }

  updateCurrentTemplateInDB() {
    this.svc.update(this.template).subscribe(
      data => {
        this.uptoDate = (this.template.content == data.content)
      },
      err => {
        console.error(err);
      }
    );
  }

  refreshTemplate(){
    this.template.content = this.codeEditor.getValue();
    this.updateCurrentTemplateInDB();
  }


  addCapture(){

    let allRanges = this.codeEditor.getSelection().getAllRanges();

    for(let i = 0; i < allRanges.length;i++){
      this.codeEditor.clearSelection();
      let startRow = allRanges[i].start.row;
      let startCol = allRanges[i].start.column;
      let endRow = allRanges[i].end.row;
      let endCol = allRanges[i].end.column;
      let offset = 2;
      this.codeEditor.moveCursorTo(startRow,startCol);
      this.codeEditor.insert("?{");
      this.codeEditor.moveCursorTo(endRow,endCol+offset);
      this.codeEditor.insert("}?");
    }

  }


  formMap = {};
  nonRegexStrings = [];
  capturedFieldNames = [];
  textEditorContent = '';
  compileTemplates(data: Template = this.template) {
    //Input data into fields
    let myTemplate = data;
    let templateContent = myTemplate.content;
    /*
    Create a regex that captures things that look like ?{data}?
    Then we itterate through the string that is the template to find those values
      this is done by capturing next, checking if its a match, inserting into our array,
       and breaking the template so it can find the next one
      this is the pattern for getting the capture ?{someText}?
    */
    let captureRegex = new RegExp('\\?{([^{}]+)}\\?');
    while (true) {
      let captureRegexMatch = captureRegex.exec(templateContent);
      if (!captureRegexMatch) {
        // if there is no match of the regex pattern ?{someText}?, then add the rest of the string .
        this.nonRegexStrings.push(templateContent);
        break;
      }
      //starts with the whole string. template string is the remaing string that we have.
      // regex tracks are first hits. which gives our value from first hit on regex string to the end of the regex string
      // takes out the regex looks rest of the string for another regex. we split apart the text in to array split by regex
      this.nonRegexStrings.push(templateContent.substr(0, captureRegexMatch.index));


      let parseContentRegex = new RegExp('([a-zA-Z0-9\\.]+)\\.([a-zA-Z0-9\\[\\]]+)');
      let parseContentRegexMatch = parseContentRegex.exec(captureRegexMatch[1]);
      if (!parseContentRegexMatch) {
        this.formMap[captureRegexMatch[1]] = "";
        this.capturedFieldNames.push({pipe: "", findId:captureRegexMatch[1]});
      } else {

        this.formMap[parseContentRegexMatch[1]] = '';
        this.capturedFieldNames.push({pipe : parseContentRegexMatch[2], findId:parseContentRegexMatch[1]}); // this grabs the pipe name
      }
      templateContent = templateContent.substr(captureRegexMatch.index + captureRegexMatch[0].length, templateContent.length);
    }

    for (let i = 0; i < myTemplate.subTemplates.length; i++) {
      this.compileTemplates(myTemplate.subTemplates[i]);
    }

  }






}
