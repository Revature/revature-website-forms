import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SourcingFormComponent } from './sourcing-form/sourcing-form.component';
import { createCustomElement } from '@angular/elements'
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { SharedModule } from './common/shared.module';
import { ENV_VAR } from './common/form-contants';

@NgModule({
  declarations: [],
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
  ]
})
export class sourcingFormModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const sourcingForm = createCustomElement(SourcingFormComponent, {
      injector: this.injector,
    })
    customElements.define('sourcing-form', sourcingForm)
  }
}
