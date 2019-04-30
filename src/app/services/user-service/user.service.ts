import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../Interfaces/user';
import {User} from '../../Models/User';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/api/user/';
    postUrl = '//webbapppvt15grupp2.herokuapp.com/addUser';


    constructor(private http: HttpClient) {
    }

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);


    }

    getOneUser(id): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.url}${id}`);
    }

    getUserById(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);
    }


    submitUser(username: string, password: string, current_youthcentre: number) {

        // const headers = new Headers();
        // headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json');


        const body = JSON.stringify({

            username: username,
            password: password,
            currentyouthcentre: current_youthcentre

        });

        this.http.post(this.postUrl, body).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }


}

