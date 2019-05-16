import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../Models/user';
import {IChallenge} from '../../Interfaces/challenge';
import {IActivity} from '../../Interfaces/activity';
import {UserService} from '../user-service/user.service';



@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/activity/';
    url2 = 'https://webbapppvt15grupp2.herokuapp.com/challenge/';

    constructor(private http: HttpClient, private userservice: UserService) {
    }

    /**
     * Returnerar alla aktiviteter från webbservern
     *
     */
    getAllActivities(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url);
    }

    addActivityAndChallenge( name: String, location: String, description: String, altlocation: String, category: number,
    challenger: number, challenged: number, responsibleuser: number) {
let activityId;
            const httpOptions = {
                headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })

            };

            const body = JSON.stringify({

                'createdbyid': this.userservice.currentUser.id,
                'name': name,
                'location': location,
                'responsibleuser' : this.userservice.currentUser.id,
                'description': description,
                'altlocation': altlocation,
                'category': category,
                'resource': 1

            });
            this.http.post<IActivity>(this.url, body, httpOptions).subscribe(data => {

activityId = data[0].id;


                    console.log(data);


                }, error => {
                   console.log('Cant send challenge');


                }
            );
        const httpOption = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body2 = JSON.stringify({


            'name': name,
            'challenger': challenger,
            'challenged': challenged,
            'responisbleuser': this.userservice.currentUser.id,
            'activity': activityId

        });
        this.http.post<IChallenge>(this.url2, body2, httpOption).subscribe(data => {


                console.log(data);


            }, error => {
                console.log('Cant send challenge');


            }
        );
        }
    }


