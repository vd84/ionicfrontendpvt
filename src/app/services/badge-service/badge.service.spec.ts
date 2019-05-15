import { TestBed } from '@angular/core/testing';

import { BadgeService } from './badge.service';
import {HttpClient} from '@angular/common/http';

describe('BadgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}]
  }));

  it('should be created', () => {
    const service: BadgeService = TestBed.get(BadgeService);
    expect(service).toBeTruthy();
  });
});
