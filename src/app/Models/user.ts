export class User {
    private _id: number;
    private _name: string;
    private _displayname: string;
    private _role: string;
    private _currentyouthcentre: number;
    private _bookedActivities = [];
    private _picture;
    private _numberOfBadges: number;


    constructor(id: number, name: string, role: string, currentyouthcentre: number, displayname: string) {
        this._id = id;
        this._name = name;
        this._role = role;
        this._currentyouthcentre = currentyouthcentre;
        this._displayname = displayname;

    }

    get getBookedActivities() {
        return this._bookedActivities;
    }

    bookActivity(activity) {
        if (!this._bookedActivities.includes(activity)) {
            this._bookedActivities.push(activity);
        }
    }


    toString() {
        return ' ID: ' + this._id + ' Name: ' + this._name;
    }

    isBooked(activity): boolean {
        if (this._bookedActivities.includes(activity)) {
            return true;
        } else {
            return false;
        }
    }

    removeBookedActivity(activity) {
        this._bookedActivities.splice(this._bookedActivities.indexOf(activity), 1);
    }

    getNumberOfBadges() {
        return this._numberOfBadges;
    }



    get role(): string {
        return this._role;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set setBookedActivities(value: []) {
        this._bookedActivities = value;
    }

    set name(value: string) {
        this._name = value;
    }

    get currentYouthCentre(): number {
        return this._currentyouthcentre;
    }

    set currentYouthCentre(value: number) {
        this._currentyouthcentre = value;
    }


    set picture(value) {
        this._picture = value;
    }


    get picture() {
        return this._picture;
    }


    get displayname(): string {
        return this._displayname;
    }

    set displayname(value: string) {
        this._displayname = value;
    }

    get currentyouthcentre(): number {
        return this._currentyouthcentre;
    }

    set currentyouthcentre(value: number) {
        this._currentyouthcentre = value;
    }

    get bookedActivities(): any[] {
        return this._bookedActivities;
    }

    set bookedActivities(value: any[]) {
        this._bookedActivities = value;
    }

    get numberOfBadges(): number {
        return this._numberOfBadges;
    }

    set numberOfBadges(value: number) {
        this._numberOfBadges = value;
    }
}
