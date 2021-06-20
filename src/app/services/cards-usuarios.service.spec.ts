import { TestBed } from '@angular/core/testing';

import { CardsUsuariosService } from './cards-usuarios.service';

describe('CardsUsuariosService', () => {
  let service: CardsUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
