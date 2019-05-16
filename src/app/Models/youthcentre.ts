export class Youthcentre {
    private _id: number;
    private _currentactivactivities: number;
    private _lat: number;
    private _location: number;
    private _lon: number;
    private _name: string;
    private _score: number;
    private _isClose = false;

    constructor(id: number, currentactivactivities: number, lat: number, lon: number, location: number, name: string, score: number ) {
        this._id = id;
        this._currentactivactivities = currentactivactivities;
        this._lat = lat;
        this._location = location;
        this._lon = lon;
        this._name = name;
        this._score = score;
        this._isClose = false;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get currentactivactivities(): number {
        return this._currentactivactivities;
    }

    set currentactivactivities(value: number) {
        this._currentactivactivities = value;
    }

    get lat(): number {
        return this._lat;
    }

    set lat(value: number) {
        this._lat = value;
    }

    get location(): number {
        return this._location;
    }

    set location(value: number) {
        this._location = value;
    }

    get lon(): number {
        return this._lon;
    }

    set lon(value: number) {
        this._lon = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }
    get isClose(): boolean {
        return this._isClose;
    }

    set isClose(value: boolean) {
        this._isClose = value;
    }
}
