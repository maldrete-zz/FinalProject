import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from './../../../entities/user/user';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // fields
  user: User = new User();


  constructor(private http: HttpClient, private svc: UserService,
              private currentroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.svc.getUser().subscribe(
      dataSuccess => {
        this.user = dataSuccess;
        console.log(this.user);
      }
    )
  }

  getUserFromDB(){

  }

}
