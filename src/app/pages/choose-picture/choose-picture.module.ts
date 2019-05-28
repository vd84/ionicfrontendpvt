import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChoosePicturePage } from './choose-picture.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosePicturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChoosePicturePage]
})
export class ChoosePicturePageModule {}
