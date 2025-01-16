import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SourcingFormComponent } from './sourcing-form/sourcing-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecruitmentFormComponent } from './recruitment-form/recruitment-form.component';
import { SharedModule } from './common/shared.module';
import { ENV_VAR } from './common/form-contants';
import { B2cFormComponent } from './b2c-form/b2c-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SourcingFormComponent,
    RecruitmentFormComponent,
    B2cFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    SharedModule
  ],
  providers: [provideHttpClient(),
  {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: ENV_VAR.GTM_SITE_KEY,
    } as RecaptchaSettings
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
