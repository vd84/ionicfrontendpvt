import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';


@Component({
    selector: 'app-choose-picture',
    templateUrl: './choose-picture.page.html',
    styleUrls: ['./choose-picture.page.scss'],
})
export class ChoosePicturePage implements OnInit {

    allAvatars: Object = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getAllAvatars();


        setTimeout(() => {
            console.log(this.allAvatars);

        }, 5000);

    }




    getAllAvatars() {
        this.userService.getAllAvatars().subscribe(data => {
            this.allAvatars = data;
        });
    }

    chooseThatPicture(pictureID) {
        console.log(pictureID);
        this.userService.changeImage(pictureID);

    }
}
