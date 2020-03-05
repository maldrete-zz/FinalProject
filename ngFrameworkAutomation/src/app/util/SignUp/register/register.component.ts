import { User } from "./../../../entities/user/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void { }


  register(form: NgForm) {
    const user: User = form.value;
    console.log(user);
    this.authSvc.register(user).subscribe(
      good => {
        this.authSvc.login(user.username, user.password).subscribe(
          good => {
            this.router.navigateByUrl("/results");
          },
          bad => {
            console.error("Failed to Login");
          }
        );
      },
      bad => {
        console.error("Failed to Register");
      }
    );
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
