import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DataResolverService} from './resolver/data-resolver.service';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
    {path: 'event', loadChildren: './pages/event/event.module#EventPageModule'},
    {path: 'specific-event', loadChildren: './pages/specific-event/specific-event.module#SpecificEventPageModule'},
    {
        path: 'specific-event/:id',
        resolve: {activity: DataResolverService},
        loadChildren: './pages/specific-event/specific-event.module#SpecificEventPageModule'
    },
    {path: 'create-event', loadChildren: './pages/create-event/create-event.module#CreateEventPageModule'},
    {path: 'map', loadChildren: './pages/map/map.module#MapPageModule'},
    {path: 'badges', loadChildren: './pages/badges/badges.module#BadgesPageModule'},
    {path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule'},
    {path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'change-password', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule'},
    {path: 'delete-account', loadChildren: './pages/delete-account/delete-account.module#DeleteAccountPageModule'},
    {path: 'location', loadChildren: './pages/location/location.module#LocationPageModule'},
    {
        path: 'location/:id',
        resolve: {youthcentre: DataResolverService},
        loadChildren: './pages/location/location.module#LocationPageModule'
    },
  { path: 'specific-badge', loadChildren: './pages/specific-badge/specific-badge.module#SpecificBadgePageModule' },
    {
        path: 'specific-badge/:id',
        resolve: {badge: DataResolverService},
        loadChildren: './pages/specific-badge/specific-badge.module#SpecificBadgePageModule'
    }



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
