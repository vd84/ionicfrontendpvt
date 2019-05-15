import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClient} from '@angular/common/http';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
