import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../Interfaces/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/user/';
    postUrl = 'https://webbapppvt15grupp2.herokuapp.com/adduser';


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


    submitUser(username: string, password: string, currentyouthcentre: number) {


        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({

            username: username,
            password: password,
            currentyouthcentre: currentyouthcentre

        });

        this.http.post(this.postUrl, body, httpOptions).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }


}

