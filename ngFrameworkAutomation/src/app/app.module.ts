import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './util/navigation/navigation.component';
import { FooterComponent } from './util/footer/footer.component';
import { LandingPageComponent } from './util/home/landing-page/landing-page.component';
import { RegisterComponent } from './util/SignUp/register/register.component';
import { UserProfileComponent } from './util/user/user-profile/user-profile.component';
import { ResultsComponent } from './util/search/results/results.component';
import { GenerateComponent } from './util/generator/generate/generate.component';
import { CreateTemplateComponent } from './util/generator/create-template/create-template.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingPageComponent,
    RegisterComponent,
    UserProfileComponent,
    ResultsComponent,
    GenerateComponent,
    CreateTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
