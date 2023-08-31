import { TestBed } from '@angular/core/testing';

import { FmtsService } from './fmts.service';

describe('FmtsService', () => {
  let service: FmtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FmtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
