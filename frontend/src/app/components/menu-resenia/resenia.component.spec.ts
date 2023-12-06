import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaComponent } from './menu-resenia';

describe('ReseniaComponent', () => {
  let component: ReseniaComponent;
  let fixture: ComponentFixture<ReseniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReseniaComponent]
    });
    fixture = TestBed.createComponent(ReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
