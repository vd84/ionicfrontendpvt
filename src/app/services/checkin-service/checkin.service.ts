import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CheckinService {

    youthUrl = 'https://webbapppvt15grupp2.herokuapp.com/checkinyouthcentre/';

    activityUrl = 'https://webbapppvt15grupp2.herokuapp.com/checkinactivity/';


    constructor(private http: HttpClient, private toastController: ToastController) {
    }

    youthcentreCheckin(userId: number, youthCentreId: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };
        const body = JSON.stringify({
            'userid': userId,
            'youthcentreid': youthCentreId,
        });


        this.http.post(this.youthUrl, body, httpOptions).subscribe(data => {
                let badgeList: any = [];
                console.log('Post i checkinpage ' + ' youthcentrecheckin');
                console.log(data);

                badgeList = data;


                if (badgeList.length !== 0) {
                    let originalPresentString = 'Grattis, du har fått nya märken:';


                    for (let i = 0; i < badgeList.length; i++) {

                        originalPresentString += '\n' + badgeList[i].name;
                    }

                    this.presentToast(originalPresentString);


                }


            },
            error => {
                console.log('Error');
            });


    }

    activityCheckin(userId: number, activityID: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };
        const body = JSON.stringify({
            'userid': userId,
            'activityid': activityID,
        });

        this.http.post(this.activityUrl, body, httpOptions).subscribe(data => {
                console.log('Post i checkinpage ' + ' activitycheckin');
                console.log(data);
            },
            error => {
                console.log('Error');
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

