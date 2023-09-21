import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog'
import { Subject, takeUntil, take } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
// import { WebUiMailComposeComponent } from 'libs/web/ui/mail-compose/mail-compose.component'
import { MailboxService } from './mailbox.service'
// import { MailComposeService } from '../../../../ui/mail-compose/mail-compose.service'
import { ApiRelateTo } from './mailbox.constants'
import { ActivatedRoute } from '@angular/router';
import { MailComposeService } from './mail-compose/mail-compose.service';
import { WebUiMailComposeComponent } from './mail-compose/mail-compose.component';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector     : 'mailbox',
    templateUrl  : './mailbox.component.html',
    styles:[
        `
        .global-compose-button{
            bottom: 35px !important;
            right: 25px !important;
            z-index: 1000
        }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class MailboxComponent implements OnInit, OnDestroy
{
    @ViewChild('drawer') drawer: MatDrawer;

    legalCaseId:string = "";

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _matDialog: MatDialog,
        public _mailboxService: MailboxService,
        private _mailComposeService: MailComposeService,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.legalCaseId = this.route.snapshot.params?.legalCaseId;
        this._mailboxService.setLegalCaseId = this.legalCaseId
        this._mailComposeService.setLegalCaseId = this.legalCaseId
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened if the given breakpoint is active
                if ( matchingAliases.includes('md') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
                setTimeout(() => {
                  this.ref.markForCheck()
                  this.ref.detectChanges()
                  }, 2000);
            });

            this.ref.markForCheck()
            this.ref.detectChanges()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(WebUiMailComposeComponent, { data: { token: this._mailboxService.token } })
        dialogRef.componentInstance.isClose$.subscribe((res) => {
          if (res){
            dialogRef.close();
            if(!res.cancel) this.getAndUpdateDraftListing(res.relatedTo);
          }
        })
        dialogRef.backdropClick().subscribe(async () => {
          await dialogRef.componentInstance.saveDraftAndClose();
        })
      }

      getAndUpdateDraftListing(relatedTo='') {
        const location = window.location;
        const [folder, page] = location.href?.split('mailbox/')[1]?.split('/');
        if (folder && folder === 'draft' && relatedTo === ApiRelateTo.draft) {
          this._mailboxService.getMailsByFolder('draft', page).pipe(take(1)).subscribe();
        }else if(folder && ( folder === 'sent' || folder=== 'all' ) && relatedTo === ApiRelateTo.sent){
          this._mailboxService.getMailsByFolder(folder, page).pipe(take(1)).subscribe();
        }
      }
}
