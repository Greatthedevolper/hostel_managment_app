// src/app/pages/(dashboard)/layout.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-yellow-900">
      <h1>🚀 LAYOUT IS WORKING!</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export default class DashboardLayout {}
