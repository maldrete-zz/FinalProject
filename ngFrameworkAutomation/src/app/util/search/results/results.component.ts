import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private templateService: TemplateService, private currentroute: ActivatedRoute) { }

  ngOnInit(): void {
    let keywordResults = this.currentroute.queryParams.subscribe(
      queryParams => {
        console.log(queryParams);
        this.keywordSearch(queryParams.keyword);
      });

  }


  listOfTemplates: Template[] = [];

  keywordSearch(keyword: string) {
    this.templateService.keyword(keyword).subscribe(
      data => {
        this.listOfTemplates = data;
        console.log(data);
      },
      err => { console.error('no matches') }
    )
  }
}
