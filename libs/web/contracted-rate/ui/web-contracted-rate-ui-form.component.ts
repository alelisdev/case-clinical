import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebContractedRateFormStore } from './web-contracted-rate-form.store'
import { ContractedRate, Contract, ContractedRateKind, ContractKind } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-contracted-rate-form',
  providers: [WebContractedRateFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form
          (submitForm)="submit($any(contractedRate))"
          [model]="contractedRate ?? {}"
          [fields]="fields"
          [form]="form"
        >
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
export class WebFormsUiContractedRateComponent {
  @Input() contractedRate: ContractedRate = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({})

  model: any = {}

  parentContractId: ''
  parentContractedRateKindId: ''
  parentContractKindId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.selectForm(
        'contract',
        'contractId',
        {
          defaultValues: {}, ////Set Parent Values
          createContract: (event) => {
            if (event?.name) {
              this.store.addContract(event)
              this.model.contractId = event.id
              this.form.controls['contractId'].patchValue(event.id)
              this.form.controls['contractId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterContracts('').subscribe((values) => {
              this.model.contractId = selected?.id
              this.form.controls['contractId'].patchValue(selected?.id)
              this.form.controls['contractId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Contract',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterContracts,
          debounceTime: 5,
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterContracts('').subscribe()
              this.route.params.pipe(pluck('contractId')).subscribe((s) => {
                if (s != undefined || s != null) {
                  this.parentContractId = s
                  field.hide = true
                }
              })
            },
          },
        },
      ),
      WebUiFormField.selectForm(
        'contracted-rate-kind',
        'contractedRateKindId',
        {
          defaultValues: {}, ////Set Parent Values
          createContractedRateKind: (event) => {
            if (event?.name) {
              this.store.addContractedRateKind(event)
              this.model.contractedRateKindId = event.id
              this.form.controls['contractedRateKindId'].patchValue(event.id)
              this.form.controls['contractedRateKindId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterContractedRateKinds('').subscribe((values) => {
              this.model.contractedRateKindId = selected?.id
              this.form.controls['contractedRateKindId'].patchValue(selected?.id)
              this.form.controls['contractedRateKindId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Contracted Rate Kind',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterContractedRateKinds,
          debounceTime: 5,
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterContractedRateKinds('').subscribe()
              this.route.params.pipe(pluck('contractedRateKindId')).subscribe((s) => {
                if (s != undefined || s != null) {
                  this.parentContractedRateKindId = s
                  field.hide = true
                }
              })
            },
          },
        },
      ),
      WebUiFormField.selectForm(
        'contract-kind',
        'contractKindId',
        {
          defaultValues: {}, ////Set Parent Values
          createContractKind: (event) => {
            if (event?.name) {
              this.store.addContractKind(event)
              this.model.contractKindId = event.id
              this.form.controls['contractKindId'].patchValue(event.id)
              this.form.controls['contractKindId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterContractKinds('').subscribe((values) => {
              this.model.contractKindId = selected?.id
              this.form.controls['contractKindId'].patchValue(selected?.id)
              this.form.controls['contractKindId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Contract Kind',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterContractKinds,
          debounceTime: 5,
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterContractKinds('').subscribe()
              this.route.params.pipe(pluck('contractKindId')).subscribe((s) => {
                if (s != undefined || s != null) {
                  this.parentContractKindId = s
                  field.hide = true
                }
              })
            },
          },
        },
      ),
      WebUiFormField.input('id', { label: 'Id' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true }),
      WebUiFormField.input(
        'name',
        { label: 'Name' },
        {
          className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1',
        },
      ),
      WebUiFormField.currency('amount', { label: 'Amount' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.currency(
        'percentage',
        { label: 'Percentage' },
        { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
      ),
      WebUiFormField.number(
        'reimbursedRate',
        { label: 'Reimbursed Rate' },
        { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
      ),
      WebUiFormField.checkbox(
        'billOnBehalf',
        { label: 'Bill On Behalf' },
        { className: 'w-full sm:w-1/2 md:w-1/4 px-1' },
      ),
    ]),
  ]

  constructor(
    private readonly store: WebContractedRateFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
  ) {}

  async submit({
    name,
    amount,
    percentage,
    reimbursedRate,
    billOnBehalf,
    contractId,
    contractedRateKindId,
    contractKindId,
  }) {
    if (this.parentContractId != '') {
      contractId = this.parentContractId
    }

    if (this.parentContractedRateKindId != '') {
      contractedRateKindId = this.parentContractedRateKindId
    }

    if (this.parentContractKindId != '') {
      contractKindId = this.parentContractKindId
    }

    await this.store.createContractedRateEffect({
      name,
      amount,
      percentage,
      reimbursedRate,
      billOnBehalf,
      contractId,
      contractedRateKindId,
      contractKindId,
      visitKindId: null, // We have added this key, need to pass the visitKindId.
    })

    await this.store.item$
      .pipe(
        tap((item) => {
          if (item) {
            this.send.emit(item)
          }
        }),
      )
      .subscribe()
  }

  handleDiscardClick(event) {
    this.send.emit(event)
  }
}
