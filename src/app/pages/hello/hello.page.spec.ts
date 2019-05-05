import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloPage } from './hello.page';

describe('HelloPage', () => {
  let component: HelloPage;
  let fixture: ComponentFixture<HelloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
