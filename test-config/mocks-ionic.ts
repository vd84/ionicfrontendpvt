import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BadgeService} from '../src/app/services/badge-service/badge.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Badge} from '../src/app/Models/Badge';
import {User} from '../src/app/Models/user';

export class PlatformMock {
    public ready(): Promise<string> {
        return new Promise((resolve) => {
            resolve('READY');
        });
    }

    public getQueryParam() {
        return true;
    }

    public registerBackButtonAction(fn: Function, priority?: number): Function {
        return (() => true);
    }

    public hasFocus(ele: HTMLElement): boolean {
        return true;
    }

    public doc(): HTMLDocument {
        return document;
    }

    public is(): boolean {
        return true;
    }

    public getElementComputedStyle(container: any): any {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    }

    public onResize(callback: any) {
        return callback;
    }

    public registerListener(ele: any, eventName: string, callback: any): Function {
        return (() => true);
    }

    public win(): Window {
        return window;
    }

    public raf(callback: any): number {
        return 1;
    }

    public timeout(callback: any, timer: number): any {
        return setTimeout(callback, timer);
    }

    public cancelTimeout(id: any) {
        // do nothing
    }

    public getActiveElement(): any {
        return document['activeElement'];
    }
}

export class NavMock {

    public pop(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public push(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public getActive(): any {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }

    public registerChildNav(nav: any): void {
        return;
    }

}

export class DeepLinkerMock {

}

export class BadgeServiceMock {

    url = 'https://webbapppvt15grupp2.herokuapp.com/badge/';

    constructor() {
    }

    /**
     * Returnerar alla badges från apiet.
     */
    getAllBadges(): Observable<Badge> {
        return Observable.create([{
            'id': 1,
            'name': 'first time visitor',
            'description': 'Congratulations! You have successfully checkd in to your first youth center.'
        }]);
    }

    /**
     * Retunerar alla badges från en specifik user som identifieras med användarens id.
     * @param id: användarens id
     */
    getAllMyBadges(id): Observable<Badge[]> {
        return Observable.create([{
            'id': 1,
            'name': 'first time visitor',
            'description': 'Congratulations! You have successfully checkd in to your first youth center.'
        }]);
    }
}

export class UserServiceMock {

    currentUser: User = new User(1, 'MockUser', 'Admin',
        1, 'MockUser');

    currentUserJson;


    url = 'https://webbapppvt15grupp2.herokuapp.com/user/';


    constructor() {
    }


    logout() {
        this.currentUser = null;
    }

    hasRoles(role: string): boolean {

        return !(!this.currentUser || this.currentUser.role !== role);

    }

    modifyUser(username: String, password: String, currentyouthcentre: number) {
    }

    submitUser(username: String, displayname: String, password: String, currentyouthcentre: number, loggedInWithFaceBook: boolean) {
    }


    deleteUser(username: string, password: string) {
    }


    login(username: String, password: String, isfacebookuser: boolean) {
    }


}

export class ActivityServiceMock {

    url = 'https://webbapppvt15grupp2.herokuapp.com/activity/';

    constructor() {
    }

    getAllActivities(): Observable<Event[]> {
        return Observable.create([{
            'id': 1,
            'registrationdate': null,
            'createdby': 1,
            'startdate': null,
            'enddate': null,
            'name': 'aktivitetsnamn',
            'description': 'beskrivning',
            'responsibleuser': 1,
            'alternativelocation': 'alt location',
            'issuggestion': true,
            'isactive': true,
            'category': 1,
            'resource': 1
        }]);
    }
}
