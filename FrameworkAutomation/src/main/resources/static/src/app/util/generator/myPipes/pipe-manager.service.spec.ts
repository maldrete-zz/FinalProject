import { TestBed } from '@angular/core/testing';

import { PipeManagerService } from './pipe-manager.service';

describe('PipeManagerService', () => {
  let service: PipeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
