import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';
import 'brace';
import 'brace/mode/java';
import 'brace/theme/solarized_dark';



@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  template: Template = new Template();
  arguments = {};
  parsedTemplate = [];
  fullArguments = [];
  finalContent = '';


  constructor(private http: HttpClient, private currentroute: ActivatedRoute, private svc: TemplateService) { }

  ngOnInit(): void {
    let templateId = this.currentroute.snapshot.paramMap.get('id');
    console.log(templateId, this.currentroute);
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

  compileTemplates(data: Template) {
    //Input data into fields
    let myTemplate = data;
    let templateString = myTemplate.content;
    /*
    Create a regex that captures things that look like ?{data}?
    Then we itterate through the string that is the template to find those values
      this is done by capturing next, checking if its a match, inserting into our array,
       and breaking the template so it can find the next one

    */
    let regexp = new RegExp('\\?{([^{}]+)}\\?');
    while (true) {
      let regexArg = regexp.exec(templateString);
      if (!regexArg) {
        this.parsedTemplate.push(templateString);
        break;
      }
      //starts with the whole string. template string is the remaing string that we have.
      // regex tracks are first hits. which gives our value from first hit on regex string to the end of the regex string
      // takes out the regex looks rest of the string for another regex. we split apart the text in to array split by regex
      this.parsedTemplate.push(templateString.substr(0, regexArg.index));


      let innerargs = regexArg[1].split(".");
      if (innerargs.length == 1) {
        this.arguments[regexArg[1]] = "";
        this.fullArguments.push({fullName : regexArg[1], findId:regexArg[1]});
      } else {
        let innerRegex = new RegExp('([a-zA-Z0-9\\.]+)\\.([a-zA-Z0-9\\[\\]]+)');
        let innerRegExArg = innerRegex.exec(regexArg[1]);
        this.arguments[innerRegExArg[1]] = '';
        this.fullArguments.push({fullName : regexArg[1], findId:innerRegExArg[1]});
      }
      templateString = templateString.substr(regexArg.index + regexArg[0].length, templateString.length);
    }

    for (let i = 0; i < myTemplate.subTemplates.length; i++) {
      this.compileTemplates(myTemplate.subTemplates[i]);
    }
    console.log(this.arguments);
    console.log(this.parsedTemplate);
    this.createFullContent();

  }

  print() {
    console.log(this.arguments);
  }

  getKeys(): string[] {
    return Object.getOwnPropertyNames(this.arguments);
  }


  createFullContent() {
    this.finalContent = '';
    for (let i = 0; i < this.fullArguments.length; i++) {
      this.finalContent = this.finalContent.concat(this.parsedTemplate[i]);
      this.finalContent = this.finalContent.concat(this.arguments[this.fullArguments[i].findId]);
    }
    this.finalContent = this.finalContent.concat(this.parsedTemplate[this.parsedTemplate.length - 1]);
  }




}
