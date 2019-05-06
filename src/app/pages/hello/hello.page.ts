import {Component, OnInit} from '@angular/core';
import {HelloService, SearchType} from '../../services/hello.service';
import {UserService} from '../../services/user-service/user.service';
import {User} from '../../Interfaces/user';
import {User} from '../../Models/User';

@Component({
    selector: 'app-hello',
    templateUrl: './hello.page.html',
    styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
    id: number;
    specificUser;

    public hellos = [];


    constructor(private userService: UserService, private helloService: HelloService) {
    }

    ngOnInit() {
    }

    searchChanged() {
        this.userService.getAllUsers()
            .subscribe(data => this.hellos = data);
       // console.log(this.hellos);


    }
    oneUser(id) {
        this.userService.getAllUsers().subscribe(data => this.hellos = data);
        for (const entry of this.hellos) {
            if (entry.id.toString() === id) {
                const user1 = new User(entry.id.toString(), entry.username.toString(), entry.role.toString());
                console.log(user1.toString());
            } else {
                console.log('Finns inte' + ' ' + entry.id + ' ' + id + ' ' + ( id === entry.id.toString()));
            }
        }
    }

   /* oneHello(id: number) {
        this.helloService.getOneHello(id).subscribe(data => this.specificUser = data);
        console.log(this.specificUser);
    }*/




}
