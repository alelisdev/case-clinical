import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MailboxService } from '../mailbox.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mail-auth',
  templateUrl: './mail-auth.component.html'
})
export class MailAuthComponent implements OnInit {

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public _mailboxService: MailboxService,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.token && params.email) {
        // this._mailboxService.token = params.token;
        // this._mailboxService.email = params.email;
        this._mailboxService.setEmailService({
          token: params.token,
          email: params.email,
        })
        // window.opener.location ='http://localhost:4200/#/apps/mailbox';
        window.opener.location.reload()
        window.close()
      }
    })
  }

  authenticate() {
    let url = `${this._mailboxService.url}/register?state=${window.location.origin}`;
    if(window.location.href.includes('#')) {
      url = url  + '?hash=true'
    }
    console.log(url);
    open(url, 'popup', 'popup=true')
  }
}
