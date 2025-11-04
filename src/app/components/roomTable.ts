import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import GenericTableComponent  from './generic-table';

@Component({
  selector: 'app-rooms-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  template: `
    <div class="p-6 text-white">
      <h1 class="text-2xl font-bold mb-4">Rooms List</h1>
      <app-generic-table
        [data]="(rooms$ | async) ?? []"
        [columns]="columns"
        [loading]="loading"
      />
    </div>
  `,
})
export default class RoomsTableComponent {
  loading = true;
  columns = [
    // { title: 'ID', key: 'id' },
    { title: 'Room Number', key: 'roomNumber' },
    { title: 'Floor', key: 'floorNumber' },
    { title: 'Seat Capacity', key: 'seatCapacity' },
    { title: 'Has Washroom', key: 'hasAttachedWashroom' },
    { title: 'Hot/Cold Water', key: 'hasHotColdWater' },
  ];

  rooms$ = this.apollo
    .watchQuery<{
      rooms: {
        id: string;
        roomNumber: string;
        floorNumber: string;
        seatCapacity: number;
        hasAttachedWashroom: boolean;
        hasHotColdWater: boolean;
      }[];
    }>({
      query: gql`
        query {
          rooms {
            id
            roomNumber
            floorNumber
            seatCapacity
            hasAttachedWashroom
            hasHotColdWater
          }
        }
      `,
    })
    .valueChanges.pipe(
      map((res) => {
        this.loading = false;
        return res.data?.rooms ?? [];
      })
    );

  constructor(private apollo: Apollo) {}
}
