import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'about', loadChildren: './about/about.module#AboutPageModule'},
    {path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'event', loadChildren: './event/event.module#EventPageModule' },
  { path: 'specific-event', loadChildren: './specific-event/specific-event.module#SpecificEventPageModule' },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
