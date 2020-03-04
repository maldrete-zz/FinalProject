import { Component, OnInit } from '@angular/core';
import { ResultsComponent } from '../search/results/results.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  searchBarText: string = '';
  username: string = '';
  password: string = '';
  user: User;
  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {

  }


  checkLoginStatus(): boolean {
    return this.authSvc.checkLogin();
  }

  logout() {
    this.authSvc.logout();
    this.router.navigateByUrl("/home");
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.authSvc.login(this.username, this.password).subscribe(
      success => {
        this.router.navigateByUrl('/results');

        console.log(success);
        console.log(this.user);
      },
      err => { console.log('failed') }
    );
  }


  keywordSearch(keyword: string) {
    this.router.navigateByUrl('search?keyword=' + keyword);
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



  gotoLandingPage(){
    this.checkCurrent(1);
    this.router.navigateByUrl("home");
  }
  gotoRegisterPage(){
    this.checkCurrent(2);
    this.router.navigateByUrl("register");
  }
  gotoSearchPage(){
    this.checkCurrent(3);
    this.router.navigateByUrl("search");
  }
  gotoCreatePage(){
    this.checkCurrent(4);
    this.router.navigateByUrl("template/create");
  }




  checkCurrent(id :number){
    if(this.currentPage == id){
      this.hideNav();
    }
    this.currentPage = id;
  }

  currentPage = 1;









}
