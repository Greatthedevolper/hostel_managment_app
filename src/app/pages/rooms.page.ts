import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import SidebarLayoutComponent from '../components/layout/default.layout';
import roomMainComponent from '../modules/rooms/index';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, SidebarLayoutComponent, roomMainComponent],
  template: `
    <app-sidebar-layout ngSkipHydration>
      <room-main-component ngSkipHydration />
    </app-sidebar-layout>
  `,
})
export default class RoomsPage {}
