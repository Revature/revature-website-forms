import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { sourcingFormModule } from './app/sourcing-form.module';

platformBrowserDynamic().bootstrapModule(sourcingFormModule, {
  ngZoneEventCoalescing: true
})
.catch(err => console.error(err)); 