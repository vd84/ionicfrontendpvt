import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IActivity} from '../../Interfaces/activity';
import {UserService} from '../user-service/user.service';
import {User} from '../../Models/user';
import {ParticipationUser} from '../../Models/ParticipationUser';
import {ToastController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    activityUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/';
    participationUrl = 'https://webbapppvt15grupp2.herokuapp.com/participation/';
    youthCentreUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/youthcentre/';
    participationByActivityUrl = 'https://webbapppvt15grupp2.herokuapp.com/participationbyactivity/';

    // alla aktiviteter som ska visas på admin sidan
    adminActivities = [];

    // alla aktiviteter för en user/admin
    allActivities = [];
    // allt från databasen
    allActivitiesFromDatabase = [];
    // alla mina aktiviteter som jag ska delta på
    allMyActivities = [];

    // allMyPendingActivities = [];

    // alla som deltar på en specifik aktivitet
    allActivityParticipants = [];


    constructor(private http: HttpClient, private userservice: UserService, private toastController: ToastController) {
    }

    /**
     * Returnerar alla aktiviteter från webbservern
     *
     */
    getAllActivities() {
        this.http.get<Event[]>(this.activityUrl).subscribe(data => {
            this.allActivitiesFromDatabase = data;
            this.generateAllActvitiesPage();
            this.generateAdminPendingPage();
            this.addMySuggestedActivitiesToMyActivitiesPage();


        }, error => {
            console.log(error);
        });


    }

    addMySuggestedActivitiesToMyActivitiesPage() {


        for (const activity of this.allActivitiesFromDatabase) {
            console.log(activity);
            console.log(activity.createdby === this.userservice.currentUser.id)

            if (activity.createdby === this.userservice.currentUser.id) {
                this.allMyActivities.push(activity);
            }

        }

    }

    generateAllActvitiesPage() {


        this.allActivities = [];


        for (const activity of this.allActivitiesFromDatabase) {
            if (!this.activityIsSuggestion(activity) && !this.activityIsPending(activity) && !this.activityIsDeclined(activity) && this.activityIsAccepted(activity)) {
                this.allActivities.push(activity);

            }
        }

    }

    generateAdminPendingPage() {

        this.adminActivities = [];


        for (const activity of this.allActivitiesFromDatabase) {
            if ((this.activityIsSuggestion(activity) && this.isChallenger(activity)) || (this.activityIsPending(activity)) || (this.activityIsAccepted(activity) && this.isOfYourCentre(activity))) {
                console.log((this.activityIsSuggestion(activity) && this.isChallenger(activity)) + ' ' + activity.id);
                console.log((this.activityIsPending(activity)) + ' ' + activity.id);
                console.log(this.activityIsAccepted(activity) && this.isOfYourCentre(activity) + ' ' + activity.id);

                this.adminActivities.push(activity);
            }

        }

    }


    activityIsSuggestion(activity) {

        return activity.issuggestion === 1;

    }

    activityIsPending(activity) {
        let youthcentre = this.userservice.currentUser.currentyouthcentre;

        return (activity.challenger === youthcentre || activity.challenged === youthcentre) && (activity.challengeaccepted === 0 && activity.challengerejected === 0) && !this.activityIsSuggestion(activity);

    }

    activityIsDeclined(activity) {


        return activity.challengerejected === 1;
    }

    activityIsAccepted(activity) {
        return activity.challengeaccepted === 1;
    }

    isOfYourCentre(activity) {
        return activity.challenged === this.userservice.currentUser.currentyouthcentre || activity.challenger === this.userservice.currentUser.currentyouthcentre;
    }


    generateAllMyActivities() {
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
        for (let activity of this.adminActivities) {

            if (!this.activityIsSuggestion(activity) && !this.activityIsAccepted(activity) && !this.activityIsDeclined(activity) && activity.id === id && this.isChallenged(activity)) {
                return true;
            }
        }
        return false;
    }

    isChallenged(activity) {
        return activity.challenged === this.userservice.currentUser.currentyouthcentre;
    }

    isChallenger(activity) {
        return activity.challenger === this.userservice.currentUser.currentyouthcentre;
    }


    getYouthCenterActivities(id: number) {
        return this.http.get<Event[]>(this.youthCentreUrl + id);
    }

    changeDateFormat(oldFormat) {
        return (oldFormat.slice(0, 19));
    }

    addActivity(createdBy: number, name: String, description: String, responsibleUser: number, alt_location: String, isSuggestion: number, category: number, challenger: number, challengedyouthcenter: number, startdate: String, enddate: String) {

        startdate = this.changeDateFormat(startdate);
        enddate = this.changeDateFormat(enddate);

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
            'challenged': challengedyouthcenter,
            'startdate' : startdate,
            'enddate' : enddate

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
                   challengerejected,
                   winner,
    startdate,
                   enddate) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({
            'id': id,
            'name': name,
            'description': description,
            'responsibleuser': responsibleuser,
            'alternativelocation': alternativelocation,
            'issuggestion': issuggestion,
            'isactive': isactive,
            'category': category,
            'resource': resource,
            'challenger': challenger,
            'challenged': challenged,
            'completed': completed,
            'challengeaccepted': challengeaccepted,
            'challengerejected': challengerejected,
            'winner': winner,
            'startdate' : startdate,
            'enddate' : enddate


        });

        this.http.put(this.activityUrl, body, httpOptions).subscribe(data => {
                console.log(data);

                this.presentToast('Ändring lyckad');
                this.getAllActivities();
            },
            error => {
                console.log('Error');
            });


    }

    getAllActivityParticipants(activityId: number) {
        this.http.get<ParticipationUser[]>(this.participationByActivityUrl + activityId).subscribe(data => {
            this.allActivityParticipants = data;
            console.log(data);
        }, error1 => {
            console.log(error1);
        });
    }

    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }


}


