import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import GenericTableComponent from '../../components/common/generic-table';
import NzDemoDrawerFromDrawerComponent from '../../modules/rooms/createRoom';
import { GET_ROOMS } from '../../graphql/rooms/queries';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-rooms-table',
  standalone: true,
  imports: [
    CommonModule,
    GenericTableComponent,
    NzDemoDrawerFromDrawerComponent,
    FormsModule,
    NzInputModule,
    NzFlexModule,
    NzTypographyModule,
    NzButtonModule,
  ],
  template: `
    <div class="p-6 text-white">
      <div nz-flex [nzGap]="'middle'" class="items-center mb-2">
        <span nz-typography class="text-2xl font-bold shrink-0 text-white!"
          >Rooms List</span
        >
        <nz-input-search
          nzAllowClear
          nzSize="large"
          [nzLoading]="loading"
          (nzSearch)="searchRooms()"
        >
          <input
            nz-input
            [(ngModel)]="searchValue"
            placeholder="Search Rooms..."
            (ngModelChange)="onSearchChange($event)"
          />
        </nz-input-search>
        <button nz-button nzType="primary" (click)="open()">Create</button>
      </div>

      <app-generic-table
        [data]="rooms"
        [columns]="columns"
        [loading]="loading"
      />

      <nz-demo-drawer-from-drawer [(visible)]="visible" />
    </div>
  `,
})
export default class RoomsTableComponent implements OnInit {
  loading = true;
  rooms: any[] = [];
  searchValue = '';
  searchSubject = new Subject<string>();
  visible = false;

  columns = [
    { title: 'Room Number', key: 'roomNumber' },
    { title: 'Floor', key: 'floorNumber' },
    { title: 'Seat Capacity', key: 'seatCapacity' },
    { title: 'Has Washroom', key: 'hasAttachedWashroom' },
    { title: 'Hot/Cold Water', key: 'hasHotColdWater' },
  ];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400)).subscribe(() => {
      this.searchRooms();
    });
    this.searchRooms();
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  searchRooms(): void {
    this.loading = true;
    this.apollo
      .watchQuery({
        query: GET_ROOMS,
        variables: {
          search: this.searchValue,
        },
      })
      .valueChanges.subscribe({
        next: (data: any) => {
          this.rooms = data?.data?.rooms ?? [];
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }
  open(): void {
    this.visible = true;
  }
}
