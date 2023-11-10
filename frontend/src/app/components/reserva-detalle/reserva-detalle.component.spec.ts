import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaDetalleComponent } from './reserva-detalle.component';

describe('ReservaDetalleComponent', () => {
  let component: ReservaDetalleComponent;
  let fixture: ComponentFixture<ReservaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaDetalleComponent]
    });
    fixture = TestBed.createComponent(ReservaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
