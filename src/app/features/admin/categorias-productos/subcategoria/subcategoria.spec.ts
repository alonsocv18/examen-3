import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subcategoria } from './subcategoria';

describe('Subcategoria', () => {
  let component: Subcategoria;
  let fixture: ComponentFixture<Subcategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Subcategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subcategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
