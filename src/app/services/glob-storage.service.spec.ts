import { TestBed } from '@angular/core/testing';

import { GlobStorageService } from './glob-storage.service';

describe('GlobStorageService', () => {
  let service: GlobStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
