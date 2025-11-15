import { Component } from '@angular/core';

@Component({
  selector: 'app-selector',
  standalone: false,
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector {
  users: any[] = [{ category: 'Todos' }, { category: 'Personas' }, { category: 'Empresa' }];
  selectedUser: any;
}
