import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() visible: boolean = false;
  @Input() header: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();

  onHide() {
    this.visibleChange.emit(false);
  }
}
