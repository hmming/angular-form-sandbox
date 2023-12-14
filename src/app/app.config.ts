import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatButtonModule, MatToolbarModule, MatIconModule, HttpClientModule, BrowserAnimationsModule),
    provideRouter(routes),
    provideAnimations(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore(),
    provideStoreDevtools()
]
};
