import { RegisterComponent } from './util/SignUp/register/register.component';
import { CreateTemplateComponent } from './util/generator/create-template/create-template.component';
import { GenerateComponent } from './util/generator/generate/generate.component';
import { ResultsComponent } from './util/search/results/results.component';
import { LandingPageComponent } from './util/home/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'home', component: LandingPageComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'generator', component: GenerateComponent},
  {path: 'creator', component: CreateTemplateComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
