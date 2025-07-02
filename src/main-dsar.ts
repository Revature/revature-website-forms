import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { dsarFormModule } from './app/dsar-form.module';

platformBrowserDynamic().bootstrapModule(dsarFormModule, {
  ngZoneEventCoalescing: true
})
.catch(err => console.error(err)); 