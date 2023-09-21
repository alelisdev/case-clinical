import { Injectable }     from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MailboxService } from './mailbox.service';

@Injectable()
export class MailBoxAuthGuard implements CanActivate {
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this._mailboxService.token) {
            if(route.params?.legalCaseId){
                this.router.navigate([state.url + '/all']);
            }
            else{
                this.router.navigate(['apps/mailbox/inbox']);
            }
        }
        return true;
    }

    constructor(
        private router: Router, 
        private _mailboxService: MailboxService,
        private readonly route: ActivatedRoute
    ) { }
}