import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../Interfaces/user';

/*This class is used to authenticate a person logging in and holds a reference to the current
user. Import in constructor in order to use in a view where you want to differentiate what is
shown to the user. Use *appHasRole="" as an element tag in order to specify which role sees
it, for example <p appHasRole="['user']">This is only seen by a user</p>.

You also need to include SharedDirectivesModule in your imports for the page where you want
roles to be checked.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);

    constructor() {
    }

    login(name, password) {
        if (name === 'user') {
            this.currentUser.next({
                userName: name,
                password: password,
                roles: ['user']
            });
        } else if (name === 'admin') {
            this.currentUser.next({
                userName: name,
                password: password,
                roles: ['admin']
            });
        } else if (name === 'dev') {
            this.currentUser.next({
                userName: name,
                password: password,
                roles: ['admin', 'user']
            });
        } else {
            this.currentUser.next({
                userName: name,
                password

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
