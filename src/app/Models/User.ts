export class User {

    private _id: number;
    private _name: String;
    private _role: number;
    private _currentYouthCentre: number;

    constructor(id: number, name: String, role: number) {
        this._id = id;
        this._name = name;
        this._role = role;

    }
    toString() {
        return ' ID: ' + this._id + ' Name: ' + this._name + ' Role: ' + this._role; }

    get role(): number {
        return this._role;
    }
    set role(value: number) {
        this._role = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get currentYouthCentre(): number {
        return this._currentYouthCentre;
    }

    set currentYouthCentre(value: number) {
        this._currentYouthCentre = value;
    }
}
