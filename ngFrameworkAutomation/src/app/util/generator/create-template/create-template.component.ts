import { TemplateService } from 'src/app/services/template.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {

  constructor(private http: HttpClient, private svc: TemplateService) { }

  ngOnInit(): void {
  }

}
