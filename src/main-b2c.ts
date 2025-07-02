import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { b2cFormModule } from './app/b2c-form.module';

platformBrowserDynamic().bootstrapModule(b2cFormModule, {
  ngZoneEventCoalescing: true
})
.catch(err => console.error(err)); 