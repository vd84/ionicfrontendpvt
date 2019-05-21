import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../authentication-service/auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}, {provide: AuthService, useValue: null}, {provide: Router, useValue: null}, {provide: ToastController, useValue: null}]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
