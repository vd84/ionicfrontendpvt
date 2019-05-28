import { TestBed } from '@angular/core/testing';

import { CheckinService } from './checkin.service';
import {HttpClient} from '@angular/common/http';
import {ToastController} from '@ionic/angular';

describe('CheckinService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}, {provide: ToastController, useValue: null}]
  }));

  it('should be created', () => {
    const service: CheckinService = TestBed.get(CheckinService);
    expect(service).toBeTruthy();
  });
});
