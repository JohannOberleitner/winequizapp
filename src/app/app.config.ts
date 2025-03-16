import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection  } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StartupService } from '../service/startup.service';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        return inject(StartupService).initializerFactory();
      }
    },
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
  ]
};

