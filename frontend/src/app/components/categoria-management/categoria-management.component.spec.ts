import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaManagementComponent } from './categoria-management.component';

describe('CategoriaManagementComponent', () => {
  let component: CategoriaManagementComponent;
  let fixture: ComponentFixture<CategoriaManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaManagementComponent]
    });
    fixture = TestBed.createComponent(CategoriaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
