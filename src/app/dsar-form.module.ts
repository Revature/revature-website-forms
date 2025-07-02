import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { createCustomElement } from '@angular/elements'
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { SharedModule } from './common/shared.module';
import { ENV_VAR } from './common/form-contants';
import { DsarFormComponent } from './dsar-form/dsar-form.component';

@NgModule({
  declarations: [DsarFormComponent],
  imports: [
    BrowserModule,
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
export class dsarFormModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const dsarForm = createCustomElement(DsarFormComponent, {
      injector: this.injector,
    })
    customElements.define('dsar-form', dsarForm)
  }
} 