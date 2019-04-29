import {Component, OnInit} from '@angular/core';
import {HelloService, SearchType} from '../../services/hello.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-hello',
    templateUrl: './hello.page.html',
    styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {


    public hellos = [];


    constructor(private userService: UserService, private helloService: HelloService) {
    }

    ngOnInit() {
    }

    searchChanged() {
        this.userService.getAllUsers()
            .subscribe(data => this.hellos = data);
        console.log(this.hellos);


    }




}
