import { MailNew, Pagination } from './../mailbox.types'
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef, TemplateRef } from '@angular/core'
import { Subject, take, takeUntil } from 'rxjs'
import { MailboxService } from '../mailbox.service'
import { MailboxComponent } from '../mailbox.component'
import { Mail, MailCategory } from '../mailbox.types'
import { MailboxListStore } from './list.store'
import { ActivatedRoute, Event, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { ApiRelateTo } from '../mailbox.constants'
import { DialogService } from '@ngneat/dialog'
import { FormBuilder } from '@angular/forms'
import { WebUiMailComposeComponent } from '../mail-compose/mail-compose.component'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mailbox-list',
  templateUrl: './list.component.html',
  providers: [MailboxListStore],
  encapsulation: ViewEncapsulation.None,
  styleUrls : ['./list.component.scss'],
  styles : [
    `
    .custom-grid{
      grid-template-columns : 1.5rem auto;
    }

    .ngneat-dialog-content{
      overflow : visible !important;
    }
    `
  ]
})
export class MailboxListComponent implements OnInit, OnDestroy {
  @ViewChild('mailList') mailList: ElementRef

  category: MailCategory
  mails: MailNew[]
  mailsLoading = false
  pagination: Pagination
  selectedMail: Mail
  selectedMails : string[] = []
  items = []
  legalCaseId:string = null
  checkboxFormGroup = this.fb.group({});

  readonly vm$ = this.store.vm$
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  @ViewChild('assignLegalCaseTpl') assignLegalCaseTpl : TemplateRef<any>

  /**
   * Constructor
   */
  constructor(
    public mailboxComponent: MailboxComponent,
    public _mailboxService: MailboxService,
    private readonly store: MailboxListStore,
    private _router: Router,
    private _matDialog: MatDialog,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private dialog : DialogService,
    private _activatedRoute: ActivatedRoute,
    private fb : FormBuilder
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.vm$.subscribe((data) => {
      this.mails = data.item
      this.setCheckboxArray()
      this.pagination = data.pagination
      this.category = data.category
      this.mailsLoading = data.mailsLoading
      if (this.mailList && !data.mailsLoading) {
        this.mailList.nativeElement.scrollTo(0, 0)
      }
      this.ref.markForCheck()
      this.ref.detectChanges()
    })

        // Selected mail
        this._mailboxService.mail$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Mail) => {
                this.selectedMail = mail;

                this.ref.markForCheck()
                this.ref.detectChanges()
            });

        this._mailboxService.readMail.subscribe((mailId) => {
            if(mailId) {
                const index = this.mails?.findIndex(f=> f.id == mailId && f.unread);
                if(index >= 0) {
                    const obj = this.mails?.find(f=> f.id == mailId && f.unread);
                    obj.unread = false;
                    this.mails[index] = obj;
                }
            }

            this.ref.markForCheck()
            this.ref.detectChanges()
        })
        
        
        this.getLegalCases();

        setTimeout(() => {
          this.ref.markForCheck()
          this.ref.detectChanges()
        })
    }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
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
  /**
   * On mail selected
   *
   * @param mail
   */
  onMailSelected(mail: MailNew): void {
    if (mail?.object === 'draft') {
      const dialogRef = this._matDialog.open(WebUiMailComposeComponent, { data: { token: this._mailboxService.token, mail } })
      dialogRef.componentInstance.isClose$.subscribe((res) => {
        if (res){
          if(res.close) dialogRef.close();
          if(!res.cancel) this.getAndUpdateDraftListing(res.relatedTo);
        }
      })
      dialogRef.backdropClick().subscribe(async () => {
        await dialogRef.componentInstance.updateDraftAndClose(mail.id)
      })
      return
    } else {
      this._router.navigate([mail.id], { relativeTo: this.route })
    }
    // If the mail is unread...
    // if ( mail.unread )
    // {
    //     // Update the mail object
    //     mail.unread = false;

        //     // Update the mail on the server
        // //    this._mailboxService.updateMail(mail.id, {unread: false}).subscribe();
        // }
        // static mark as read
        // if ( mail.unread ) {
        //     mail.unread = false;
        // }

    // Execute the mailSelected observable
    this._mailboxService.selectedMailChanged.next(mail)
  }


  participantsString(participants, isShort = false) {
    // console.log(participants.filter(f=>f.email !== this._mailboxService.email).map(m=> m.name).toString())
    let returnString = '';
    const temp = participants.filter(f=>f.email !== this._mailboxService.email);
    
    if(isShort && temp.length>0){
      returnString = temp[0]?.name
      if(temp.length>1) returnString = returnString + ' and ' + (temp.length-1) + ' more'
    }else if(!isShort){
      temp.forEach((ele,index)=>{
        returnString = returnString + ele.name + (index<temp.length-1 ? ', ' : '')
      })
    }
    return returnString;
  }

  getAndUpdateDraftListing(relatedTo=''){
    const folder = this.route.snapshot.paramMap.get('folder')
    const page = this.route.snapshot.paramMap.get('page')
   if (folder && folder === 'draft' && relatedTo === ApiRelateTo.draft) {
      this._mailboxService.getMailsByFolder('draft', page).pipe(take(1)).subscribe();
    }else if(folder && ( folder === 'sent' || folder=== 'all' ) && relatedTo === ApiRelateTo.sent){
      this._mailboxService.getMailsByFolder(folder, page).pipe(take(1)).subscribe();
    }
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index
  }



  mailChecked(mail : any, e : any){
    e.stopImmediatePropagation && e.stopImmediatePropagation();
    if(Array.isArray(mail?.message_ids)){
      if(e.target.checked){
        this.selectedMails.push(...mail.message_ids)
      }else{
        this.selectedMails = this.selectedMails.filter(ele=>!mail.message_ids.includes(ele))
      }
    }
  }
  openLegalCaseAssignDialog(size : string = 'sm'){
    const dialogRef = this.dialog.open(this.assignLegalCaseTpl, { size: size, resizable: false, closeButton: false });
  }

  assignLegalCase(){
    const legalCaseId = this.legalCaseId ?? null;
    const msgIds = this.selectedMails ?? [];
    this._mailboxService.updateMessageByIds(legalCaseId, msgIds).subscribe(() => {
      this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent });
  });
  this.closeDialog();
  }
  closeDialog(){
    this.dialog.closeAll();
    this.checkboxFormGroup.reset();
    this.selectedMails = [];
    this.legalCaseId = null;
  }
  setCheckboxArray(){
    // this.checkboxFormGroup = this.fb.group({});
    this.mails.forEach((ele,index)=>{
      this.checkboxFormGroup.addControl(ele.id, this.fb.control(''))
    });
  }

}
