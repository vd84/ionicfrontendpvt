import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedDirectivesModule
    ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
