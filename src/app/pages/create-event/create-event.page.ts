import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.page.html',
    styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goBackToMenu() {
        this.router.navigate(['menu']);

    }

    register(form: NgForm) {
    }


}
