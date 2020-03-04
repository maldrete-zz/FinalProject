import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/entities/template/template';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { TemplateInfo } from 'src/app/entities/templateInfo/template-info';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  // fields
  user: User = new User();
  listOfTemplates: TemplateInfo[] = [];
  searchBarText: string = '';

  programming: string[] = ['https://images.unsplash.com/photo-1544083515-f8e4c60ce215?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
    'https://images.unsplash.com/photo-1567883000508-573f781b8da6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80',
    'https://images.unsplash.com/photo-1534383322781-87885cf4c5d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1666&q=80',
    'https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1519579156976-ebff3a90d4c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/uploads/1412594480669535c9ef9/9d85c477?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1500056870414-4ed74e6936f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80',
    'https://images.unsplash.com/photo-1528922087877-3f44f53a8f7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
    'https://images.unsplash.com/photo-1583115260445-f95fe37202ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1274&q=80'
  ];

  imageMap = { 'programming': this.programming };


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

    // let keywordResults = this.currentroute.queryParams.subscribe(
    //   queryParams => {
    //     console.log(queryParams);
    //     this.keywordSearch(queryParams.keyword);
    //   });

    this.templateService.index().subscribe(
      dataSuccess => {
        this.listOfTemplates = dataSuccess;
        console.log(this.listOfTemplates);
      }
    )

  }



  keywordSearch(keyword: string) {
    if (!keyword) {
      this.templateService.index().subscribe(
        dataSuccess => {
          this.listOfTemplates = dataSuccess;
          console.log(this.listOfTemplates);
        }
      )
    }
    this.templateService.keyword(keyword).subscribe(
      data => {
        this.listOfTemplates = data;
        console.log(data);
      },
      err => { console.error('no matches') }
    )
  }

  selectTemplateImage(template: Template): string {
    let letterNumber = template.name.charCodeAt(0) ^ template.id;
    return this.programming[letterNumber % this.programming.length];
  }

  goToTemplatePage(id: number) {
    this.router.navigateByUrl('templates/' + id);
  }

  // keywordSearch(keyword: string) {
  //   this.router.navigateByUrl('search?keyword=' + keyword);
  // }




}

