import { Component } from '@angular/core';

@Component({
  selector: 'app-analog-welcome',
  styles: [
    `
      :host {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        display: flex;
        padding: 2rem 1rem 8rem;
        flex-direction: column;
        background: rgba(0,0,0,0.05);
        height: 100%;
      }
    `,
  ],
  template: `
    <main class="main bg-red-200">
    <section id="counter-demo" class="section">
        <div class="counter-container">
          <h2 class="counter-heading">Counter</h2>
          <p class="counter-description">
            okay chill
          </p>
          <button (click)="increment()" class="lightBtn">
            Count: <span class="count">{{ count }}</span>
          </button>
        </div>
      </section>
    </main>
  `,
})
export class AnalogWelcome {
  count = 0;
  increment() {
    this.count++;
  }
}
