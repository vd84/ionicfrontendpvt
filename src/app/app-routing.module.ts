import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'about', loadChildren: './pages/about/about.module#AboutPageModule'},
    {path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
    {path: 'event', loadChildren: './pages/event/event.module#EventPageModule'},
    {path: 'specific-event', loadChildren: './pages/specific-event/specific-event.module#SpecificEventPageModule'},
    {path: 'hello', loadChildren: './pages/hello/hello.module#HelloPageModule'},
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './pages/tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './pages/tab2/tab2.module#Tab2PageModule' },



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
