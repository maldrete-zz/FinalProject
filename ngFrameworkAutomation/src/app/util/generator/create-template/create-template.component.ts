import { NgForm } from '@angular/forms';
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
import { PipeManagerService } from '../myPipes/pipe-manager.service';

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
    private svc              : TemplateService,
    private currentroute     : ActivatedRoute,
    private router           : Router,
    private parser           : ParseTemplateHelperService,
    public  pipeManager      : PipeManagerService
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

  edititingTitle             = false;
  subTemplatePopup           = false;
  capturePopup               = false;

  typedRecently              = false;
  pendingUpdate              = false;

  subTemplateForm            = {
  "name"                     : "",
  "multiselect"              : false,
  "directive"                : "NONE",
  "extraArgs"                : ""     }

  captureForm            = {
    "name"                     : "",
    "pipe"                     : "NUL",
    "directive"                : "NONE",
    "extraArgs"                : ""     }






  /************************************************************************************************************
  ngOnInit:
  *************************************************************************************************************/
  ngOnInit(): void {
  }
  /************************************************************************************************************
  load:
  *************************************************************************************************************/
  load(): void {
    if(this.currentroute.snapshot.url[1].path == "create"){
      this.createTemplate();
      return;
    }
    this.currentroute.paramMap.subscribe(
      params =>{this.getTemplateFromDB((parseInt(params.get("id"))));}
    )
  }

  /************************************************************************************************************
  ngAfterViewInit:
  *************************************************************************************************************/
  ngAfterViewInit() {
    this.codeEditor = this.textEditorComponent.codeEditor;
    //Add Key Binding
    this.codeEditor.commands.bindKey("ctrl-q",(editor:Ace.Editor) => {this.createCapturePopUp();});
    this.codeEditor.commands.bindKey("ctrl-w",(editor:Ace.Editor) => {this.createSubTemplatePopUp();});
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
        this.hideNav();
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
  tryToUpdateTemplate:
  *************************************************************************************************************/
  tryToUpdateTemplate(){
    if(!this.pendingUpdate){
      this.pendingUpdate = true;
      let attemptToConnect = ()=>{
        this.typedRecently = false;
        setTimeout(()=>{
          if(!this.typedRecently){
            this.updateCurrentTemplateInDB();
          }else{
            attemptToConnect();
          }
        },2500);
      }
      attemptToConnect();
    }

  }
  /************************************************************************************************************
  updateCurrentTemplateInDB:
  *************************************************************************************************************/
  updateCurrentTemplateInDB() {
    this.svc.update(this.template).subscribe(data => {
      this.pendingUpdate = false;
      if (this.template.content == data.content){
        this.uptoDate = "saved";
      }else{
        this.uptoDate = "saving...";
        this.tryToUpdateTemplate();
      }
    },(err) =>{
      this.displayError("dataLinkError",err);
      this.uptoDate = "Error Svaing";
    });
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
    this.typedRecently = true;
    this.tryToUpdateTemplate();
  }

  /************************************************************************************************************
  addCapture:
  *************************************************************************************************************/
  addCapture(){
    this.capturePopup = false;
    let allRanges = this.codeEditor.getSelection().getAllRanges();

    for(let i = 0; i < allRanges.length;i++){
      this.codeEditor.clearSelection();
      let startRow   = allRanges[0].start.row;
      let startCol   = allRanges[0].start.column;
      if(!this.codeEditor.selection.isBackwards()){
        startRow     = allRanges[0].end.row;
        startCol     = allRanges[0].end.column;
      }
      this.codeEditor.moveCursorTo(startRow,startCol);
      this.codeEditor.insert(`?{${this.captureForm.name}=>${this.captureForm.pipe}.${this.captureForm.directive}.${this.captureForm.extraArgs}}?`);
    }
    this.refreshTemplate();
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
    tempTemplate.name    = this.pipeManager.LCCPipeInstance.transform(this.subTemplateForm.name);
    tempTemplate.content = textToTemplate;
    let startRow   = allRanges[0].start.row;
    let startCol   = allRanges[0].start.column;
    if(!this.codeEditor.selection.isBackwards()){
      startRow     = allRanges[0].end.row;
      startCol     = allRanges[0].end.column;
    }
    this.codeEditor.moveCursorTo(startRow,startCol);

    let afterTemplateString = "";
    if(this.subTemplateForm.directive != "NONE"){
      afterTemplateString += "." + this.subTemplateForm.directive + "." + this.subTemplateForm.extraArgs;
    }
    if(this.subTemplateForm.multiselect){
      afterTemplateString += "[]";
    }
    this.codeEditor.insert(`?{${tempTemplate.name}=>template${afterTemplateString}}?`);
    this.subTemplatePopup = false;

    this.subTemplateForm         = {
      "name"                     : "",
      "multiselect"              : false,
      "directive"                : "NONE",
      "extraArgs"                : ""     };

    this.svc.create(tempTemplate).subscribe(data => {
      this.addSubTemplateById(data.id);
    },this.myError);
  }

  /************************************************************************************************************
  addSubTemplateById:
  *************************************************************************************************************/
  addSubTemplateById(subId:number){
    this.svc.addSubtemplate(this.templateID,subId).subscribe(data => {
      this.template = data;
      this.refreshTemplate();
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
    let results             = this.parser.compileAllTemplates(this.template,{},{});
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

  /************************************************************************************************************
  createSubTemplatePopUp:
  *************************************************************************************************************/
  createSubTemplatePopUp(): void {
    this.subTemplatePopup = true;
  }

  /************************************************************************************************************
  createCapturePopUp:
  *************************************************************************************************************/
  createCapturePopUp(): void {
  this.capturePopup = true;
}


  /************************************************************************************************************
  NAVSTUFF:
  *************************************************************************************************************
  *************************************************************************************************************
  *************************************************************************************************************
  *************************************************************************************************************
  *************************************************************************************************************/
  showNav(){
    let sliders =  document.getElementsByClassName("slider");
    for(let i = 0; i < sliders.length;i++){
      sliders[i].classList.add("active");
    }
  }
  hideNav(){
    let sliders =  document.getElementsByClassName("slider");
    for(let i = 0; i < sliders.length;i++){
      sliders[i].classList.remove("active");
    }
  }

  toggleNav(){
    let sliders =  document.getElementsByClassName("slider");
    if(sliders[0].classList.contains("active")){
      this.hideNav();
    }else{
      this.showNav();
    }
  }

}
