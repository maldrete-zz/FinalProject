import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  //fields
  user = new User();
  users = [];

  constructor(private authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUser();
    this.retrieveUsers();

  }

  updateUser() {
    console.log(this.user)
    this.userService.updateUser(this.user).subscribe(
      good => {
        this.router.navigateByUrl("/results");
        // this.authSvc.login(this.user.username, this.user.password).subscribe(
        //   good => {
        //     this.router.navigateByUrl("/results");
        //   },
        //   bad => {
        //     console.error("Failed to Login");
        //   }
        // );

      },
      bad => {
        console.error("Failed to Update");
      }
    );
  }

  retrieveUser() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(user);
      },
      bad => {
        console.error("failed to retrieve user");
      }
    )
  }

  retrieveUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      bad => {
        console.error("failed to retrieve users");
      }
    )
  }

  changeUserStatus(user: User) {
    if (user.enabled) {
      this.userService.deactivateUser(user).subscribe(
        good => {

        },
        bad => {
          console.error("failed to deactivate user");

        }
      )

    } else {
      this.userService.activateUser(user).subscribe(
        good => {

        },
        bad => {
          console.error("failed to activate user");

        }
      )


    }

  }

  checkIfAdmin(): boolean {
    if (this.user.role == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    this.hideNav();
  }


  showNav() {
    let sliders = document.getElementsByClassName("slider");
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].classList.add("active");
    }
  }
  hideNav() {
    let sliders = document.getElementsByClassName("slider");
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].classList.remove("active");
    }
  }

  toggleNav() {
    let sliders = document.getElementsByClassName("slider");
    if (sliders[0].classList.contains("active")) {
      this.hideNav();
    } else {
      this.showNav();
    }
  }

}
