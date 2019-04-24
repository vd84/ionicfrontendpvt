import {Injectable} from '@angular/core';
import {url} from '@angular-devkit/schematics';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class HelloService {


    constructor(private http: HttpClient) {
        console.log('hello provider');
    }

    getRemoteData() {
        return this.http.get('https://webbapppvt15grupp2.herokuapp.com/api/hello').subscribe(data => {
            console.log(data);
        });
    }

}


