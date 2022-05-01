import { TestBed } from '@angular/core/testing';

import { MercadoApiServiceService } from './mercado-api-service.service';

describe('MercadoApiServiceService', () => {
  let service: MercadoApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercadoApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
