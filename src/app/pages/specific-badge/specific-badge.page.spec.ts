import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecificBadgePage} from './specific-badge.page';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {FormsModule} from '@angular/forms';

describe('SpecificBadgePage', () => {
    let component: SpecificBadgePage;
    let fixture: ComponentFixture<SpecificBadgePage>;
    let routeStub;


    beforeEach(async(() => {
        routeStub = {snapshot: {data: {badge: 'badge'}}};

        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [SpecificBadgePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: ActivatedRoute, useValue: routeStub}]
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
