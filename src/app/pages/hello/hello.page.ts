import {Component, OnInit} from '@angular/core';
import {HelloService, SearchType} from '../../services/hello.service';

@Component({
    selector: 'app-hello',
    templateUrl: './hello.page.html',
    styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {


    public hellos = [];


    constructor(private movieService: HelloService) {
    }

    ngOnInit() {
    }

    searchChanged() {
        this.movieService.getAllHellos()
            .subscribe(data => this.hellos = data);
        console.log(this.hellos);


    }


}
