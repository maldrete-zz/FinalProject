import { TextEditorComponent } from './../text-editor/text-editor.component';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';


import { LCCPipe } from './../myPipes/lcc.pipe';
import { UCCPipe } from '../myPipes/ucc.pipe';
import { Ace } from 'ace-builds';




@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  ngAfterViewInit() {
    this.codeEditor = this.textEditorComponent.codeEditor;
    let templateId = this.currentroute.snapshot.paramMap.get('id');

    this.svc.show(parseInt(templateId)).subscribe(
      data => {
        this.template = data;
        this.compileTemplates(data);
      },
      err => {
        console.error(err);
      }
    );
  }
  /*
    this is the code editor we created 'ace' is the tag function of the import.
  */
  codeEditor: Ace.Editor;

  //InitiatePipes so we dont have to create it every time of use
  LCCPipeInstance = new LCCPipe(); // Lower Camel Case
  UCCPipeInstance = new UCCPipe(); // Upper Camel Case

  //FIELDS
  /*
    template - template from the data base.
    formMap - Is the input field(key) and user input(value) (key/value pair -MAP) from the form that user fills out.
    nonRegexStrings - Is a string array of the raw text in between the regex capture group [nonRegexString] ?{example}? [nonRegexString] .
    capturedFieldNames -
    ==============================================================================================================
    A List of captured field names from the the Regex capture group. ?{0.0.ActualFieldName.PipeName}?.
    *                             ?{0.1.ActualFieldName.PipeName}?
    *                               0: The index of the outer Object -
    *                                 1. The index of the inner Object - example: the index of the actual field name (username, password)
    *                                   .ActualFieldName example - username, password, getter, setter
    *                                                  .PipeName - name of the pipe example LCC
    ==============================================================================================================
    textEditorContent - the text/content/code on the text editor. the non captured regex put the captured grous and pipes put together.
  */
  template: Template = new Template();
  formMap = {};
  nonRegexStrings = [];
  capturedFieldNames = [];
  textEditorContent = '';
  pipes = {};


  constructor(private http: HttpClient, private currentroute: ActivatedRoute, private svc: TemplateService) { }

  ngOnInit(): void {


    //Pipes
    this.pipes["LCC"] = (inputString: string) => { return this.LCCPipeInstance.transform(inputString) };
    this.pipes["UCC"] = (inputString: string) => { return this.UCCPipeInstance.transform(inputString) };


  }

  compileTemplates(data: Template) {
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
      let subTemplateOffSet = '';
      if (!parseContentRegexMatch) {
        this.formMap[captureRegexMatch[1]] = "";
        this.capturedFieldNames.push({ pipe: "", findId: captureRegexMatch[1] });
      } else {
        if (parseContentRegexMatch[2] == 'template') {
          console.log(parseContentRegexMatch[1]);
          console.log(parseContentRegexMatch[2]);
          console.log(templateContent);
          subTemplateOffSet = 'we did it';
        } else if (parseContentRegexMatch[2] == 'template[]') {
          console.log(parseContentRegexMatch[1]);
          console.log(parseContentRegexMatch[2]);
          console.log('We did it  Twice! BROS! ');
        } else {
          this.formMap[parseContentRegexMatch[1]] = '';
          this.capturedFieldNames.push({ pipe: parseContentRegexMatch[2], findId: parseContentRegexMatch[1] }); // this grabs the pipe name
        }
      }
      templateContent = templateContent.substr(captureRegexMatch.index + captureRegexMatch[0].length, templateContent.length);
      templateContent = subTemplateOffSet + templateContent;
    }

    for (let i = 0; i < myTemplate.subTemplates.length; i++) {
      this.compileTemplates(myTemplate.subTemplates[i]);
    }

    this.assembleFullContent();
  }


  getKeys(): string[] {
    return Object.getOwnPropertyNames(this.formMap);
  }


  assembleFullContent() {

    this.textEditorContent = '';
    for (let i = 0; i < this.capturedFieldNames.length; i++) {
      this.textEditorContent = this.textEditorContent.concat(this.nonRegexStrings[i]); // grabs raw text and appends the raw text to the full string
      // iterate through each pipe and check to see if it matches the list of pipes we have and call its function.
      let pipeName = this.capturedFieldNames[i].pipe;
      if (!this.pipes[pipeName]) {
        pipeName = undefined;
      }
      if (pipeName) {
        this.textEditorContent = this.textEditorContent.concat(this.pipes[pipeName](this.formMap[this.capturedFieldNames[i].findId]));
      } else {

        this.textEditorContent = this.textEditorContent.concat(this.formMap[this.capturedFieldNames[i].findId]); // grabs the form value at the original capture statement
      }

      //console.log(this.pipes[this.capturedFieldNames[i].pipe]()); // this call the anonymous function and calls it. with () since pipes has anonymous functions.
    }
    this.textEditorContent = this.textEditorContent.concat(this.nonRegexStrings[this.nonRegexStrings.length - 1]);
    // apply the pipes to the live code.
    this.codeEditor.setValue(this.textEditorContent, -1);

  }




}
