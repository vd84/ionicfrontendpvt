import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { ComponentsModule} from '../../component/components.module';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    SharedDirectivesModule
  ],
  declarations: [EventPage]
})
export class EventPageModule {}
