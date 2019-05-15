import { TestBed } from '@angular/core/testing';

import { HelloService } from './hello.service';
import {HttpClient} from '@angular/common/http';

describe('HelloService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}]
  }));

  it('should be created', () => {
    const service: HelloService = TestBed.get(HelloService);
    expect(service).toBeTruthy();
  });
});
