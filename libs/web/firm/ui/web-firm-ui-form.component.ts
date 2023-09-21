
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebFirmFormStore } from './web-firm-form.store'
import { Firm,FirmStatus } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-firm-form',
  providers: [WebFirmFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(firm))" [model]="firm ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiFirmComponent
    {
  @Input() firm: Firm = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentFirmStatusId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'firm-status',
          'firmStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          createFirmStatus: (event) => {
            if(event?.name) {
              this.store.addFirmStatus(event)
              this.model.firmStatusId = event.id
              this.form.controls['firmStatusId'].patchValue(event.id)
              this.form.controls['firmStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterFirmStatuses('').subscribe((values) => {
              this.model.firmStatusId = selected?.id
              this.form.controls['firmStatusId'].patchValue(selected?.id)
              this.form.controls['firmStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Firm Status',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterFirmStatuses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterFirmStatuses('').subscribe()
              this.route.params.pipe(pluck('firmStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentFirmStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.file(
      'eula',
      {
        label: 'Eula',
        delete: (d) => {
          this.model.eula = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.eula = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('firmStatusNote', { label: 'Firm Status Note' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('firmName', { label: 'Firm Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('address', { label: 'Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('address2', { label: 'Address 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('zip', { label: 'Zip' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('country', { label: 'Country' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('office', { label: 'Office' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('webAddress', { label: 'Web Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('email', { label: 'Email' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('rating', { label: 'Rating' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('doNotDisturb', { label: 'Do Not Disturb' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('invoiceOnly', { label: 'Invoice Only' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('reductionNotes', { label: 'Reduction Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('deceased', { label: 'Deceased' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('createdBy', { label: 'Created By' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
				])

]

  constructor(
    private readonly store: WebFirmFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,firmStatusNote,firmStatusId,firmName,address,address2,city,state,zip,country,office,fax,webAddress,email,rating,notes,doNotDisturb,invoiceOnly,reductionNotes,deceased,createdBy,dateCreated,eula }) {
    
    if(this.parentFirmStatusId != ''){
      firmStatusId = this.parentFirmStatusId
    }

    await this.store.createFirmEffect({ name,firmStatusNote,firmStatusId,firmName,address,address2,city,state,zip,country,office,fax,webAddress,email,rating,notes,doNotDisturb,invoiceOnly,reductionNotes,deceased,createdBy,dateCreated, eula })

    await this.store.item$.pipe(
      tap((item) => {
        if(item) {
          this.send.emit(item)
        }
      })
    ).subscribe()
  }

  handleDiscardClick(event) { 
     this.send.emit(event)
  }
}
