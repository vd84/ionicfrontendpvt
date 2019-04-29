import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesPage } from './badges.page';

describe('BadgesPage', () => {
  let component: BadgesPage;
  let fixture: ComponentFixture<BadgesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
