import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';


@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  constructor(private http: HttpClient, private currentroute: ActivatedRoute, private svc: TemplateService) { }

  ngOnInit(): void {
    let templateId = this.currentroute.snapshot.paramMap.get('id');
    console.log(templateId, this.currentroute);
    this.svc.show(parseInt(templateId)).subscribe(
      data => { console.log(data); },
      err => { console.error(err); }
    );
  }






}
