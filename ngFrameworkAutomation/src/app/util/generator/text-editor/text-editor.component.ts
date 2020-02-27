import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


import 'brace';
import 'brace/mode/java';
import 'brace/theme/solarized_dark';
import * as ace from 'ace-builds'; // ace module ..
// language package, choose your own
import 'ace-builds/src-noconflict/mode-java';
// ui-theme package
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const THEME = 'ace/theme/monokai';
const LANG = 'ace/mode/java';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit ,AfterViewInit  {
//Initiate editor
@ViewChild('codeEditor') codeEditorElmRef: ElementRef;
codeEditor: ace.Ace.Editor;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){

    //Editor
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
        highlightActiveLine: false,
        minLines: 30,
        maxLines: Infinity,
        wrap: 100,
        selectionStyle: "line"
    };
      this.codeEditor = ace.edit(element);
      this.codeEditor.setOptions(editorOptions);
      this.codeEditor.setTheme(THEME);
      this.codeEditor.getSession().setMode(LANG);
      this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
    }
}
