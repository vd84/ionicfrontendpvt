import { TestBed } from '@angular/core/testing';

import { YouthcenterService } from './youthcenter.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user-service/user.service';
import {UserServiceMock} from '../../../test-config/mocks-ionic';

describe('YouthcenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: null}, {provide: UserService, useValue: new UserServiceMock()}]
  }));

  it('should be created', () => {
    const service: YouthcenterService = TestBed.get(YouthcenterService);
    expect(service).toBeTruthy();
  });
});
