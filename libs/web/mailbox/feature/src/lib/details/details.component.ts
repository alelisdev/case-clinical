import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
import { Subject, take, takeUntil } from 'rxjs';
import { MailboxService } from '../mailbox.service';
import { MailFolder, MailLabelNew, MailNew } from '../mailbox.types';
import { labelColorDefs, MailAction } from '../mailbox.constants';
import { MailboxDetailsStore } from './details.store';
import { DomSanitizer } from '@angular/platform-browser';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebUiFilePreviewComponent } from '../file-preview/web-ui-file-preview.component';
import { MatDialog } from '@angular/material/dialog';
// import { WebUiMailComposeComponent } from 'libs/web/ui/mail-compose/mail-compose.component';
import { DatePipe } from '@angular/common';
import { WebUiMailComposeComponent } from '../mail-compose/mail-compose.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector     : 'mailbox-details',
    templateUrl  : './details.component.html',
    styles: [`
        .mat-expansion-panel-body {padding: 0px 0px 0px !important};
        .mat-expansion-panel-header { padding: 15px 15px !important}
        .mat-expansion-panel-header-title {
            display: block !important
        }
        .mat-expansion-panel-header.mat-expanded,  .mat-expansion-panel-header{
            height: unset;
        }
    `],
    providers: [MailboxDetailsStore],
    encapsulation: ViewEncapsulation.None
})
export class MailboxDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('infoDetailsPanel') private _infoDetailsPanel: TemplateRef<any>;
    @ViewChild('filePreviewModal') filePreviewComponent: WebUiFilePreviewComponent
    folders: MailFolder[];
    labelColors;
    labels: MailLabelNew[];
    mail: any;
    replyFormActive = false;
    totalToMail = 4;
    selectedMsg;
    expandedMsgIds = [];
    readonly vm$ = this.store.vm$
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    items = []
    legalCaseId:string = null

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _elementRef: ElementRef,
        public _mailboxService: MailboxService,
        private _overlay: Overlay,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef,
        private store: MailboxDetailsStore,
        private sanitized: DomSanitizer,
        private readonly toast: WebUiToastService,
        private _matDialog: MatDialog,
        private datePipe: DatePipe,
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
        this.vm$.subscribe((data)=> {
            if(data.mail) {
                if(data.mail.to && data.mail.to.length > 0) {
                    data.mail.to.forEach(element => {
                        if(element.email == this._mailboxService.email) {
                            element.name = 'me'
                        }
                    });
                }
                this._mailboxService.readMail.next(data.mail.id)

                this.legalCaseId = (data.mail?.metadata?.legalCaseId) ? data.mail.metadata.legalCaseId : null
            }
            this.mail = data.mail;
            if(this.mail && this.mail.messages.length > 0) {
                this.expandedMsgIds.push(this.mail.messages[this.mail.messages.length - 1].id);
            }

            this.legalCaseId = this.getLegalCaseIdFromMail();
        });
        // Get the label colors
        this.labelColors = labelColorDefs;

        // Folders
        this._mailboxService.folders$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folders: MailFolder[]) => {
                this.folders = folders;
            });

        // Labels
        this._mailboxService.labels$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((labels: MailLabelNew[]) => {
                this.labels = labels;
            });

        // Mail
        // this._mailboxService.mail$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((mail: Mail) => {
        //         console.log(mail);
                
        //         // this.mail = mail;
        //     });

        // Selected mail changed
        this._mailboxService.selectedMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // De-activate the reply form
                this.replyFormActive = false;
            });



        this.getLegalCases();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Move to folder
     *
     * @param folderSlug
     */
    moveToFolder(folderSlug: string): void
    {
        // Find the folder details
        const folder = this.folders.find(item => item.slug === folderSlug);

        // Return if the current folder of the mail
        // is already equals to the given folder
        if ( this.mail.folder === folder.id )
        {
            return;
        }

        // Update the mail object
        this.mail.folder = folder.id;

        // Update the mail on the server
        this._mailboxService.updateMail(this.mail.id, {folder: this.mail.folder}).subscribe();

        // Navigate to the parent
        this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
    }

    /**
     * Toggle label
     *
     * @param label
     */
    toggleLabel(event, label: MailLabelNew): void
    {
        if(event.checked) {
            this._mailboxService.assignLabel(label.id, this.mail.id).subscribe(() =>{
                this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
                const message = 'Conversation added to "' + label.display_name + '"';
                this.toast.success(message);
            });
        } else {
            this._mailboxService.unAssignLabel(label.id, this.mail.id).subscribe(() =>{
                const labelId = this._activatedRoute.snapshot.paramMap.get('label');
                const message = 'Conversation removed from "' + label.display_name + '"';
                this.toast.success(message);
                if(labelId && labelId === label.id) {
                    this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
                    return;
                }
                this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
            });
        }
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        // Update the mail object
        this.mail.important = !this.mail.important;

        // Update the mail on the server
        this._mailboxService.updateMail(this.mail.id, {important: this.mail.important}).subscribe();

        // If the important was removed...
        if ( !this.mail.important )
        {
            // If the current activated route has a filter parameter and it equals to the 'important'...
            if ( this._activatedRoute.snapshot.paramMap.get('filter') && this._activatedRoute.snapshot.paramMap.get('filter') === 'important' )
            {
                // Navigate to the parent
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    /**
     * Toggle star
     */
    toggleStar(isThread = true, id): void
    {
        const isFolder = this._activatedRoute.snapshot.paramMap.get('folder') ? true : false;
        const page = this._activatedRoute.snapshot.paramMap.get('page') ?? '1'
        this._mailboxService.toggleStar(isThread, id).subscribe(() => {
            if(this._activatedRoute.snapshot.paramMap.get('folder') && this._activatedRoute.snapshot.paramMap.get('folder') === 'starred') {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent })
            } else {
                this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
                isFolder ? this._mailboxService.getMailsByFolder(this._activatedRoute.snapshot.paramMap.get('folder'), page).subscribe() : this._mailboxService.getMailsByLabel(this._activatedRoute.snapshot.paramMap.get('label'), page).subscribe();
            }
        });
    }

    /**
     * Toggle unread
     *
     * @param unread
     */
    toggleUnread(isThread = true, id): void
    {
        this._mailboxService.toggleUnread(isThread, id).subscribe(()=> {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
        });
    }

    toggleSpam(isThread = true, id, markSpam: boolean): void
    {
        const page = this._activatedRoute.snapshot.paramMap.get('page') ?? '1'
        this._mailboxService.toggleSpam(isThread, id, markSpam).subscribe(() => {
            if(this._activatedRoute.snapshot.paramMap.get('folder') && this._activatedRoute.snapshot.paramMap.get('folder') === 'all') {
                this._mailboxService.getMailsByFolder('all', page).subscribe();
                this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
            } else {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
            }
            const message = markSpam ? 'Conversation marked as "Spam"' : 'Conversation moved to "Inbox"'
            this.toast.success(message);
        });
    }

    toggleTrash(isThread = true, id, moveToTrash: boolean): void
    {
        const page = this._activatedRoute.snapshot.paramMap.get('page') ?? '1'
        this._mailboxService.toggleTrash(isThread, id, moveToTrash).subscribe(() => {
            /* if(this._activatedRoute.snapshot.paramMap.get('folder') && this._activatedRoute.snapshot.paramMap.get('folder') === 'all') {
                this._mailboxService.getMailsByFolder('all', page).subscribe();
                this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
            } else {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
            } */
            this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
            const message = moveToTrash ? 'Conversation moved to "Trash"' : 'Action completed'
            this.toast.success(message);
        });
    }

    filePreview(attachment) {
        this._mailboxService.getFile(attachment.id).subscribe(res => {
            if(res) {
                const base64 = `data: ${ attachment.content_type } ;base64,` + res.file?.body;
                const obj = {
                    attachment: base64,
                    extension: attachment.content_type,
                    name: attachment.filename ?? 'File',
                    size: attachment.size
                }
                this.filePreviewComponent?.document.next(obj)
            }
        });
    }


    downloadFile(attachment){
        const fileName = attachment.filename ?? 'File';
        this._mailboxService.getFile(attachment.id).subscribe(res => {
            if(res) {
                const documentLink = document.createElement('a');
                document.body.appendChild(documentLink);
                documentLink.setAttribute('style', 'display: none');
                documentLink.href =  `data: ${ attachment.content_type } ;base64,` + res.file?.body;
                documentLink.download = fileName;
                documentLink.click();
            }
        })
    }
    /**
     * Reply
     */

    getLegalCaseIdFromMail(){
        return this.mail?.messages.filter(msg => msg?.metadata?.legalCaseId).map(ele => ele.metadata.legalCaseId)[0];
    }

    async reply(mail): Promise<any>
    {
        const currentEmail = this._mailboxService.email;
        const mailObj = Object.assign({}, mail);
        mailObj.cc = [];
        mailObj.bcc = []; 
        if(currentEmail !== mail.from[0].email) {
            mailObj.to = mail.from;
        }

        mailObj.body = await this.setBodyForReply(mail);
        mailObj.subject = await this.setSubjectForReply(mail);
        /* open model and fill the values */
        const dialogRef = this._matDialog.open(WebUiMailComposeComponent, { data: { token: this._mailboxService.token, mail: mailObj, mailAction: MailAction.reply, legalCaseId: this.legalCaseId } });
        dialogRef.componentInstance.isClose$.subscribe((res) => {if (res){
            dialogRef.close()
            if(!res.cancel) {
                this.reloadCurrentRoute();
            }
        }});
    }

    /**
     * Reply all
     */
    async replyAll(mail): Promise<any>
    {
        const mailObj = Object.assign({}, mail);
        const currentEmail = this._mailboxService.email;
        mailObj.bcc = []; 
        if(currentEmail !== mail.from[0].email) {
            mailObj.to = mail.from;
            mailObj.cc = mail.to.concat(mail.cc);
        }

        /* remove all to ids and current mail id from cc */
        let removeMailListFromCC = [];
        if(mailObj.to)  {
            removeMailListFromCC = (mailObj.to.map(m =>m.email));
        }
        removeMailListFromCC.push(currentEmail)
        mailObj.cc = mailObj.cc.filter(f=> !removeMailListFromCC.includes(f.email));
        mailObj.body = await this.setBodyForReply(mail);
        mailObj.subject = mailObj.subject = await this.setSubjectForReply(mail);

        /* open model and fill the values */
        const dialogRef = this._matDialog.open(WebUiMailComposeComponent, { data: { token: this._mailboxService.token, mail: mailObj, mailAction: MailAction.replyAll, legalCaseId: this.legalCaseId } })
        dialogRef.componentInstance.isClose$.subscribe((res) => {if (res){
            dialogRef.close();
            if(!res.cancel) {
                this.reloadCurrentRoute();
            };
        }});
    }

    /**
     * Forward
     */
    async forward(mail): Promise<any>
    {
        const mailObj = Object.assign({}, mail);
        mailObj.cc = [];
        mailObj.bcc = []; 
        mailObj.to = [];
        mailObj.subject = []; 
        mailObj.body = await this.setBodyForForward(mail);
        mailObj.subject = await this.setSubjectForForward(mail);

        /* open model and fill the values */
        const dialogRef = this._matDialog.open(WebUiMailComposeComponent, { data: { token: this._mailboxService.token, mail: mailObj, mailAction: MailAction.forward, legalCaseId: this.legalCaseId } });
        dialogRef.componentInstance.isClose$.subscribe((res) => {if (res){
            dialogRef.close();
            if(!res.cancel) {
                this.reloadCurrentRoute();
            }
        }});
    }

    setSubjectForReply(mail) {
        return new Promise((resolve) => {
            let subject = mail.subject.includes('Re:') ? mail.subject :  'Re: '+ mail.subject;
            if(subject.includes('Re: Fwd:')) {
                subject = subject.replace('Re: Fwd:', 'Re: ') 
            } 
            resolve(subject)
        })
    }

    setSubjectForForward(mail) {

        return new Promise((resolve) => {
            let subject = mail.subject.includes('Fwd:') ? mail.subject :  'Fwd: '+ mail.subject;
            if(subject.includes('Fwd: Re:')) {
                subject = subject.replace('Fwd: Re:', 'Fwd: ') 
            } 
            resolve(subject)
        })

    }

    setBodyForForward(mail) {
        return new Promise((resolve) => {
            // const blankSpace = '<br><br>'
            const forwardMsg = `<div class="gmail_quote"><div dir="ltr" class="gmail_attr">---------- Forwarded message ---------<br>`
            const from = `From: <strong class="gmail_sendername" dir="auto">${mail.from[0].name}</strong> <span dir="auto">&lt;${this.mailAnchorTag(mail.from[0].email)}&gt;</span><br>`;
            const date = `Date: ${ this.datePipe.transform(mail.date * 1000, 'EEE, d MMM y') + ' at '  + this.datePipe.transform(mail.date * 1000, 'HH:mm') }<br>`
            const subject = `Subject: ${ mail.subject }<br>`;
            const to = mail.to.length > 0 ? `To: ${this.stringReturn(mail.to)} <br>` : ``;
            const cc = mail.cc.length > 0 ? `Cc: ${this.stringReturn(mail.cc)} <br>` : ``;
            const other = `</div><br><br>${mail.body}</div>`;
            resolve(forwardMsg + from + date + subject + to + cc + other);
        });
    }


    mailAnchorTag(mail) {
        return `<a href="mailto:${mail}" target="_blank">${mail}</a>`;
    }

    setBodyForReply(mail) {
        return new Promise((resolve) => {
        // const blankSpace = '<div dir="ltr" gmail_original="1"><br></div><br>'
        const date = this.datePipe.transform(mail.date * 1000, 'EEE, d MMM y') + ' at '  + this.datePipe.transform(mail.date * 1000, 'HH:mm');
        const mailAnchor =  this.mailAnchorTag(mail.from[0].email);
        const text = `<div class="gmail_quote"><div dir="ltr" class="gmail_attr">On ${ date }, ${mail.from[0].name} &lt;${mailAnchor}&gt; wrote:<br></div>`
        const blockQuote = `<blockquote class="gmail_quote" style="margin: 0px 0px 0px 0.8ex; border-left: 1px solid rgb(204, 204, 204); padding-left: 1ex;">${mail.body}</blockquote></div>`
        resolve(text + blockQuote)
        });
    }

    stringReturn(array) {
        let text =''
        array.forEach((element, index) => {
            text +=`${element.name}&lt;${this.mailAnchorTag(element.email)}&gt;${index !== (array.length - 1) ? '&comma;' : ''} `
        });

        return text;
    }

    reloadCurrentRoute() {
        const isFolder = this._activatedRoute.snapshot.paramMap.get('folder') ? true : false;
        const page = this._activatedRoute.snapshot.paramMap.get('page') ?? '1'
        this._mailboxService.getMailByThreadId(this.mail.id).subscribe();
        isFolder ? this._mailboxService.getMailsByFolder(this._activatedRoute.snapshot.paramMap.get('folder'), page).subscribe() : this._mailboxService.getMailsByLabel(this._activatedRoute.snapshot.paramMap.get('label'), page).subscribe();
    }

    /**
     * Discard
     */
    discard(): void
    {
        // Deactivate the reply form
        this.replyFormActive = false;
    }

    /**
     * Send
     */
    send(): void
    {
        // Deactivate the reply form
        this.replyFormActive = false;
    }

    /**
     * Open info details panel
     */
    openInfoDetailsPanel(selectedMsg): void
    {
        this.selectedMsg = selectedMsg;
        // Create the overlay
        this._overlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._elementRef.nativeElement.querySelector('#infoPanel'+ selectedMsg.id))
                                  .withFlexibleDimensions(true)
                                  .withViewportMargin(16)
                                  .withLockedPosition(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._infoDetailsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._overlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._overlayRef.backdropClick().subscribe(() => {

            // If overlay exists and attached...
            if ( this._overlayRef && this._overlayRef.hasAttached() )
            {
                // Detach it
                this._overlayRef.detach();
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    safeHTML(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }

    checked(label: MailLabelNew) {
        return this.mail.labels.find(f => f.id == label.id);
    }

    matHeaderClick(panelH, i, msgId) {
        if(i === (this.mail.messages.length - 1)) {
            panelH._toggle()
        } else {
            panelH.panel._expanded ? this.expandedMsgIds.push(msgId) : this.expandedMsgIds.splice(this.expandedMsgIds.indexOf(msgId), 1);
            return
        }
    }
    
    getLegalCases(){
        this._mailboxService
            .getLegalCases()
            .pipe(take(1))
            .subscribe({
            next: (res) => {
                this.items = res.data.items
            },
            error: (err) => {
                this.items = []
            },
            })
    }

    onLegalCaseChange(event){
        let legalCaseId = event?.id ? event.id : null
        let msgIds = this.mail?.message_ids?.length ? this.mail?.message_ids : []
        this._mailboxService.updateMessageByIds(legalCaseId, msgIds).subscribe(() => {
            this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
        });
    }

    get classNames(): string {
        const classes = 'custom block w-full text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md';
        return classes;
    }
}
