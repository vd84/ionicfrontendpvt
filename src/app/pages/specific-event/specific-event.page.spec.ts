import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificEventPage } from './specific-event.page';

describe('SpecificEventPage', () => {
  let component: SpecificEventPage;
  let fixture: ComponentFixture<SpecificEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
