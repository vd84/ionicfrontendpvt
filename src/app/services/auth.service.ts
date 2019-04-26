import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../Interfaces/user';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);

    constructor() {
    }

    login(name) {
        if (name === 'user') {
            this.currentUser.next({
                name: name,
                roles: ['user']
            });
        } else if (name === 'admin') {
            this.currentUser.next({
                name: name,
                roles: ['admin']
            });
        }
    }

    getUserSubject() {
        return this.currentUser.asObservable();
    }

    logout() {
        this.currentUser.next(null);
    }

    hasRoles(roles: string[]): boolean {
        for (const oneRole of roles) {
            if (!this.currentUser || !this.currentUser.value.roles.includes(oneRole)) {
                return false;
            }
        }

        return true;
    }

}
