import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../Models/user';

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

    currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor() {
    }









}
