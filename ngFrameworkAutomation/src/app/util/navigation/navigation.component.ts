import { Component, OnInit } from '@angular/core';
import { ResultsComponent } from '../search/results/results.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  searchBarText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {

  }



  keywordSearch(keyword: string) {
    this.router.navigateByUrl('search?keyword=' + keyword);
  }

}
