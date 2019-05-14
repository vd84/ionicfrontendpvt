import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../services/authentication-service/auth.service';
import {UserService} from '../services/user-service/user.service';

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

    @Input('appHasRole') role: string;

    constructor(private userService: UserService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    }

    ngOnInit() {

        if (this.userService.hasRoles(this.role)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }

    }

}
