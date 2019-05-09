export class UserBadge {

    private _id: number;
    private _user: number;
    private _badge: number;

    constructor(id: number, user: number, badge: number) {
        this._id = id;
        this._user = user;
        this._badge = badge;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get user(): number {
        return this._user;
    }

    set user(value: number) {
        this._user = value;
    }

    get badge(): number {
        return this._badge;
    }

    set badge(value: number) {
        this._badge = value;
    }


}
