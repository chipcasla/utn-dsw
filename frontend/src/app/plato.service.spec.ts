import { TestBed } from '@angular/core/testing';

import { PlatoService } from './plato.service';

describe('PlatoService', () => {
  let service: PlatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
