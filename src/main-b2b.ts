import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { b2bFormModule } from './app/b2b-form.module';

platformBrowserDynamic().bootstrapModule(b2bFormModule, {
  ngZoneEventCoalescing: true
})
.catch(err => console.error(err)); 