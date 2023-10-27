import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetalleComponent } from './cliente-detalle.component';

describe('ClienteDetalleComponent', () => {
  let component: ClienteDetalleComponent;
  let fixture: ComponentFixture<ClienteDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDetalleComponent]
    });
    fixture = TestBed.createComponent(ClienteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
