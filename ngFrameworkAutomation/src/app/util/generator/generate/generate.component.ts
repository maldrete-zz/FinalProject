import { TextEditorComponent } from './../text-editor/text-editor.component';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';


import { LCCPipe } from './../myPipes/lcc.pipe';
import { UCCPipe } from '../myPipes/ucc.pipe';
import { Ace } from 'ace-builds';
import { ParseTemplateHelperService } from '../parse-template-helper.service';
import { PipeManagerService } from '../myPipes/pipe-manager.service';




@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  ngAfterViewInit() {
    this.codeEditor = this.textEditorComponent.codeEditor;
    this.codeEditor.setReadOnly(true);
    let templateId = this.currentroute.snapshot.paramMap.get('id');

    this.svc.show(parseInt(templateId)).subscribe(
      data => {
        this.template = data;
        this.compileTemplates();
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
  template: Template = new Template();
  formMap = {};
  formPlaceholders = {};
  nonRegexStrings = [];
  capturedFieldNames = [];
  textEditorContent = '';
  subtemplates = {};
  currentIncrementalsCount = {};

  //InitiatePipes so we dont have to create it every time of use
  LCCPipeInstance = new LCCPipe(); // Lower Camel Case
  UCCPipeInstance = new UCCPipe(); // Upper Camel Case

  formList =[];




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



  constructor(private http: HttpClient, private currentroute: ActivatedRoute, private svc: TemplateService,
    private parser : ParseTemplateHelperService,    private pipeManager      : PipeManagerService) { }



  ngOnInit(): void {
  }

  compileTemplates() {
    let results                   = this.parser.compileAllTemplates(this.template,this.currentIncrementalsCount,this.formMap);
    this.formMap                  = results.formMap;
    this.formList                 = Object.getOwnPropertyNames(this.formMap);
    this.nonRegexStrings          = results.nonRegexStrings;
    this.capturedFieldNames       = results.capturedFieldNames;
    this.currentIncrementalsCount = results.potentialIncrementals;
    this.assemblePlaceholders();
    this.assembleFullContent();
  }


  getKeys(): string[] {
    return this.formList;
  }
  getAddButtons(): string[] {
    return Object.getOwnPropertyNames(this.currentIncrementalsCount);
  }


  assemblePlaceholders(){
    let formKey = this.getKeys();
    for (let i = 0; i < formKey.length; i++) {
      this.formPlaceholders[formKey[i]] = "input"+i;
    }
  }





  assembleFullContent() {
    this.textEditorContent = '';
    for (let i = 0; i < this.capturedFieldNames.length; i++) {
      this.textEditorContent += this.nonRegexStrings[i];
      let fieldName           = this.capturedFieldNames[i].findId;
      let pipeName            = this.capturedFieldNames[i].pipe;
      let rawUserInput        = this.formMap[fieldName];
      if (rawUserInput == "")   {rawUserInput = this.formPlaceholders[fieldName]};
      let pipe                = this.pipeManager.getPipe(pipeName);
      let captueReplacement   = pipe(rawUserInput);
      this.textEditorContent += captueReplacement;
    }
    this.textEditorContent   += this.nonRegexStrings[this.nonRegexStrings.length - 1];
    this.codeEditor.setValue(this.textEditorContent, -1);
  }


  addField(key:string){
    this.currentIncrementalsCount[key]++;
    this.compileTemplates();

  }




}
