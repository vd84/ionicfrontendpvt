import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengePage } from './create-challenge.page';

describe('CreateChallengePage', () => {
  let component: CreateChallengePage;
  let fixture: ComponentFixture<CreateChallengePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChallengePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChallengePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
