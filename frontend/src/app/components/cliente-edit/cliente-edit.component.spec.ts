import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEditComponent } from './cliente-edit.component';

describe('ClienteEditComponent', () => {
  let component: ClienteEditComponent;
  let fixture: ComponentFixture<ClienteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteEditComponent]
    });
    fixture = TestBed.createComponent(ClienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
