import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'hello', pathMatch: 'full' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'nav', loadChildren: './pages/nav/nav.module#NavPageModule' },
  { path: 'hello', loadChildren: './pages/hello/hello.module#HelloPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
