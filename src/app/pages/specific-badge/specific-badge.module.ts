import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SpecificBadgePage} from './specific-badge.page';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: SpecificBadgePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SpecificBadgePage]
})
export class SpecificBadgePageModule {
}
