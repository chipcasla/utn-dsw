import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteManagementComponent } from './cliente-management.component';

describe('ClienteManagementComponent', () => {
  let component: ClienteManagementComponent;
  let fixture: ComponentFixture<ClienteManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteManagementComponent]
    });
    fixture = TestBed.createComponent(ClienteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
