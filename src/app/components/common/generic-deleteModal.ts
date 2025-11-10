import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'deleteModal',
  standalone: true,
  imports: [NzButtonModule, NzModalModule],
  template: `
    <nz-modal
      nzCentered
      [(nzVisible)]="isVisible"
      nzTitle="Do you Want to delete?"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
    >
      <ng-container *nzModalContent>
        <p>
          This action cannot be undone. This will permanently delete the
          selected item.
        </p>
      </ng-container>
    </nz-modal>
  `,
})
export default class DeleteModal {
  @Input() isVisible = false;
  @Input() deleteId = '';
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() isDeleted = new EventEmitter<string>();

  async handleOk(): Promise<void> {
    this.isDeleted.emit(this.deleteId);
    this.isVisibleChange.emit(false);
  }

  handleCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
