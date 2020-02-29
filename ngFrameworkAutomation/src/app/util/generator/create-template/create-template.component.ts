import { TextEditorComponent } from './../text-editor/text-editor.component';
import { Router } from '@angular/router';
import { Template } from 'src/app/entities/template/template';
import { TemplateService } from 'src/app/services/template.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Ace } from 'ace-builds';

import * as ace from 'ace-builds'; // ace module ..
import { UCCPipe } from '../myPipes/ucc.pipe';
import { LCCPipe } from '../myPipes/lcc.pipe';
import { ParseTemplateHelperService } from '../parse-template-helper.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  /************************************************************************************************************
  F I E L D S:
  *************************************************************************************************************/
  @ViewChild(TextEditorComponent) textEditorComponent:TextEditorComponent;
  constructor(
    private http             : HttpClient,
    private svc              : TemplateService,
    private currentroute     : ActivatedRoute,
    private router           : Router,
    private parser           : ParseTemplateHelperService
  ) {}

  errors                     = [];
  myError                    = (err) =>{this.displayError("dataLinkError",err)};
  codeEditor      : Ace.Editor;
  templateID      : number;
  template        : Template = new Template();
  uptoDate                   = "loading";
  registeredCaptures         = [];
  formMap                    = {};
  nonRegexStrings            = [];
  capturedFieldNames         = [];
  textEditorContent          = '';
  pipes                      = {};

  UCCPipeInstance            = new UCCPipe(); // Upper Camel Case
  LCCPipeInstance            = new LCCPipe(); // Lower Camel Case

  edititingTitle             = false;



  /************************************************************************************************************
  ngOnInit:
  *************************************************************************************************************/
  ngOnInit(): void {
    this.registerPipes();
  }
  /************************************************************************************************************
  load:
  *************************************************************************************************************/
  load(): void {
    this.currentroute.paramMap.subscribe(
      params =>{this.getTemplateFromDB((parseInt(params.get("id"))));}
    )
  }
  /************************************************************************************************************
  registerPipes:
  *************************************************************************************************************/
  registerPipes(){
    //Pipes
    this.pipes["LCC"] = (inputString: string) => { return this.LCCPipeInstance.transform(inputString) };
    this.pipes["UCC"] = (inputString: string) => { return this.UCCPipeInstance.transform(inputString) };
  }

  /************************************************************************************************************
  ngAfterViewInit:
  *************************************************************************************************************/
  ngAfterViewInit() {
    this.codeEditor = this.textEditorComponent.codeEditor;
    //Add Key Binding
    this.codeEditor.commands.bindKey("ctrl-q",(editor:Ace.Editor) => {this.addCapture();this.refreshTemplate();});
    this.codeEditor.commands.bindKey("ctrl-w",(editor:Ace.Editor) => {this.makeSubTemplate();});
    this.load();
  }

  /************************************************************************************************************
  getTemplateFromDB:
  *************************************************************************************************************/
  getTemplateFromDB(templateId:number){
    if (!isNaN(templateId)) {
      this.svc.show(templateId).subscribe(data => {
        this.codeEditor.setValue(data.content);
        this.codeEditor.clearSelection();
        this.template   = data;
        this.uptoDate   = "loaded";
        this.templateID = this.template.id;
        this.refreshTemplate();
      },this.myError);
    }else{
      this.displayError("bad Template Id","cannot create");
    }
  }
  /************************************************************************************************************
  getTemplateFromDB:
  *************************************************************************************************************/
  createTemplate(){
    let tempTemplate      = new Template();
    tempTemplate.name     = "Untitled Template";
    tempTemplate.content  = "";
    this.svc.create(tempTemplate).subscribe(data => {
      this.template   = data;
      this.templateID = this.template.id;
      this.router.navigateByUrl("template/edit/" + this.templateID);
    },this.myError);
  }

  /************************************************************************************************************
  updateCurrentTemplateInDB:
  *************************************************************************************************************/
  updateCurrentTemplateInDB() {
    this.svc.update(this.template).subscribe(data => {
      if (this.template.content == data.content){
        this.uptoDate = "saved";
      }else{
        this.uptoDate = "saving...";
      }
    },this.myError);
  }

  /************************************************************************************************************
  refreshTemplate:
  *************************************************************************************************************/
  refreshTemplate(){
    this.uptoDate = "saving...";
    this.template.content = this.codeEditor.getValue();
    this.formMap = {};
    this.nonRegexStrings = [];
    this.capturedFieldNames = [];
    this.compileTemplates();
    this.updateCurrentTemplateInDB();
  }

  /************************************************************************************************************
  addCapture:
  *************************************************************************************************************/
  addCapture(){

    let allRanges = this.codeEditor.getSelection().getAllRanges();

    for(let i = 0; i < allRanges.length;i++){
      this.codeEditor.clearSelection();
      let startRow   = allRanges[i].start.row;
      let startCol   = allRanges[i].start.column;
      let endRow     = allRanges[i].end.row;
      let endCol     = allRanges[i].end.column;
      let offset     = 2;
      this.codeEditor.moveCursorTo(startRow,startCol);
      this.codeEditor.insert("?{");
      this.codeEditor.moveCursorTo(endRow,endCol+offset);
      this.codeEditor.insert("}?");
    }
  }

  /************************************************************************************************************
  makeSubTemplate:
  *************************************************************************************************************/
  makeSubTemplate(){
    let allRanges = this.codeEditor.getSelection().getAllRanges();
    if(allRanges.length > 1){
      console.log("cannot make multiple subtemplates");
      return;
    }
    let textToTemplate = this.codeEditor.getSelectedText();


    let tempTemplate     = new Template();
    tempTemplate.name    = "untitledSubTemplate";
    tempTemplate.content = textToTemplate;
    this.svc.create(tempTemplate).subscribe(data => {
      this.svc.addSubtemplate(this.templateID,data.id).subscribe(data => {
        this.refreshTemplate();
        this.template = data;
      },this.myError);
    },this.myError);
  }

  /************************************************************************************************************
  RemoveSubTemplate:
  *************************************************************************************************************/
  removeSubTemplate(id:number){
    this.svc.removeSubtemplate(this.templateID,id).subscribe(data => {
      this.template = data;
      this.refreshTemplate();
    },this.myError);
  }

  /************************************************************************************************************
  compileTemplates:
  *************************************************************************************************************/
  compileTemplates() {
    let results             = this.parser.compileAllTemplates(this.template);
    this.formMap            = results.formMap;
    this.nonRegexStrings    = results.nonRegexStrings;
    this.capturedFieldNames = results.capturedFieldNames;
  }

  /************************************************************************************************************
  getKeys:
  *************************************************************************************************************/
  getKeys(): string[] {
    return Object.getOwnPropertyNames(this.formMap);
  }


  /************************************************************************************************************
    gotoSubTemplate:
    *************************************************************************************************************/
  gotoSubTemplate(id:number) {
    this.router.navigateByUrl("template/edit/" + id);
    this.load();
  }


  /************************************************************************************************************
  displayError:
  *************************************************************************************************************/
  displayError(type:String,text:String): void {
    this.errors.push({type:type,text:text});
    console.log(type);
  }


  /************************************************************************************************************
  editTitle:
  *************************************************************************************************************/
  editTitle(): void {
    this.edititingTitle  = !this.edititingTitle;
    this.updateCurrentTemplateInDB();
  }




}
