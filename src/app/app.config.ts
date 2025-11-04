import { ApplicationConfig, inject } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

// Apollo imports
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { provideApollo } from 'apollo-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withEventReplay()),

    // ✅ Correct usage for Apollo Angular 12+
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://localhost:7037/graphql/',
        }),
      };
    }),
  ],
};
