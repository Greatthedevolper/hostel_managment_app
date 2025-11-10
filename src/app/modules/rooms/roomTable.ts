import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import GenericTableComponent from '../../components/common/generic-table';
import DeleteModal from '../../components/common/generic-deleteModal';
import CreateRoomComponent from '../../modules/rooms/createRoom';
import { GET_ROOMS } from '../../graphql/rooms/queries';
import { DELETE_ROOM } from '../../graphql/rooms/mutation';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-rooms-table',
  standalone: true,
  imports: [
    CommonModule,
    GenericTableComponent,
    DeleteModal,
    CreateRoomComponent,
    FormsModule,
    NzInputModule,
    NzFlexModule,
    NzTypographyModule,
    NzButtonModule,
  ],
  template: `
    <div class="py-4 text-white">
      <div nz-flex [nzGap]="6" class="items-center mb-2">
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

      <ng-template #actionTemplate let-row>
        <button nz-button nzType="link" (click)="editRoom(row)">Edit</button>
        <button nz-button nzType="link" (click)="deleteRoom(row)">
          Delete
        </button>
      </ng-template>

      <deleteModal
        [(isVisible)]="deleteVisible"
        [deleteId]="deleteId"
        (isDeleted)="deleteHandle($event)"
      />
      <app-create-room
        [(visible)]="createVisible"
        [data]="selectedItem"
        (isSuccess)="searchRooms()"
      />
    </div>
  `,
})
export default class RoomsTableComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  loading = true;
  rooms: any[] = [];
  searchValue = '';
  searchSubject = new Subject<string>();
  createVisible = false;
  deleteVisible = false;
  deleteId = '';
  selectedItem = {};

  columns: any[] = [];

  constructor(
    private apollo: Apollo,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.columns = [
      { title: 'Room Number', key: 'roomNumber', width: 120 },
      { title: 'Floor', key: 'floorNumber', width: 120 },
      { title: 'Seat Capacity', key: 'seatCapacity', width: 120 },
      {
        title: 'Has Washroom',
        key: 'hasAttachedWashroom',
        render: (v: boolean) => (v ? 'Yes' : 'No'),
        width: 125,
      },
      {
        title: 'Hot/Cold Water',
        key: 'hasHotColdWater',
        render: (v: boolean) => (v ? 'Yes' : 'No'),
        width: 125,
      },
      {
        title: 'Actions',
        key: 'action',
        width: 150,
        template: this.actionTemplate,
      },
    ];

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
        variables: { search: this.searchValue },
        fetchPolicy: 'network-only',
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
    this.selectedItem = {};
    this.createVisible = true;
  }

  editRoom(row: any) {
    console.log('Editing', row);
    this.selectedItem = row;
    this.createVisible = true;
  }

  async deleteRoom(row: any) {
    this.deleteId = row.id;
    this.deleteVisible = true;
  }

  deleteHandle(id: string): void {
    this.loading = true;

    this.apollo
      .mutate({
        mutation: DELETE_ROOM,
        variables: { id },
      })
      .subscribe({
        next: (result: any) => {
          this.notification.create(
            'success',
            'Success',
            result?.data?.deleteRoom?.message
          );
          this.loading = false;
          this.deleteVisible = false;
          this.searchRooms();
        },
        error: (err) => {
          this.loading = false;
          this.notification.create('success', 'Success', 'Error deleting room');
        },
      });
  }
}
