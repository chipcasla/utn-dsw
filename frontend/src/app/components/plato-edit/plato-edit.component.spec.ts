import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoEditComponent } from './plato-edit.component';

describe('PlatoEditComponent', () => {
  let component: PlatoEditComponent;
  let fixture: ComponentFixture<PlatoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatoEditComponent]
    });
    fixture = TestBed.createComponent(PlatoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
