import { Component } from '@angular/core';
import { AnalogWelcome } from '../components/analog-welcome';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [AnalogWelcome],
  template: `
    <div class="bg-red-900">
      <h1>DASHBOARD PAGE IS WORKING!</h1>
      <app-analog-welcome/>
    </div>
  `
})
export default class DashboardPage {}
