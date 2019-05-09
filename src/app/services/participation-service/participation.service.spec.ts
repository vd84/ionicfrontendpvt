import { TestBed } from '@angular/core/testing';

import { ParticipationService } from './participation.service';

describe('ParticipationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParticipationService = TestBed.get(ParticipationService);
    expect(service).toBeTruthy();
  });
});
