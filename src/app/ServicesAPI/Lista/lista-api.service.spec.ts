import { TestBed } from '@angular/core/testing';

import { ListaApiService } from './lista-api.service';

describe('ListaApiService', () => {
  let service: ListaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
