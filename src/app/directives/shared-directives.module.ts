import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HasRoleDirective} from './has-role.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HasRoleDirective],
  exports: [HasRoleDirective]
})
export class SharedDirectivesModule { }
