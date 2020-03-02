import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  // fields
  user: User = new User();
  listOfTemplates: Template[] = [];

  programming: string[] = ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
    "https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1514070706115-47c142769603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2829&q=80"];

  professional: string[] = ["https://images.unsplash.com/photo-1555601568-c9e6f328489b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    "https://resumegenius.com/wp-content/uploads/2020/01/Clean-Resume-Builder-Template-400x520.png",
    "https://www.howtogeek.com/wp-content/uploads/2018/05/wf_2.png",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.crimes-of-persuasion.com%2Fnigerian%2Fdead_foreigners_3.htm&psig=AOvVaw0RKIS6DI2A1M4ePTHCIWdy&ust=1583269782889000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDZxNvZ_OcCFQAAAAAdAAAAABAD",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dh00_h9JB9A8&psig=AOvVaw272KEOgrn2aB2g8yjw_VnT&ust=1583269830161000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLi-rfHZ_OcCFQAAAAAdAAAAABAD",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.resume-now.com%2F&psig=AOvVaw0NOGuywIJcvCFrmhCspb4F&ust=1583269855662000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDjrv3Z_OcCFQAAAAAdAAAAABAJ"

  ]

  imageMap = { 'programming': this.programming, 'professional': this.professional };


  constructor(private http: HttpClient, private svc: UserService,
    private currentroute: ActivatedRoute, private router: Router,
    private templateService: TemplateService) { }

  // constructor(private templateService: TemplateService, private currentroute: ActivatedRoute) { }

  getUserFromDB() {

  }



  ngOnInit(): void {

    // this.svc.getUser().subscribe(
    //   dataSuccess => {
    //     this.user = dataSuccess;
    //     console.log(this.user);
    //   }
    // )

    let keywordResults = this.currentroute.queryParams.subscribe(
      queryParams => {
        console.log(queryParams);
        this.keywordSearch(queryParams.keyword);
      });

    this.templateService.index().subscribe(
      dataSuccess => {
        this.listOfTemplates = dataSuccess;
        console.log(this.listOfTemplates);
      }
    )

  }



  keywordSearch(keyword: string) {
    this.templateService.keyword(keyword).subscribe(
      data => {
        this.listOfTemplates = data;
        console.log(data);
      },
      err => { console.error('no matches') }
    )
  }

  selectTemplateImage(template: Template): string {
    let imageArray = this.imageMap[template.templateType];

    if (!imageArray) {
      imageArray = this.imageMap.programming;
    }
    let letterNumber = template.name.charCodeAt(0);
    return imageArray[letterNumber % imageArray.length];
  }

  goToTemplatePage(id: number) {
    this.router.navigateByUrl('templates/' + id);
  }




}

