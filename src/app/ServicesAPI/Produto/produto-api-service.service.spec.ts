import { TestBed } from '@angular/core/testing';

import { ProdutoApiServiceService } from './produto-api-service.service';

describe('ProdutoApiServiceService', () => {
  let service: ProdutoApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
