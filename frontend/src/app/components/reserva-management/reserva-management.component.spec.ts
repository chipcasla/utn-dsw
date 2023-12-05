import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaManagementComponent } from './reserva-management.component';

describe('ReservaManagementComponent', () => {
  let component: ReservaManagementComponent;
  let fixture: ComponentFixture<ReservaManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaManagementComponent]
    });
    fixture = TestBed.createComponent(ReservaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
