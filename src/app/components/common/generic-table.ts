import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  template: `
    <nz-table
      [nzData]="data"
      [nzBordered]="true"
      [nzLoading]="loading"
      [nzNoResult]="'No data found'"
      class="rounded-md overflow-hidden"
    >
      <thead>
        <tr>
          <th
            *ngFor="let col of columns"
            [style.width]="col.width ? col.width + 'px' : null"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let col of columns">
            <!-- Use provided template if available -->
            <ng-container
              *ngIf="col.template; else defaultRender"
              [ngTemplateOutlet]="col.template"
              [ngTemplateOutletContext]="{ $implicit: row, row: row }"
            ></ng-container>

            <!-- Default render -->
            <ng-template #defaultRender>
              {{ col.render ? col.render(row[col.key], row) : row[col.key] }}
            </ng-template>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
})
export default class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: {
    title: string;
    key: string;
    width?: number;
    template?: TemplateRef<any>;
    render?: (value: any, row?: any) => string;
  }[] = [];

  @Input() loading = false;
}
