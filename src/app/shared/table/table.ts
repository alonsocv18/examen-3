import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
}
