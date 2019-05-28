import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePicturePage } from './choose-picture.page';

describe('ChoosePicturePage', () => {
  let component: ChoosePicturePage;
  let fixture: ComponentFixture<ChoosePicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePicturePage ],
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
