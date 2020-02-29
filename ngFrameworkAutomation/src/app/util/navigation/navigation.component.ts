import { Component, OnInit } from '@angular/core';
import { ResultsComponent } from '../search/results/results.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  searchBarText: string = '';
  username: string = '';
  password: string = '';
  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {

  }


  checkLoginStatus(): boolean {
    return this.authSvc.checkLogin();
  }

  logout() {
    this.authSvc.logout();
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.authSvc.login(this.username, this.password).subscribe(
      success => { console.log('success') },
      err => { console.log('failed') }
    );
  }


  keywordSearch(keyword: string) {
    this.router.navigateByUrl('search?keyword=' + keyword);
  }

}
