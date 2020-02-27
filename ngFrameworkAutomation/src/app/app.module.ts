import { AuthService } from './services/auth.service';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import { FormPipe } from './util/generator/form.pipe';
import { LCCPipe } from './util/generator/myPipes/lcc.pipe';
import { UCCPipe } from './util/generator/myPipes/ucc.pipe';
import { TextEditorComponent } from './util/generator/text-editor/text-editor.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

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
    CreateTemplateComponent,
    FormPipe,
    LCCPipe,
    UCCPipe,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AceModule

  ],
  providers: [AuthService, {
    provide: ACE_CONFIG,
    useValue: DEFAULT_ACE_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
