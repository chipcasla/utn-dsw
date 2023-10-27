import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaComponent } from './reserva.component';

describe('ReservaComponent', () => {
  let component: ReservaComponent;
  let fixture: ComponentFixture<ReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaComponent]
    });
    fixture = TestBed.createComponent(ReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
