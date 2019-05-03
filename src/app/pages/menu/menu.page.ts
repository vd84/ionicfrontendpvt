import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelloService} from '../../services/hello.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    public currentUser;


    constructor(private router: Router, private helloService: HelloService, private userService: UserService) {
    }

    ngOnInit() {

    }


    createActivity() {
        this.router.navigate(['create-event']);

    }


    map() {
        this.router.navigate(['map']);

    }

    badges() {
        this.router.navigate(['badges']);

    }

    settings() {
        this.router.navigate(['settings']);

    }

    events() {
        this.router.navigate(['event']);

    }

    getCurrentUser() {

        this.userService.getAllUsers().subscribe(data => this.currentUser = data);

        console.log(this.currentUser);

    }


}
