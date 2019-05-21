import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CheckinService {

    youthUrl = 'https://webbapppvt15grupp2.herokuapp.com/checkinyouthcentre/';

    activityUrl = 'https://webbapppvt15grupp2.herokuapp.com/checkinactivity/';


    constructor(private http: HttpClient, public toastController: ToastController) {
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

        this.http.post(this.youthUrl, body, httpOptions).subscribe(data => { // Saknar vad vi tar emot?
                if (data !== null) {
                    this.presentToast(' Grattis! Du fick utmärkelsen ' + '"' + data[0].name + '"');
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

        this.http.post(this.activityUrl, body, httpOptions).subscribe(data => { // Saknar vad vi tar emot?
                if (data !== null) {
                    this.presentToast(' Grattis! Du fick utmärkelsen ' + '"' + data[0].name + '"');
                }            },
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

