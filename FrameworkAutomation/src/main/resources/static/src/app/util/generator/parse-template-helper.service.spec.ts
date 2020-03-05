import { TestBed } from '@angular/core/testing';

import { ParseTemplateHelperService } from './parse-template-helper.service';

describe('ParseTemplateHelperService', () => {
  let service: ParseTemplateHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseTemplateHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
