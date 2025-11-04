import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import SidebarLayoutComponent from '../components/layout/default.layout';
import RoomsTableComponent from '../components/roomTable';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, SidebarLayoutComponent, RoomsTableComponent],
  template: `
    <app-sidebar-layout ngSkipHydration>
      <app-rooms-table ngSkipHydration />
    </app-sidebar-layout>
  `,
})
export default class RoomsPage {}
