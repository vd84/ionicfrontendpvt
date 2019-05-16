import {Observable} from 'rxjs';
import {Badge} from '../src/app/Models/Badge';
import {Event} from '../src/app/Models/event';
import {User} from '../src/app/Models/user';
import 'rxjs-compat/add/observable/of';

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

    getAllBadges(): Observable<Badge[]> {
        return Observable.of([new Badge(1, 'MockResponseBadge1', 'MockResponseDescription', null)]);
    }


    getAllMyBadges(id): Observable<Badge[]> {
        return Observable.of([new Badge(1, 'MockResponseBadge1', 'MockResponseDescription', null)]);
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
        return Observable.of([new Event('MockResponseEvent1', null, null, null)]);
    }
}
