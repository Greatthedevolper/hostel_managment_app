// src/app/pages/(dashboard)/home/page.page.ts  ← /dashboard/home
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Test</h1>
      <p class="text-gray-600">Test page with sidebar layout.</p>
    </div>
  `
})
export default class HomePage {}
