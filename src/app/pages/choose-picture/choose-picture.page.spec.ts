import {CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewContainerRef} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePicturePage } from './choose-picture.page';
import {Router} from '@angular/router';
import {ActivityService} from '../../services/activity-service/activity.service';
import {ActivityServiceMock, UserServiceMock} from '../../../../test-config/mocks-ionic';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';

describe('ChoosePicturePage', () => {
  let component: ChoosePicturePage;
  let fixture: ComponentFixture<ChoosePicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePicturePage ],
      providers: [
        {provide: UserService, useValue: new UserServiceMock()},
],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
