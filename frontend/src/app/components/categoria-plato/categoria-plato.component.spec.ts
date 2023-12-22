import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPlatoComponent } from './categoria-plato.component';

describe('CategoriaPlatoComponent', () => {
  let component: CategoriaPlatoComponent;
  let fixture: ComponentFixture<CategoriaPlatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaPlatoComponent]
    });
    fixture = TestBed.createComponent(CategoriaPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
