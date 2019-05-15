import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.page.html',
})
export class ChallengePage implements OnInit {

    constructor(private router: Router) {
    }

    sendChallenge() {
        this.router.navigate(['event']);
    }

    ngOnInit(): void {
    }

}
