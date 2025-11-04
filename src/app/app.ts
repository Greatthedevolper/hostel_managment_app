import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: `
    :host {
      max-width: 1280px;
      margin: 0;
      padding: 0;
      text-align: center;
    }
  `,
})
export class AppComponent {}
