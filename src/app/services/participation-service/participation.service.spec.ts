import { TestBed } from '@angular/core/testing';

import { ParticipationService } from './participation.service';
import {HttpClient} from '@angular/common/http';

describe('ParticipationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}]
  }));

  it('should be created', () => {
    const service: ParticipationService = TestBed.get(ParticipationService);
    expect(service).toBeTruthy();
  });
});
