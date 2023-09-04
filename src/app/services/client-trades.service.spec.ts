import { TestBed } from '@angular/core/testing';

import { ClientTradesService } from './client-trades.service';

describe('ClientTradesService', () => {
  let service: ClientTradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientTradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
