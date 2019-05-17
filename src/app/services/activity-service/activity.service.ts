import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IActivity} from '../../Interfaces/activity';
import {UserService} from '../user-service/user.service';



@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/activity/';
    challengeUrl = 'https://webbapppvt15grupp2.herokuapp.com/activityChallenged/';
    participationUrl = 'https://webbapppvt15grupp2.herokuapp.com/participation/';
    youthCentreUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/youthcentre/';
    allMyActivities = [];
    allMyPendingActivities = [];


    constructor(private http: HttpClient, private userservice: UserService) {
    }

    /**
     * Returnerar alla aktiviteter från webbservern
     *
     */
    getAllActivities(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url);
    }

    getAllMyActivities(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url + this.userservice.currentUser.id);
    }

    isMyActivity(id: number): boolean {
        for (let activity of this.allMyActivities) {
            if (activity.id === id) {
                return true;
            }
        }
        return false;
    }

    isChallenge(id: number): boolean {
        for (let activity of this.allMyPendingActivities) {
            if (activity.id === id) {
                return true;
            }
        }
        return false;
    }

    getAllMyPendingActivities() {
        return this.http.get<Event[]>(this.challengeUrl + this.userservice.currentUser.id);
    }

    getYouthCenterActivities (id: number) {
    return this.http.get<Event[]>(this.youthCentreUrl + id);
    }

    addActivity(createdBy: number, name: String, description: String, responsibleUser: number, alt_location: String, isSuggestion: number, category: number, challenger: number, challengedyouthcenter: number) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({

            'createdby': createdBy,
            'name': name,
            'description': description,
            'responsibleuser': responsibleUser,
            'alternativelocation': alt_location,
            'issuggestion': isSuggestion,
            'category': category,
            'resource': 1,
            'challenger': challenger,
            'challenged': challengedyouthcenter

        });

        this.http.post<IActivity>(this.url, body, httpOptions).subscribe(data => {

                console.log(data);

            }, error => {
                console.log('Cant send challenge');
            }
        );
    }

    submitParticipation(userID: number, activityID: number) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({
            'user': userID,
            'activity': activityID
        });

        this.http.post(this.participationUrl, body, httpOptions).subscribe(data => {
                this.allMyActivities.push(data[0]);
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }

    removeParticipation(userId: any, activityId: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({
            'user': userId,
            'activity': activityId
        });

        this.http.post(this.participationUrl + '/delete/', body, httpOptions).subscribe(data => {
                let activity = data[0];
                this.allMyActivities.splice(this.allMyActivities.indexOf(activity), 1);
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }


}


