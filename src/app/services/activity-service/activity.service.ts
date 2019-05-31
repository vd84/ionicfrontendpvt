import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IActivity} from '../../Interfaces/activity';
import {UserService} from '../user-service/user.service';
import {User} from '../../Models/user';
import {ParticipationUser} from '../../Models/ParticipationUser';
import {ToastController} from '@ionic/angular';
import {Category} from '../../Models/Category';


@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    // Denna url är även för att hämta aktivititer för specifik user, alltså om den attendat
    postAndPutactivityUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/';
    getactivityUrl = 'https://webbapppvt15grupp2.herokuapp.com/allactivity/';
    participationUrl = 'https://webbapppvt15grupp2.herokuapp.com/participation/';
    youthCentreUrl = 'https://webbapppvt15grupp2.herokuapp.com/activity/youthcentre/';
    participationByActivityUrl = 'https://webbapppvt15grupp2.herokuapp.com/participationbyactivity/';

    categoryUrl = 'http://webbapppvt15grupp2.herokuapp.com/category';

    // alla aktiviteter som ska visas på admin sidan
    adminActivities = [];
    // alla aktiviteter för en user/admin
    allActivities = [];
    // alla aktiva aktiviteter
    allActiveActivities = [];
    // allt från databasen
    allActivitiesFromDatabase = [];
    // alla mina aktiviteter som jag ska delta på +++++ samt mina förslag
    allMyActivities = [];
    // alla mina pågående eller kommmande aktiviteter
    allMyActiveActivities = [];
    // alla som deltar på en specifik aktivitet
    allActivityParticipants = [];
    // Lista för alla kategorier
    allCategories = [];


    constructor(private http: HttpClient, private userservice: UserService, private toastController: ToastController) {
    }

    /**
     * Returnerar alla aktiviteter från webbservern
     *
     */
    getAllActivities() {
        this.adminActivities = [];
        this.allActivities = [];
        this.allActiveActivities = [];
        this.allActivitiesFromDatabase = [];
        this.allMyActivities = [];
        this.allMyActiveActivities = [];
        this.allActivityParticipants = [];
        this.allCategories = [];


        console.log('called generate all activities');
        this.http.get<Event[]>(this.getactivityUrl + this.userservice.currentUser.id).subscribe(data => {


            console.log('Activity Service');
            this.allActivitiesFromDatabase = data;
            this.generateAllActvitiesPage();
            this.generateAdminPendingPage();
            this.generateAllMyActivities();
            this.getAllCategories();


        }, error => {
            console.log(error);
        });




    }

    addMySuggestedAndNotAcceptedOrDeclinedActivitiesToMyActivitiesPage() {
        for (const activity of this.allActivitiesFromDatabase) {
            if ((activity.createdby === this.userservice.currentUser.id && this.activityIsSuggestion(activity)) || (activity.createdby === this.userservice.currentUser.id && activity.challengeaccepted === 0 && activity.challengerejected === 0)) {
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
        this.allActiveActivities = [];
        for (const activity of this.allActivities) {
            if (this.endDateHasNotPassed(activity)) {
                this.allActiveActivities.push(activity);
            }
        }

    }

    generateAdminPendingPage() {
        this.adminActivities = [];
        for (const activity of this.allActivitiesFromDatabase) {
            if ((this.activityIsSuggestion(activity) && this.isChallenger(activity)) || (this.activityIsPending(activity)) || (this.activityIsAccepted(activity) && this.isOfYourCentre(activity)) || (this.activityIsDeclined(activity) && this.isOfYourCentre(activity))) {
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

    getAllCategories() {
        this.http.get<Category[]>(this.categoryUrl).subscribe(data => {
            this.allCategories = data;
        });
    }


    generateAllMyActivities() {
        this.allMyActivities = [];
        this.allMyActiveActivities = [];




            this.http.get<Event[]>(this.postAndPutactivityUrl + this.userservice.currentUser.id).subscribe(data => {
                for (let activity of data) {


                    console.log(activity);

                    this.allMyActivities.push(activity);
                    if (!this.activityIsSuggestion(activity) && this.endDateHasNotPassed(activity)) {
                        this.allMyActiveActivities.push(activity);

                    }

                }
            }, error1 => {
                console.log(error1);
            });
            this.addMySuggestedAndNotAcceptedOrDeclinedActivitiesToMyActivitiesPage();






    }

    isMyActivity(id: number): boolean {
        for (let activity of this.allMyActivities) {
            if (activity.id === id && activity.issuggestion === 0) {
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
            'startdate': startdate,
            'enddate': enddate

        });

        this.http.post<IActivity>(this.postAndPutactivityUrl, body, httpOptions).subscribe(data => {

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
            'startdate': this.correctTimestamp(startdate),
            'enddate': this.correctTimestamp(enddate)


        });
        console.log(body);

        this.http.put(this.postAndPutactivityUrl, body, httpOptions).subscribe(data => {
                console.log(data);

                this.presentToast('Ändring lyckad');
                this.getAllActivities();
            },
            error => {
                console.log('Error');
            });


    }

    correctTimestamp(timestamp: string) {
        let output = timestamp.substr(0, 10) + 'T' + timestamp.substr(11);
        console.log(output);
        return output;
    }

    getAllActivityParticipants(activityId: number) {
        this.http.get<ParticipationUser[]>(this.participationByActivityUrl + activityId).subscribe(data => {
            console.log('Activity Service' + ' + getallactivityparticipants');
            this.allActivityParticipants = data;
            console.log(data);
        }, error1 => {
            console.log(error1);
        });
    }

    endDateHasNotPassed(activity) {

        let today = new Date();


        let fixedDate = activity.enddate.replace(' ', 'T');

        let endDate = new Date(fixedDate);


        return (today <= endDate);


    }

    isOnGoing(activity) {

        let today = new Date();
        let activitystartdate = new Date(activity.startdate.replace(' ', 'T'));
        let activityenddate = new Date(activity.enddate.replace(' ', 'T'));
        return (today >= activitystartdate) && (today <= activityenddate);

    }

    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }


    hasStarted(activity: any) {
        let today = new Date();

        let activityStartDate = new Date(activity.startdate.replace(' ', 'T'));

        return (today >= activityStartDate);
    }
}


