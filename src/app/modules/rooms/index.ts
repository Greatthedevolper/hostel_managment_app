import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import RoomsTableComponent from '../../modules/rooms/roomTable';

@Component({
  selector: 'room-main-component',
  standalone: true,
  imports: [CommonModule, RoomsTableComponent],
  template: `
    <app-rooms-table></app-rooms-table>
  `,
})
export default class RoomMainComponent {}
