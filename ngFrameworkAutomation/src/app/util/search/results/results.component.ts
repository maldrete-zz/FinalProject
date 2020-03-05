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

  programming: string[] = [
    'https://images.unsplash.com/photo-1564599115290-ba0b6c91be51?ixlib=rb-1.2.1&auto=format&fit=crop&w=3024&q=80', // rock cliff
    'https://images.unsplash.com/photo-1516739711484-6f80025660c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', // red rock round
    'https://images.unsplash.com/photo-1506567859980-33c9c423649f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80', // bicycle
    'https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', // good rocks on ground
    'https://images.unsplash.com/photo-1519197924294-4ba991a11128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80', // city at night
    'https://images.unsplash.com/photo-1519579156976-ebff3a90d4c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', // good rocks stacked
    'https://images.unsplash.com/photo-1533559662493-65ffecb14f7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1413&q=80', // old van
    'https://images.unsplash.com/uploads/1412594480669535c9ef9/9d85c477?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', // good street inbetween tall buildings
    'https://images.unsplash.com/photo-1496661274775-a86a124b9df3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2106&q=80', // brown field
    'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80', // dark tent camping
    'https://images.unsplash.com/photo-1475776408506-9a5371e7a068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1854&q=80', // volcano smoke
    'https://images.unsplash.com/photo-1519766030446-ae88fde27309?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80', // aquarium
    'https://images.unsplash.com/photo-1543078615-d2a11bab60ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // city by water
    'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', // man hiking
    'https://images.unsplash.com/photo-1536691661814-8b0372158cf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // two trees
    'https://images.unsplash.com/photo-1528922087877-3f44f53a8f7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80', // good dark rainbow streak
    'https://images.unsplash.com/photo-1544745494-3d8dd3fa1564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80', // lava
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', // good buildings
    'https://images.unsplash.com/photo-1537220766318-3547a58eba96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', // round apartments
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', // good water with white color above
     'https://images.unsplash.com/photo-1524423195609-41581380969d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // red barn
     'https://images.unsplash.com/photo-1516916950307-ae2b188c70c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // green mountain by water
     'https://images.unsplash.com/photo-1532157345990-d3ab4df99902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1376&q=80', // multi color buildings
     'https://images.unsplash.com/photo-1578838237831-b8a30836dbdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2078&q=80' // city of havana
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
    let letterNumber = template.id ;
    return this.programming[letterNumber % this.programming.length];
  }

  goToTemplatePage(id: number) {
    this.router.navigateByUrl('templates/' + id);
  }

  // keywordSearch(keyword: string) {
  //   this.router.navigateByUrl('search?keyword=' + keyword);
  // }


  ngAfterViewInit() {
    this.templateService.index().subscribe(
      dataSuccess => {
        this.listOfTemplates = dataSuccess;
        console.log(this.listOfTemplates);
        this.hideNav();
      }
    )

  }

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

