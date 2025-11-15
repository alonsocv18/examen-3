import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() stateField: string = 'customer_state'; // Campo que contiene el estado ('1' o '0')
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  isActive(row: any): boolean {
    return row[this.stateField] === '1' || row[this.stateField] === 1;
  }
}
