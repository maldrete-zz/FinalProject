import { KeyValuePair } from './../key-value-pair';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';



@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  private template: Template;
  private keyValuePair: KeyValuePair;
   arguments = {};

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
        break;
      }
      this.arguments[regexArg[1]] = "";
      templateString = templateString.substr(regexArg.index + 1, templateString.length);
    }

    for (let i = 0; i < myTemplate.subTemplates.length; i++){
      this.compileTemplates(myTemplate.subTemplates[i]);
    }
    console.log(this.arguments);

  }

  print(){
    console.log(this.arguments);
  }

  getKeys(): string[] {
    return Object.getOwnPropertyNames(this.arguments);
  }




}
