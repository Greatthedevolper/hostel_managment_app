import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { ADD_ROOM, UPDATE_ROOM } from '../../graphql/rooms/mutation';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-create-room',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzFlexModule,
    NzCheckboxModule,
  ],
  template: `
    <nz-drawer
      [nzBodyStyle]="{ overflow: 'auto', padding: '10px 16px' }"
      [nzMaskClosable]="false"
      [nzWidth]="420"
      [nzVisible]="visible"
      nzTitle="Create Room"
      [nzFooter]="footerTpl"
      (nzOnClose)="close()"
    >
      {{ data | json }}
      <form
        nz-form
        [formGroup]="roomForm"
        *nzDrawerContent
        [nzLayout]="'vertical'"
      >
        <nz-form-item class="mb-2!">
          <nz-form-label [nzSpan]="14">Room Number</nz-form-label>
          <nz-form-control [nzSpan]="24">
            <input
              nz-input
              formControlName="number"
              placeholder="Enter room number"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item class="mb-2!">
          <nz-form-label [nzSpan]="14">Floor Number</nz-form-label>
          <nz-form-control [nzSpan]="24">
            <input
              nz-input
              formControlName="floorNumber"
              placeholder="Enter floor number"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item class="mb-2!">
          <nz-form-label [nzSpan]="14">Seat Capacity</nz-form-label>
          <nz-form-control [nzSpan]="24">
            <input
              nz-input
              type="number"
              formControlName="capacity"
              placeholder="Enter capacity"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item class="mb-2!">
          <label nz-checkbox formControlName="hasAttachedWashroom"
            >Attached Washroom</label
          >
        </nz-form-item>
        <nz-form-item class="mb-2!">
          <label nz-checkbox formControlName="hasHotColdWater"
            >Hot/Cold Water</label
          >
        </nz-form-item>
      </form>

      <ng-template #footerTpl>
        <div
          nz-flex
          [nzAlign]="'center'"
          [nzJustify]="'flex-start'"
          [nzGap]="6"
        >
          <button nz-button (click)="close()">Cancel</button>
          <button
            nz-button
            nzType="primary"
            (click)="submit()"
            [disabled]="roomForm.invalid || loading"
          >
            {{ loading ? 'Saving...' : 'Submit' }}
          </button>
        </div>
      </ng-template>
    </nz-drawer>
  `,
})
export default class CreateRoomComponent {
  @Input() visible = false;
  @Input() data: any = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() isSuccess = new EventEmitter<string>();
  roomForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private notification: NzNotificationService
  ) {
    this.roomForm = this.fb.group({
      number: ['', Validators.required],
      floorNumber: ['', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1)]],
      hasAttachedWashroom: [false],
      hasHotColdWater: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.roomForm.patchValue({
        number: this.data.roomNumber ?? '',
        floorNumber: this.data.floorNumber ?? '',
        capacity: this.data.seatCapacity ?? 1,
        hasAttachedWashroom: this.data.hasAttachedWashroom ?? false,
        hasHotColdWater: this.data.hasHotColdWater ?? false,
      });
    }
  }
  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  submit(): void {
    if (this.roomForm.invalid) return;

    this.loading = true;
    const formValue = this.roomForm.value;

    const isEditing = !!this.data?.id;
    const variables = isEditing
      ? {
          id: this.data.id,
          number: formValue.number,
          floorNumber: formValue.floorNumber,
          capacity: formValue.capacity,
          hasAttachedWashroom: formValue.hasAttachedWashroom,
          hasHotColdWater: formValue.hasHotColdWater,
        }
      : {
          number: formValue.number,
          floorNumber: formValue.floorNumber,
          capacity: formValue.capacity,
          hasAttachedWashroom: formValue.hasAttachedWashroom,
          hasHotColdWater: formValue.hasHotColdWater,
        };

    this.apollo
      .mutate({
        mutation: isEditing ? UPDATE_ROOM : ADD_ROOM,
        variables,
      })
      .subscribe({
        next: (res: any) => {
          const message = isEditing
            ? res?.data?.updateRoom?.message
            : res?.data?.addRoom?.message;
          this.notification.create('success', 'Success', message);
          this.loading = false;
          this.close();
          this.isSuccess.emit('success');
        },
        error: (err: any) => {
          console.error('Error saving room:', err);
          this.notification.create('error', 'Error', 'Something went wrong.');
          this.loading = false;
        },
      });
  }

  // submit(): void {
  //   if (this.roomForm.invalid) return;

  //   this.loading = true;
  //   const formValue = this.roomForm.value;

  //   this.apollo
  //     .mutate({
  //       mutation: this.data?.id ? UPDATE_ROOM : ADD_ROOM,
  //       variables: formValue,
  //     })
  //     .subscribe({
  //       next: (res: any) => {
  //         this.notification.create(
  //           'success',
  //           'Success',
  //           res?.data?.addRoom?.message
  //         );
  //         this.loading = false;
  //         this.close();
  //         this.isSuccess.emit('success');
  //       },
  //       error: (err: any) => {
  //         console.error('Error creating room:', err);
  //         this.notification.create('error', 'Error', 'error');
  //         this.loading = false;
  //       },
  //     });
  // }
}
