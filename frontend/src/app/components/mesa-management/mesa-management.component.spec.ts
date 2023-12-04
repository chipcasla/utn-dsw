import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaManagementComponent } from './mesa-management.component';

describe('MesaManagementComponent', () => {
  let component: MesaManagementComponent;
  let fixture: ComponentFixture<MesaManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesaManagementComponent]
    });
    fixture = TestBed.createComponent(MesaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
