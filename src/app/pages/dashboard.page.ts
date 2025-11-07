import { Component } from '@angular/core';
import { AnalogWelcome } from '../components/analog-welcome';
import SidebarLayoutComponent from '../components/layout/default.layout';
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [AnalogWelcome,SidebarLayoutComponent],
  template: `
    <app-sidebar-layout ngSkipHydration>
      <app-analog-welcome />
    </app-sidebar-layout>
  `
})
export default class DashboardPage {}

