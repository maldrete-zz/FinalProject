import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  // fields
  user: User = new User();


  constructor(private http: HttpClient, private svc: UserService,
              private currentroute: ActivatedRoute, private router: Router,
              private templateService: TemplateService) { }



  getUserFromDB(){

  }

  // constructor(private templateService: TemplateService, private currentroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.svc.getUser().subscribe(
      dataSuccess => {
        this.user = dataSuccess;
        console.log(this.user);
      }
    )

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
