import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReseniaComponent } from './menu-resenia.component';

describe('MenuReseniaComponent', () => {
  let component: MenuReseniaComponent;
  let fixture: ComponentFixture<MenuReseniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuReseniaComponent]
    });
    fixture = TestBed.createComponent(MenuReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
