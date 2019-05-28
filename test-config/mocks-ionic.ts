import {Observable} from 'rxjs';
import {Badge} from '../src/app/Models/Badge';
import {Event} from '../src/app/Models/event';
import {User} from '../src/app/Models/user';
import 'rxjs-compat/add/observable/of';
import {Avatar} from '../src/app/Models/Avatar';

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
        return Observable.of([new Badge(1, 'MockResponseBadge1', 'MockResponseDescription', null), new Badge(2, 'MockResponseBadge2', 'MockResponseDescription', null)]);
    }


    getAllMyBadges(id): Observable<Badge[]> {
        return Observable.of([new Badge(1, 'MockResponseBadge1', 'MockResponseDescription', null)]);
    }
}

export class ChoosePicturePageMock {

    allAvatars: Object = [];


    getAllAvatars() {
        return null;
    }

    chooseThatPicture(pictureID) {
        return null;
    }


}

export class UserServiceMock {

    currentUser: User = new User(1, 'MockUser', 'Admin',
        'admin', 1, 0, null, null);

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
        return true;
    }

    getAllAvatars() {
        return Observable.of([new Avatar(1, 'MockResponseAvatar1', null)]);
    }

    getMyAvatar(id) {
        return null;

    }


}

export class ActivityServiceMock {

    url = 'https://webbapppvt15grupp2.herokuapp.com/activity/';


    // alla aktiviteter som ska visas på admin sidan
    adminActivities = [];
    // alla aktiviteter för en user/admin
    allActivities = [];
    // alla aktiva aktiviteter
    allActiveActivities = [];
    // allt från databasen
    allActivitiesFromDatabase = [];
    // alla mina aktiviteter som jag ska delta på
    allMyActivities = [];
    // alla mina pågående eller kommmande aktiviteter
    allMyActiveActivities = [];
    // alla som deltar på en specifik aktivitet
    allActivityParticipants = [];
    // Lista för alla kategorier
    allCategories = [];

    constructor() {
    }

    getAllActivities(): Observable<Object[]> {
        return Observable.of([{name: 'MockResponseActivity1'}]);
    }

    getAllBadges(): Observable<Badge[]> {
        return Observable.of([new Badge(1, 'MockResponseBadge1', 'MockResponseDescription', null), new Badge(2, 'MockResponseBadge2', 'MockResponseDescription', null)]);
    }

    generateAllActvitiesPage() {
        return true;
    }


    generateAdminPendingPage() {

        return true;
    }

    activityIsSuggestion(activity) {
        return true;
    }

    activityIsPending(activity) {
        return true;
    }

    activityIsDeclined(activity) {
        return true;
    }

    activityIsAccepted(activity) {
        return true;

    }

    isOfYourCentre(activity) {
        return true;
    }


    generateAllMyActivities() {
        return true;
    }


    isChallenged(activity) {
        return true;
    }

    isChallenger(activity) {
        return true;
    }

    addActivity(createdBy: number, name: String, description: String, responsibleUser: number, alt_location: String, isSuggestion: number, category: number, challenger: number, challengedyouthcenter: number) {
        return true;
    }

    submitParticipation(userID: number, activityID: number) {
        return true;
    }

    removeParticipation(userId: any, activityId: number) {
        return true;
    }

    async presentToast(toastMessage: string) {
        return true;

    }

    modifyActivity(id,
                   name,
                   description,
                   responsibleuser,
                   alternativelocation,
                   issuggestion,
                   isactive,
                   category,
                   resource,
                   challenger,
                   challenged,
                   completed,
                   challengeaccepted,
                   challengerejected,
                   winner) {
        return true;
    }


    getAllMyActivities() {
        return Observable.of([new Event('MockResponseEvent1', null, null, null)]);
    }

    getAllMyPendingActivities() {
        return Observable.of([new Event('MockResponseEvent1', null, null, null)]);
    }

    isMyActivity(id: number) {
        return true;
    }

    isChallenge(id: number) {
        return true;
    }

    getYouthCenterActivities(id: number) {
        return Observable.of([new Event('MockResponseEvent1', null, null, null)]);
    }

    getAllActivityParticipants(id: number) {
        return Observable.of([new User(1, 'MockResponseUser1', 'user', 'admin', 1, 0, null, null)]);
    }
}

export class YouthCenterServiceMock {

    getAllLocations() {
        return null;
    }

    getTheRightId() {
        return null;
    }
}

export class RouterMock {

    navigate(path: String) {
        return path;
    }

}
