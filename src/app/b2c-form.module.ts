import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { createCustomElement } from '@angular/elements'
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { SharedModule } from './common/shared.module';
import { B2cFormComponent } from './b2c-form/b2c-form.component';
import { ENV_VAR } from './common/form-contants';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
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
export class b2cFormModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const b2cForm = createCustomElement(B2cFormComponent, {
      injector: this.injector,
    })
    customElements.define('b2c-form', b2cForm)
  }
}
