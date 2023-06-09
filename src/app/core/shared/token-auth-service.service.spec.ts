import { TestBed } from '@angular/core/testing';

import { TokenAuthServiceService } from './token-auth-service.service';

describe('TokenAuthServiceService', () => {
  let service: TokenAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
