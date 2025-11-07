import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  template: `
    <nz-table
      #basicTable
      [nzData]="data"
      [nzBordered]="true"
      [nzLoading]="loading"
      class="rounded-lg overflow-hidden"
    >
      <thead>
        <tr>
          <th *ngFor="let col of columns">{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of basicTable.data">
          <td *ngFor="let col of columns">
            {{ item[col.key] }}
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
})
export default class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { title: string; key: string }[] = [];
  @Input() loading = false;
}
