export class ParticipationUser {

    private _id;
    private _displayname;
    private _participated;

    constructor(id: number, displayname: string, participated: number) {
        this._id = id;
        this._displayname = displayname;
        this._participated = participated;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get displayname() {
        return this._displayname;
    }

    set displayname(value) {
        this._displayname = value;
    }

    get participated() {
        return this._participated;
    }

    set participated(value) {
        this._participated = value;
    }
}
