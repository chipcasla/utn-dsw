import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoManagementComponent } from './plato-management.component';

describe('PlatoManagementComponent', () => {
  let component: PlatoManagementComponent;
  let fixture: ComponentFixture<PlatoManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatoManagementComponent]
    });
    fixture = TestBed.createComponent(PlatoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
