import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ChangePasswordPage} from './change-password.page';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ChangePasswordPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {
}
