import { TestBed } from '@angular/core/testing';

import { YouthcenterService } from './youthcenter.service';

describe('YouthcenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YouthcenterService = TestBed.get(YouthcenterService);
    expect(service).toBeTruthy();
  });
});
