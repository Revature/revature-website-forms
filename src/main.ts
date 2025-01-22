import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { sourcingFormModule } from './app/sourcing-form.module';
import { environment } from './environments/environment';
import { recruitmentFormModule } from './app/recruitment-form.module';
import { b2cFormModule } from './app/b2c-form.module';
import { b2bFormModule } from './app/b2b-form.module';

const formName = environment.formName;

if (formName == 'sourcing') {
  platformBrowserDynamic().bootstrapModule(sourcingFormModule, {
    ngZoneEventCoalescing: true
  })
    .catch(err => console.error(err));
} else if (formName == 'recruitment') {
  platformBrowserDynamic().bootstrapModule(recruitmentFormModule, {
    ngZoneEventCoalescing: true
  })
    .catch(err => console.error(err));
} else if (formName == 'b2c') {
  platformBrowserDynamic().bootstrapModule(b2cFormModule, {
    ngZoneEventCoalescing: true
  })
    .catch(err => console.error(err));
} else if (formName == 'b2b') {
  platformBrowserDynamic().bootstrapModule(b2bFormModule, {
    ngZoneEventCoalescing: true
  })
    .catch(err => console.error(err));
} else {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true
  })
    .catch(err => console.error(err));
}