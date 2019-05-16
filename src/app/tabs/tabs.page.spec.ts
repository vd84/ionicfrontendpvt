import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPage } from './tabs.page';
import {UserService} from '../services/user-service/user.service';
import {UserServiceMock} from '../../../test-config/mocks-ionic';
import {User} from '../Models/user';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: UserService, useValue: new UserServiceMock()}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
