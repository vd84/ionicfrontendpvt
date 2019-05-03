import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../Interfaces/user';
import {User} from '../../Models/User';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/user/';


    constructor(private http: HttpClient) {
    }

    /**
     * Returnerar alla users frpn webbservern
     *
     */
    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);


    }


    /**

     Denna metod ändrar ett user objekt i databasen
     @param headers: Detta skickas med för att requesten ska veta att det är en json fil som kommer
     @param body: detta är värdena som skickas med till webbservern, således, allt som är skiljt från hur det objektet som finns
     i databasen ser ut, ändras.
     Subscribe betyder att vi lyssnar efter det svar som webbservern ska returnera vid lyckad ändring/error/annat fel

     **/
    modifyUser(username: String, password: String) {


        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({

            'username': username,
            'password': password,
            'points': 0,
            'fairplaypoints': 0,
            'currentyouthcentre': 1,
            'role': 1,
            'facebook_login': 'Face1',
            'facebook_password': 'pass'
        });

        this.http.put(this.url, body, httpOptions).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }


    /**
     *
     * @param username detta är användaren som ska skickas in i databasen
     * @param password detta är password som ska in webbservern
     * @param currentyouthcentre detta är ungdomsgården som ska in i databasen
     */
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

        this.http.post(this.url, body, httpOptions).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }


}

