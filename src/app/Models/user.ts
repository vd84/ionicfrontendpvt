export class User {
    private _id: number;
    private _name: string;
    private _role: string;
    private _currentyouthcentre: number;
    private bookedActivities = [];
    private numberOfBadges: number;


    constructor(id: number, name: string, role: string, currentyouthcentre: number) {
        this._id = id;
        this._name = name;
        this._role = role;
        this._currentyouthcentre = currentyouthcentre;

    }

    get getBookedActivities() {
        return this.bookedActivities;
    }

    bookActivity(activity) {
        if (!this.bookedActivities.includes(activity)) {
            this.bookedActivities.push(activity);
        }
    }


    toString() {
        return ' ID: ' + this._id + ' Name: ' + this._name;
    }

    isBooked(activity): boolean {
        if (this.bookedActivities.includes(activity)) {
            return true;
        } else {
            return false;
        }
    }

    removeBookedActivity(activity) {
        this.bookedActivities.splice(this.bookedActivities.indexOf(activity), 1);
    }

    getNumberOfBadges() {
        return this.numberOfBadges;
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
        this.bookedActivities = value;
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
}
