import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ApiRelateTo, MailAction } from 'libs/web/mailbox/feature/src/lib/mailbox.constants'
import { MailNewDraft } from 'libs/web/mailbox/feature/src/lib/mailbox.types'
import { BehaviorSubject, Subject, take } from 'rxjs'
import { WebUiFilePreviewComponent } from '../file-preview/web-ui-file-preview.component'
import { MailComposeService } from './mail-compose.service'

export type CopyFields = { cc: boolean; bcc: boolean }

@Component({
  selector: 'ui-mail-compose',
  templateUrl: './mail-compose.component.html',
  styles: [
    `
      .subject-field ::ng-deep .mat-form-field-flex {
        min-height: 40px !important;
      }
      .subject-field input {
        padding: 11px 0 !important;
      }
      .subject-field ::ng-deep .mat-form-field-label-wrapper {
        top: -21px !important;
      }
      .subject-field ::ng-deep .mat-form-field-label {
        font-weight: 400 !important;
      }
      @media (min-width: 768px) {
        .compose-wrapper {
          max-width: 40rem !important;
        }
      }

      ::ng-deep .legal-case-dropdown .ng-arrow-wrapper,
      ::ng-deep .legal-case-dropdown .ng-clear-wrapper.ng-star-inserted {
        display: block !important;
      }
    `,
  ],
})
export class WebUiMailComposeComponent implements OnInit {
  @ViewChild('filePreview') filePreviewComponent: WebUiFilePreviewComponent
  removedFileEvent$ = new Subject();
  intialValue: any
  composeForm: FormGroup
  copyFields: CopyFields = {
    cc: false,
    bcc: false,
  }
  modalData!: MailNewDraft
  isEditDraft = false
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['link'],
    ],
  }
  templateOption = {
    to: {
      multiple: true,
      label: 'To',
      required: true,
      isMaster: true,
      copyFields: this.copyFields,
    },
    cc: {
      label: 'Cc',
      multiple: true,
    },
    bcc: {
      label: 'Bcc',
      multiple: true,
    },
  }
  readonly formControl = new FormControl('')
  selectedFiles$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([])
  isClose$: Subject<{ close: boolean; cancel?: boolean; relatedTo?: string }> = new Subject<{
    close: boolean
    cancel?: boolean
    relatedTo?: string
  }>()

  draftFiles$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([])
  items = []
  legalCaseId: string = ""
  isDisplayLegalCaseField: boolean = true

  constructor(
    public matDialogRef: MatDialogRef<WebUiMailComposeComponent>,
    private _formBuilder: FormBuilder,
    public mailComposeService: MailComposeService,
    private ref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public dialogData,
  ) {}

  ngOnInit(): void {
    // Create the form
    this.composeForm = this._formBuilder.group({
      to: [[]],
      cc: [[]],
      bcc: [[]],
      subject: [''],
      body: [''],
      files: [[]],
      legalCaseId: [],
    })
    if (this.dialogData) {
      if (this.dialogData?.token) {
        this.mailComposeService.accessToken = this.dialogData.token
        delete this.dialogData?.token
      }
      if (this.dialogData?.mail) {
        this.modalData = this.dialogData.mail
      }

      this.legalCaseId = this.dialogData?.legalCaseId ? this.dialogData?.legalCaseId : ""
    }

    if(this.mailComposeService.getLegalCaseId){
      this.legalCaseId = this.mailComposeService.getLegalCaseId
    }

    if((this.dialogData?.mailAction === "Reply") || (this.dialogData?.mailAction === "Reply All") || (this.dialogData?.mailAction === "Forward") || (this.mailComposeService.getLegalCaseId)){
      this.composeForm.get("legalCaseId").disable()
      this.isDisplayLegalCaseField = this.legalCaseId ? true : false
    }

    this.composeForm.patchValue({"legalCaseId": this.legalCaseId ? this.legalCaseId : null})

    this.intialValue = JSON.stringify(this.composeForm.value)
    this.getLegalCases()
    this.setFormControlValue()
  }

  getLegalCases(){
    this.mailComposeService
      .getLegalCases()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.items = res.data.items
          this.ref.markForCheck()
          this.ref.detectChanges()
        },
        error: (err) => {
          this.items = []
          this.ref.markForCheck()
          this.ref.detectChanges()
        },
      })
  }

  get classNames(): string {
    const classes = 'custom block w-full text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md';
    return classes;
  }

  onCopyFieldChanged(copyFields: CopyFields) {
    this.copyFields = copyFields
  }

  setFormControlValue() {
    if (this.modalData) {
      this.isEditDraft = this.dialogData?.mailAction ? false : true
      this.composeForm.controls['subject'].setValue(this.modalData.subject)
      if (!this.dialogData?.mailAction) {
        this.composeForm.controls['body'].setValue(this.modalData.body ?? '')
      }
      this.composeForm.controls['to'].setValue(this.modalData.to.map((mail) => mail.email))
      this.composeForm.controls['cc'].setValue(this.modalData.cc.map((mail) => mail.email))
      if (this.modalData.cc.length > 0) {
        this.copyFields.cc = true
      }
      this.composeForm.controls['bcc'].setValue(this.modalData.bcc.map((mail) => mail.email))
      if (this.modalData.bcc.length > 0) {
        this.copyFields.bcc = true
      }

      if (this.modalData.files?.length) {
        let files = this.modalData.files.map((ele) => {
          return {
            ...ele,
            draftId: this.modalData.id,
          }
        })
        this.draftFiles$.next(files)
      }
      this.ref.markForCheck()
      this.ref.detectChanges()
    }
  }

  fChanged(files) {
    this.selectedFiles$.next(files)
    this.composeForm.controls['files'].patchValue(null)
    this.ref.markForCheck()
    this.ref.detectChanges()
  }

  async saveDraftAndClose() {
    if (!this.isEditDraft) {
      if (this.isFormHavingValue) {
        await this.saveAsDraft()
      }
    } else {
      await this.updateDraft(this.modalData.id)
    }
  }

  async sendMailOrDraft() {
    this.validateToField()
    if (this.composeForm.valid) {
      if (!this.isEditDraft) {
        await this.sendEmail()
      } else {
        await this.sendDraft(this.modalData.id)
      }
    }
  }

  async updateDraftAndClose(draftId: string) {
    await this.updateDraft(draftId)
  }

  validateToField() {
    const control = this.composeForm.controls['to']
    if (control && control.value) {
      if (!(control.value.length > 0)) {
        control.setValidators([Validators.required])
        control.updateValueAndValidity()
        return
      }
    }
    control.removeValidators([Validators.required])
    control.updateValueAndValidity()
  }

  get isFormHavingValue() {
    let currentValue = { ...this.composeForm.value }
    currentValue.body = currentValue.body ?? ''
    currentValue.files = this.selectedFiles$.getValue()
    if (this.intialValue !== JSON.stringify(currentValue)) {
      return true
    } else {
      return false
    }
  }

  /**
   * Discard the message
   */
  discard(): void {
    if (confirm('Are you sure you want to delete')) {
      this.deleteDraft()
    }
  }


  cancel(): void {
    if (confirm('Are you sure you want to discard all changes')) {
      this.isClose$.next({ close: true, cancel: true })
    }
  }

  draftFileDeleteEvent(e) {
    this.mailComposeService.deleteDraftFile(e.draftId, e.id).subscribe({
      next: (res) => {
        this.removedFileEvent$.next(e.id);
        this.isClose$.next({ close: false, relatedTo: ApiRelateTo.draft })
      },
      error: (err) => {
        this.isClose$.next({ close: false, relatedTo: ApiRelateTo.draft })
      }
    })
  }

  deleteDraft(isSuccessMsgRequired = true) {
    return new Promise<void>((resolve, reject) => {
      this.mailComposeService
        .deleteDraft(this.modalData.id, (isSuccessMsgRequired = true))
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
          error: (err) => {
            reject(err)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
        })
    })
  }

  updateDraft(draftId: string, isSuccessMsgRequired = true) {
    const formData = this.getFormData()
    return new Promise<void>((resolve, reject) => {
      this.mailComposeService
        .updateDraft(draftId, formData, isSuccessMsgRequired)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
          error: (err) => {
            reject(err)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
        })
    })
  }

  saveAsDraft() {
    const formData = this.getFormData()
    return new Promise<void>((resolve, reject) => {
      this.mailComposeService
        .saveAsDraft(formData)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
          error: (err) => {
            reject(err)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
        })
    })
  }

  async sendDraft(draftId: string) {
    await this.updateDraft(draftId, false)
    return new Promise<void>((resolve, reject) => {
      this.mailComposeService
        .sendDraft(draftId)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
          error: (res) => {
            reject(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.draft })
          },
        })
    })
  }

  sendEmail() {
    if (this.dialogData?.mailAction === MailAction.forward) {
      this.forwardEmail()
    } else {
      this.sendAndReplyEmail()
    }
  }

  sendAndReplyEmail() {
    const formData = this.getFormData()

    return new Promise<void>((resolve, reject) => {
      this.mailComposeService
        .sendEmail(formData)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.sent })
          },
          error: (res) => {
            reject(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.sent })
          },
        })
    })
  }

  forwardEmail() {
    const formData = this.getFormData()
    formData.append('messageId', this.modalData.id)
    return new Promise<void>((resolve, reject) => {
      this.mailComposeService
        .forwardEmail(formData)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            resolve(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.sent })
          },
          error: (res) => {
            reject(res)
            this.isClose$.next({ close: true, relatedTo: ApiRelateTo.sent })
          },
        })
    })
  }

  getFormData() {
    const data = this.composeForm.value
    const formData: FormData = new FormData()

    formData.append(
      'to',
      JSON.stringify(
        data.to.map((email) => {
          return { email, name: email }
        }),
      ),
    )

    formData.append(
      'cc',
      JSON.stringify(
        data.cc.map((email) => {
          return { email, name: email }
        }),
      ),
    )

    formData.append(
      'bcc',
      JSON.stringify(
        data.bcc.map((email) => {
          return { email, name: email }
        }),
      ),
    )

    formData.append('subject', data.subject)

    if (
      this.dialogData?.mailAction &&
      (this.dialogData?.mailAction === MailAction.reply || this.dialogData?.mailAction === MailAction.replyAll)
    ) {
      formData.append('replyToMessageId', this.modalData.id)
      const inputBody = `<div dir="ltr" gmail_original="1">${data.body ?? '<br>'}</div><br>`
      const replyBody = (inputBody ?? '') + this.modalData.body
      formData.append('body', replyBody ? replyBody : '')
    } else if (this.dialogData?.mailAction === MailAction.forward) {
      const inputBody = `${data.body ?? '<br>'}<br>`
      const forwardBody = (inputBody ?? '') + this.modalData.body
      formData.append('body', forwardBody ? forwardBody : '')
    } else {
      formData.append('body', data.body ? data.body : '')
    }

    let fileData = this.selectedFiles$.getValue()
    if (fileData?.length) {
      for (let file of fileData) {
        var file2 = this.dataURLtoFile(file.attachment, file.name)
        formData.append('files', file2, file.name)
      }
    }

    if (data.legalCaseId || this.legalCaseId) {
      let legalCaseId = data.legalCaseId ?? this.legalCaseId

      formData.append('legalCaseId', legalCaseId)
    }

    return formData
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }
}
