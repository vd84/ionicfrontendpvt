import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IActivity} from '../../Interfaces/activity';
import {UserService} from '../user-service/user.service';



@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    activityUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/';
    challengeUrl = 'https://webbapppvt15grupp2.herokuapp.com/activityChallenged/';
    participationUrl = 'https://webbapppvt15grupp2.herokuapp.com/participation/';
    youthCentreUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/youthcentre/';
    allActivities = [];
    allMyActivities = [];
    allMyPendingActivities = [];


    constructor(private http: HttpClient, private userservice: UserService) {
    }

    /**
     * Returnerar alla aktiviteter från webbservern
     *
     */
    getAllActivities() {
        this.http.get<Event[]>(this.activityUrl).subscribe(data => {
            this.allActivities = data;

            this.filterPendingActivities();


        }, error => {
            console.log(error);
        });


    }

    filterPendingActivities() {
        console.log(this.allActivities);


        for (const activity of this.allActivities) {
            console.log(this.userservice.currentUser.currentyouthcentre);
            console.log(activity);
            console.log(activity.challenged !== this.userservice.currentUser.currentyouthcentre);
            console.log(activity.challenger !== this.userservice.currentUser.currentyouthcentre);

            if (activity.challenged === this.userservice.currentUser.currentyouthcentre || activity.challenger === this.userservice.currentUser.currentyouthcentre) {
                console.log(activity + 'tas bort');
                this.allMyPendingActivities.push(activity);

            }
            console.log(this.allMyPendingActivities);

        }
    }


    getAllMyActivities() {
        this.http.get<Event[]>(this.activityUrl + this.userservice.currentUser.id).subscribe(data => {
            this.allMyActivities = data;
        }, error1 => {
            console.log(error1);
        });
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

    // getAllMyPendingActivities() {
    //     return this.http.get<Event[]>(this.challengeUrl + this.userservice.currentUser.currentyouthcentre);
    // }

    getYouthCenterActivities(id: number) {
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

        this.http.post<IActivity>(this.activityUrl, body, httpOptions).subscribe(data => {

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


    modifyActivity(id,
                   name,
                   description,
                   responsibleuser,
                   alternativelocation,
                   issuggestion,
                   isactive,
                   category,
                   resource,
                   challenger,
                   challenged,
                   completed,
                   challengeaccepted,
                   challengedrejected,
                   winner) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({
            'id': id,
            'responsibleuser': responsibleuser,
            'name': name,
            'description': description,
            'alternativelocation': alternativelocation,
            'issuggestion': issuggestion,
            'isactive': isactive,
            'category': category,
            'resource': resource,
            'challenger': challenger,
            'challenged': challenged,
            'completed': completed,
            'winner': winner,


        });

        this.http.put(this.activityUrl, body, httpOptions).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });


    }

    getAllActivityParticipants(id: number) {
        // TODO
    }


}


