import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/user';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class UserService {


    currentUser: User;

    currentUserJson;


    url = 'https://webbapppvt15grupp2.herokuapp.com/user/';


    constructor(private http: HttpClient, private router: Router, private toastController: ToastController) {


    }


    logout() {
        this.currentUser = null;
    }

    hasRoles(role: string): boolean {

        return !(!this.currentUser || this.currentUser.role !== role);

    }

    /**

     Denna metod ändrar ett user objekt i databasen
     i databasen ser ut, ändras.
     Subscribe betyder att vi lyssnar efter det svar som webbservern ska returnera vid lyckad ändring/error/annat fel


     **/
    changePassword(password: String) {


        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({
            'id': 1,
            'username': this.currentUser.name,
            'displayname': this.currentUser.displayname,
            'password': password,
            'active': 1,
            'points': 0,
            'fairplaypoints': 0,
            'currentyouthcentre': this.currentUser.currentyouthcentre,
            'facebooklogin': 'Face1',
            'facebookpassword': 'pass',
            'role': 1,
            'isfacebookuser': this.currentUser.isfacebookuser,
            'image': this.currentUser.picture
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
    submitUser(username: String, displayname: String, password: String, currentyouthcentre: number, loggedInWithFaceBook: number) {


        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({


            'username': username,
            'displayname': displayname,
            'password': password,
            'currentyouthcentre': currentyouthcentre,
            'isfacebookuser': loggedInWithFaceBook

        });
        this.http.post<User>(this.url, body, httpOptions).subscribe(data => {
                this.currentUserJson = data;
                console.log(this.currentUserJson);

                let role;
                if (this.currentUserJson[0].id === 1) {
                    role = 'admin';
                } else {
                    role = 'user';
                }
                this.currentUser = new User(this.currentUserJson[0].id, this.currentUserJson[0].username, this.currentUserJson[0].displayname, role, this.currentUserJson[0].currentyouthcentre, this.currentUserJson[0].isfacebookuser);
                console.log(this.currentUser);
                this.presentToast('Welcome ' + this.currentUser.name + '!');
                this.router.navigate(['../tabs/home']);
            }, error => {
                if (loggedInWithFaceBook === 1) {
                    this.login(username, password, loggedInWithFaceBook);

                } else {
                    this.presentToast('User taken');
                }


            }
        );
    }


    deleteUser(password) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({
            'id': this.currentUser.id,
            'username': this.currentUser.name,
            'displayname': 'terminated account',
            'password': 'terminated',
            'active': 0,
            'points': 0,
            'fairplaypoints': 0,
            'currentyouthcentre': this.currentUser.currentyouthcentre,
            'role': 1,
            'isFacebookUser': 0,
            'image': this.currentUser.picture
        });
        this.http.put(this.url, body, httpOptions).subscribe(data => {
                console.log(data);
                this.presentToast('Kontot avslutat');
                this.router.navigate(['../login']);

            },
            error => {
                console.log('Error');
            });

    }

    changeImage(picture, password) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({
            'id': this.currentUser.id,
            'username': this.currentUser.name,
            'displayname': this.currentUser.displayname,
            'password': password,
            'active': 0,
            'points': 0,
            'fairplaypoints': 0,
            'currentyouthcentre': this.currentUser.currentyouthcentre,
            'role': 1,
            'isFacebookUser': 0,
            'image': this.currentUser.picture
        });
        this.http.put(this.url, body, httpOptions).subscribe(data => {
                console.log(data);

            },
            error => {
                console.log('Error');
            });

    }


    login(username: String, password: String, isfacebookuser: number) {


        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({


            username: username,
            password: password,
            isfacebookuser: isfacebookuser

        });

        this.http.post<User>(this.url + 'login', body, httpOptions).subscribe(
            data => {
                this.currentUserJson = data;
                console.log(this.currentUserJson);

                let role;
                if (this.currentUserJson[0].role === 1) {
                    role = 'user';
                } else {
                    role = 'admin';
                }
                this.currentUser = new User(this.currentUserJson[0].id, this.currentUserJson[0].username, this.currentUserJson[0].displayname, role, this.currentUserJson[0].currentyouthcentre, this.currentUserJson[0].isfacebookuser);

                this.currentUser.picture = this.currentUserJson[0].image;

                console.log(this.currentUser);
                this.presentToast('Välkommen ' + this.currentUser.displayname + '!');
                this.router.navigate(['../tabs/home']);
            }, error => {
                this.presentToast('Invalid credentials');
            }
        );

    }

    addYouthCentre(youthcentre) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };

        const body = JSON.stringify({
            'id': 1,
            'username': this.currentUser.name,
            'displayname': this.currentUser.displayname,
            'password': 'pass1',
            'active': 1,
            'points': 0,
            'fairplaypoints': 0,
            'currentyouthcentre': youthcentre,
            'facebooklogin': 'Face1',
            'facebookpassword': 'pass',
            'role': 1,
            'isfacebookuser': this.currentUser.isfacebookuser,
            'image': this.currentUser.picture
        });

        this.http.put(this.url, body, httpOptions).subscribe(data => {
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

