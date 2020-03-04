import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.hideNav();
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
