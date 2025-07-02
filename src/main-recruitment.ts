import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { recruitmentFormModule } from './app/recruitment-form.module';

platformBrowserDynamic().bootstrapModule(recruitmentFormModule, {
  ngZoneEventCoalescing: true
})
.catch(err => console.error(err)); 