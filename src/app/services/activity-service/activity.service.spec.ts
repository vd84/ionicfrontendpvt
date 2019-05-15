import { TestBed } from '@angular/core/testing';

import { ActivityService } from './activity.service';
import {HttpClient} from '@angular/common/http';

describe('ActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}]
  }));

  it('should be created', () => {
    const service: ActivityService = TestBed.get(ActivityService);
    expect(service).toBeTruthy();
  });
});
