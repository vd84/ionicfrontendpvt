import { TestBed } from '@angular/core/testing';

import { YouthcenterService } from './youthcenter.service';
import {HttpClient} from '@angular/common/http';

describe('YouthcenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}]
  }));

  it('should be created', () => {
    const service: YouthcenterService = TestBed.get(YouthcenterService);
    expect(service).toBeTruthy();
  });
});
