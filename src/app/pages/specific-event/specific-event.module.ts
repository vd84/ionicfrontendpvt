import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpecificEventPage } from './specific-event.page';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: SpecificEventPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedDirectivesModule
    ],
  declarations: [SpecificEventPage]
})
export class SpecificEventPageModule {}
