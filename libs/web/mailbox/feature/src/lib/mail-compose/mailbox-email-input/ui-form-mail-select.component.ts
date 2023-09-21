import {
  Component,
  NgZone,
  ChangeDetectorRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { NgSelectComponent } from '@ng-select/ng-select'
import { DialogService } from '@ngneat/dialog'
import { Subject, take, takeUntil } from 'rxjs'
import { CopyFields } from '../mail-compose.component'
import { MailComposeService } from '../mail-compose.service'

@Component({
  selector: 'mailbox-email-input',
  templateUrl: `./ui-form-mail-select.component.html`,
  styles: [
    `
      ::ng-deep .ng-select .ng-select-container {
        margin-top: 0px !important;
      }

      ::ng-deep .ng-dropdown-panel .ng-dropdown-panel-items .ng-option {
        display: flex !important;
        align-items: center;
        gap: 8px;
      }

      ::ng-deep .custom input[type='checkbox'] {
        border-radius: 3px;
      }

      ::ng-deep ng-select.ng-invalid.ng-touched {
        .ng-arrow-wrapper {
          margin-right: 22px;
        }
        .ng-select-container {
          border-color: rgb(252 165 165 / var(--tw-border-opacity)) !important;
        }
      }

      .mat-form-field.mat-form-field-appearance-fill.mat-form-field-invalid
        .mat-form-field-wrapper
        .mat-form-field-flex,
      .mat-form-field.mat-form-field-appearance-fill.mat-focused.mat-form-field-invalid
        .mat-form-field-wrapper
        .mat-form-field-flex {
        border-color: red !important;
      }

      .mat-form-field-custom {
        margin-bottom: 16px;
        padding-bottom: 0;
      }

      ::ng-deep .mat-form-field-label {
        font-weight: bold;
      }

      .cdk-overlay-container {
        z-index: 2000;
      }

      textarea.mat-input-element {
        box-shadow: none !important;
      }

      .coutry-name {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ::ng-deep ngneat-dialog .ngneat-dialog-backdrop {
        z-index: 500;
      }
      ::ng-deep .ng-arrow-wrapper,
      ::ng-deep .ng-clear-wrapper.ng-star-inserted {
        display: none;
      }
      .copy-fields {
        position: absolute;
        right: 8px;
        bottom: 11px;
        z-index: 10000;
      }
      .copy-fields-toggles-inner {
        padding-right: 12px;
      }
      ::ng-deep .ng-value-container, ::ng-deep .padding5 {
        padding-right: 5px;
      }
      ::ng-deep .padding62 {
        padding-right: 62px;
      }
      ::ng-deep .padding31 {
        padding-right: 31px;
      }
    `,
  ],
})
export class UiFormMailSelectComponent {
  public items: any[] = []
  public addedItems: any[] = []
  public selectedItems: any[] = []
  public allEmails: any[] = []
  // public copyFields = { cc: false, bcc: false }
  public value: string = null
  loading = false
  searchTerm
  isAddBtnRequired = false
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  copyFields: CopyFields;

  @Input('templateOption') to: any
  @Input('formControl') formControl!: FormControl
  @Output('onCopyFieldChanged') onCopyFieldChanged: EventEmitter<any> = new EventEmitter();
  @ViewChild('dropDown') ngSelect!: NgSelectComponent
  constructor(
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private readonly dialog: DialogService,
    private mailComposeService: MailComposeService,
  ) {}

  public ngOnInit() {
    this.formControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((val) => {
      if (val && val.length > 0) {
        this.selectedItems = this.allEmails.filter((item) => val.includes(item.email))
        this.ngSelect.searchTerm = ''
      } else {
        this.items = []
      }
      this.isAddBtnRequired = false
      this.ref.markForCheck()
      this.ref.detectChanges()
    })

    this.setPaddingDynamic()

    this.ref.markForCheck()
    this.ref.detectChanges()
  }

  onClear(event) {
    this.items = []
    this.addedItems = []
    this.selectedItems = []
    this.allEmails = []
    this.isAddBtnRequired = false
  }

  onBlur(event) {
    this.isAddBtnRequired = false
    this.ref.markForCheck()
    this.ref.detectChanges()
  }

  showCopyField(name) {
    if (name !== 'cc' && name !== 'bcc') {
      return
    }
    this.copyFields[name] = true
    this.onCopyFieldChanged.emit(this.copyFields);
    this.setPaddingDynamic()
  }

  setPaddingDynamic() {
   if(this.to?.isMaster){
    this.copyFields = this.to.copyFields ?? { to: false, bcc: false };
    let clicked = 0
    if (this.to.copyFields['cc'] && this.to.copyFields['bcc']) clicked = 2
    else if (this.to.copyFields['cc'] || this.to.copyFields['bcc']) clicked = 1
    const elem = document.querySelector('.ng-value-container')
    elem.classList.remove("padding5", "padding31", "padding62");
    elem.classList.add(clicked == 2 ? 'padding5' : clicked == 1 ? 'padding31' : 'padding62')
    this.ref.markForCheck()
    this.ref.detectChanges()
   }
  }

  onSearch(e: any) {
    if (e && e?.term && e?.term.trim().length > 0) {
      this.mailComposeService
        .searchEmails(e.term)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.isAddBtnRequired = false
            this.searchTerm = e?.term
            this.items = res.data.items.map((item) => {
              item.name = item.email
              return item
            })
            if (this.items.length == 0 && this.validateEmail(e.term.trim())) {
              this.isAddBtnRequired = true
            }
            if (this.addedItems.length > 0) {
              this.items = [...this.items, ...this.addedItems]
            }
            this.allEmails = this.removeDuplicateObject([...this.allEmails, ...this.items])
            this.ref.markForCheck()
            this.ref.detectChanges()
          },
          error: (err) => {
            this.ngSelect.searchTerm = ''
            this.isAddBtnRequired = false
            this.items = []
            this.ref.markForCheck()
            this.ref.detectChanges()
          },
        })
    } else {
      this.items = []
      this.isAddBtnRequired = false
      this.ref.markForCheck()
      this.ref.detectChanges()
    }
  }

  onChange(event) {
    let flag = 0
    if (event && event.length > 0) {
      flag = 1
      this.addedItems = this.addedItems.filter((item) => event.includes(item))
    } else {
      this.addedItems = []
    }
    this.isAddBtnRequired = false
  }

  clicked(e: any) {
    if (e) {
      this.formControl.setValue(e)
      this.value = e
    }
  }

  displayFn(e: any): string {
    return e ? e.name : null
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  addEmail() {
    if (this.validateEmail(this.searchTerm)) {
      const newItem = { email: this.searchTerm, name: this.searchTerm }
      const controlVal = this.formControl.value
      this.addedItems = [...this.addedItems, newItem]
      this.items = this.removeDuplicateObject([...this.selectedItems, ...this.addedItems])
      this.formControl.setValue([...controlVal, newItem.email], { emitEvent: false })
      this.ngSelect.searchTerm = ''
      this.isAddBtnRequired = false
      this.ref.detectChanges()
      this.ref.markForCheck()
    } else {
      this.ngSelect.searchTerm = ''
      this.isAddBtnRequired = false
      alert('Can not be added invalid email')
    }
  }

  openModal() {
    if (!this.formControl.touched) {
      this.formControl.setErrors(null)
    }
  }

  validateEmail(email) {
    var validRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (email.trim().match(validRegex)) {
      return true
    } else {
      return false
    }
  }

  removeDuplicateObject(arr) {
    return arr.filter((obj, index, self) => {
      return index === self.findIndex((t) => t.email === obj.email)
    })
  }

  get classNames(): string {
    const classes =
      'custom block w-full text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
    const invalidClasses =
      'custom border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
    return this.formControl.hasError('required')
      ? `${classes} ${invalidClasses}`
      : classes
  }
}
