import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBadgePage } from './specific-badge.page';

describe('SpecificBadgePage', () => {
  let component: SpecificBadgePage;
  let fixture: ComponentFixture<SpecificBadgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificBadgePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificBadgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
