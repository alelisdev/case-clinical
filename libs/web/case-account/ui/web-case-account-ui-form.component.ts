
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebCaseAccountFormStore } from './web-case-account-form.store'
import { CaseAccount,LegalCase,Location,Vendor,AccountStatus,ProcedureType,AgreementType,User,Contract,Portfolio,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-case-account-form',
  providers: [WebCaseAccountFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(caseAccount))" [model]="caseAccount ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiCaseAccountComponent
    {
  @Input() caseAccount: CaseAccount = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentLegalCaseId: ''
parentLocationId: ''
parentVendorId: ''
parentAccountStatusId: ''
parentProcedureTypeId: ''
parentAgreementTypeId: ''
parentAccountAgentId: ''
parentContractId: ''
parentPortfolioId: ''
parentProcedureVendorId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          createLegalCase: (event) => {
            if(event?.name) {
              this.store.addLegalCase(event)
              this.model.legalCaseId = event.id
              this.form.controls['legalCaseId'].patchValue(event.id)
              this.form.controls['legalCaseId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLegalCases('').subscribe((values) => {
              this.model.legalCaseId = selected?.id
              this.form.controls['legalCaseId'].patchValue(selected?.id)
              this.form.controls['legalCaseId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Legal Case',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLegalCases,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLegalCases('').subscribe()
              this.route.params.pipe(pluck('legalCaseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLegalCaseId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'location',
          'locationId',
        {
          defaultValues: {}, ////Set Parent Values
          createLocation: (event) => {
            if(event?.name) {
              this.store.addLocation(event)
              this.model.locationId = event.id
              this.form.controls['locationId'].patchValue(event.id)
              this.form.controls['locationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLocations('').subscribe((values) => {
              this.model.locationId = selected?.id
              this.form.controls['locationId'].patchValue(selected?.id)
              this.form.controls['locationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Location',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLocations,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLocations('').subscribe()
              this.route.params.pipe(pluck('locationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLocationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'vendor',
          'vendorId',
        {
          defaultValues: {}, ////Set Parent Values
          createVendor: (event) => {
            if(event?.name) {
              this.store.addVendor(event)
              this.model.vendorId = event.id
              this.form.controls['vendorId'].patchValue(event.id)
              this.form.controls['vendorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterVendors('').subscribe((values) => {
              this.model.vendorId = selected?.id
              this.form.controls['vendorId'].patchValue(selected?.id)
              this.form.controls['vendorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Vendor',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterVendors,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterVendors('').subscribe()
              this.route.params.pipe(pluck('vendorId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentVendorId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'account-status',
          'accountStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          createAccountStatus: (event) => {
            if(event?.name) {
              this.store.addAccountStatus(event)
              this.model.accountStatusId = event.id
              this.form.controls['accountStatusId'].patchValue(event.id)
              this.form.controls['accountStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAccountStatuses('').subscribe((values) => {
              this.model.accountStatusId = selected?.id
              this.form.controls['accountStatusId'].patchValue(selected?.id)
              this.form.controls['accountStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Account Status',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAccountStatuses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAccountStatuses('').subscribe()
              this.route.params.pipe(pluck('accountStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAccountStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'procedure-type',
          'procedureTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createProcedureType: (event) => {
            if(event?.name) {
              this.store.addProcedureType(event)
              this.model.procedureTypeId = event.id
              this.form.controls['procedureTypeId'].patchValue(event.id)
              this.form.controls['procedureTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterProcedureTypes('').subscribe((values) => {
              this.model.procedureTypeId = selected?.id
              this.form.controls['procedureTypeId'].patchValue(selected?.id)
              this.form.controls['procedureTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Procedure Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterProcedureTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterProcedureTypes('').subscribe()
              this.route.params.pipe(pluck('procedureTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'agreement-type',
          'agreementTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createAgreementType: (event) => {
            if(event?.name) {
              this.store.addAgreementType(event)
              this.model.agreementTypeId = event.id
              this.form.controls['agreementTypeId'].patchValue(event.id)
              this.form.controls['agreementTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAgreementTypes('').subscribe((values) => {
              this.model.agreementTypeId = selected?.id
              this.form.controls['agreementTypeId'].patchValue(selected?.id)
              this.form.controls['agreementTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Agreement Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAgreementTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAgreementTypes('').subscribe()
              this.route.params.pipe(pluck('agreementTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAgreementTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'user',
          'accountAgentId',
        {
          defaultValues: {}, ////Set Parent Values
          createUser: (event) => {
            if(event?.name) {
              this.store.addUser(event)
              this.model.accountAgentId = event.id
              this.form.controls['accountAgentId'].patchValue(event.id)
              this.form.controls['accountAgentId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterUsers('').subscribe((values) => {
              this.model.accountAgentId = selected?.id
              this.form.controls['accountAgentId'].patchValue(selected?.id)
              this.form.controls['accountAgentId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Account Agent',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterUsers,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterUsers('').subscribe()
              this.route.params.pipe(pluck('accountAgentId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAccountAgentId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'contract',
          'contractId',
        {
          defaultValues: {}, ////Set Parent Values
          createContract: (event) => {
            if(event?.name) {
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
          debounceTime: 5
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
        }
      }
    )
,

  WebUiFormField.selectForm(
          'portfolio',
          'portfolioId',
        {
          defaultValues: {}, ////Set Parent Values
          createPortfolio: (event) => {
            if(event?.name) {
              this.store.addPortfolio(event)
              this.model.portfolioId = event.id
              this.form.controls['portfolioId'].patchValue(event.id)
              this.form.controls['portfolioId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPortfolios('').subscribe((values) => {
              this.model.portfolioId = selected?.id
              this.form.controls['portfolioId'].patchValue(selected?.id)
              this.form.controls['portfolioId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Portfolio',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPortfolios,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPortfolios('').subscribe()
              this.route.params.pipe(pluck('portfolioId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPortfolioId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'procedure-vendor',
          'procedureVendorId',
        {
          defaultValues: {}, ////Set Parent Values
          createProcedureVendor: (event) => {
            if(event?.name) {
              this.store.addProcedureVendor(event)
              this.model.procedureVendorId = event.id
              this.form.controls['procedureVendorId'].patchValue(event.id)
              this.form.controls['procedureVendorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterProcedureVendors('').subscribe((values) => {
              this.model.procedureVendorId = selected?.id
              this.form.controls['procedureVendorId'].patchValue(selected?.id)
              this.form.controls['procedureVendorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Procedure Vendor',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterProcedureVendors,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterProcedureVendors('').subscribe()
              this.route.params.pipe(pluck('procedureVendorId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureVendorId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('thirdPartyFunderName', { label: 'Third Party Funder Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('originalDueDate', { label: 'Original Due Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('accountTerm', { label: 'Account Term' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('serviceDate', { label: 'Service Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('quantity', { label: 'Quantity' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('originalDebt', { label: 'Original Debt' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('cost', { label: 'Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('balance', { label: 'Balance' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('lastBalance', { label: 'Last Balance' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('reduction', { label: 'Reduction' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('treatmentState', { label: 'Treatment State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('accountNumber', { label: 'Account Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('servicesPerformed', { label: 'Services Performed' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('cptCodes', { label: 'Cpt Codes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('outsideBrokerFlatFee', { label: 'Outside Broker Flat Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('outsideBrokerRate', { label: 'Outside Broker Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('outsideBrokerMultiply', { label: 'Outside Broker Multiply' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('insideBrokerRate', { label: 'Inside Broker Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('insideBrokerMultiply', { label: 'Inside Broker Multiply' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('providerTxnID', { label: 'Provider Txn ID' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('minPerformanceRate', { label: 'Min Performance Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('minPerformanceFlatFee', { label: 'Min Performance Flat Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('thresholdRate', { label: 'Threshold Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('thresholdFlatFee', { label: 'Threshold Flat Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('expectedPmtRate', { label: 'Expected Pmt Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('expectedPmtFlatFee', { label: 'Expected Pmt Flat Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('wcFeeSchedule', { label: 'Wc Fee Schedule' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('interestRate', { label: 'Interest Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('treatingPhysician', { label: 'Treating Physician' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('referringPhysician', { label: 'Referring Physician' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('servicingFeePercent', { label: 'Servicing Fee Percent' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('paidToPlaintiff', { label: 'Paid To Plaintiff' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('ifgDefaultServiceFee', { label: 'Ifg Default Service Fee' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('assigneePaysToAssignor', { label: 'Assignee Pays To Assignor' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('projectedPayoffDate', { label: 'Projected Payoff Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('collectionsDate', { label: 'Collections Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('deemedWriteOffDate', { label: 'Deemed Write Off Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('expensedBadDebtDate', { label: 'Expensed Bad Debt Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('unExpensedBadDebtDate', { label: 'Un Expensed Bad Debt Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('bageledDate', { label: 'Bageled Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('mDSContractDate', { label: 'M DS Contract Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('reOpenedDate', { label: 'Re Opened Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('ifgAdvanceDate', { label: 'Ifg Advance Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('paidDate', { label: 'Paid Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('qbTxnId', { label: 'Qb Txn Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('qbEditSequence', { label: 'Qb Edit Sequence' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('qbJournalDate', { label: 'Qb Journal Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('refundQBTxnId', { label: 'Refund QB Txn Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('refundQBEditSequence', { label: 'Refund QB Edit Sequence' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('refundQBJournalDate', { label: 'Refund QB Journal Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('ghostAccount', { label: 'Ghost Account' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('ghostedDate', { label: 'Ghosted Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('ghostedBy', { label: 'Ghosted By' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('unGhostedDate', { label: 'Un Ghosted Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('unGhostedBy', { label: 'Un Ghosted By' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('excludeFromBorrowingBase', { label: 'Exclude From Borrowing Base' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('additionalPayment', { label: 'Additional Payment' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('missingBill', { label: 'Missing Bill' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('missingLien', { label: 'Missing Lien' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('missingMedicalRecords', { label: 'Missing Medical Records' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('assignedTo', { label: 'Assigned To' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('resubmitted', { label: 'Resubmitted' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('overageId', { label: 'Overage Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('temp', { label: 'Temp' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created By' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('securitizationGroup', { label: 'Securitization Group' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('outsideAgentId', { label: 'Outside Agent Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.number('defaultTeamLead', { label: 'Default Team Lead' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('defaultTeamLeaderRate', { label: 'Default Team Leader Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('treatmentCity', { label: 'Treatment City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('origination', { label: 'Origination' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('thresholdProviderRate', { label: 'Threshold Provider Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('thresholdLocationRate', { label: 'Threshold Location Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('teamLeaderRateSource', { label: 'Team Leader Rate Source' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('checkNumber', { label: 'Check Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('accountDateReceived', { label: 'Account Date Received' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateApplied', { label: 'Date Applied' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('amountApplied', { label: 'Amount Applied' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('taxable', { label: 'Taxable' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('reimbursable', { label: 'Reimbursable' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.currency('taxRate', { label: 'Tax Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('time', { label: 'Time' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('rate', { label: 'Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('expenseAmount', { label: 'Expense Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('count', { label: 'Count' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('description', { label: 'Description' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('note', { label: 'Note' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('medicareRate', { label: 'Medicare Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('providerPercentOfMedicare', { label: 'Provider Percent Of Medicare' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('contractedAmount', { label: 'Contracted Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('markupPercent', { label: 'Markup Percent' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('reimbursedTotal', { label: 'Reimbursed Total' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('initialRevenue', { label: 'Initial Revenue' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('factor', { label: 'Factor' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('retailBill', { label: 'Retail Bill' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('estMargin', { label: 'Est Margin' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('roi', { label: 'Roi' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('attorneyPaid', { label: 'Attorney Paid' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('percentOfRetail', { label: 'Percent Of Retail' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('reimbursedFromPCR', { label: 'Reimbursed From PCR' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('ingredientCost', { label: 'Ingredient Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('dispensingCost', { label: 'Dispensing Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('administrativeCost', { label: 'Administrative Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('coPay', { label: 'Co Pay' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('totalCost', { label: 'Total Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('averageWholesalePrice', { label: 'Average Wholesale Price' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('weightedAverageCost', { label: 'Weighted Average Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('averageSalePrice', { label: 'Average Sale Price' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('invoiceCost', { label: 'Invoice Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('usualAndCustomary', { label: 'Usual And Customary' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('nationalDrugCode', { label: 'National Drug Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
				])

]

  constructor(
    private readonly store: WebCaseAccountFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,legalCaseId,locationId,vendorId,accountStatusId,procedureTypeId,agreementTypeId,accountAgentId,contractId,portfolioId,thirdPartyFunderName,originalDueDate,accountTerm,serviceDate,quantity,originalDebt,cost,balance,lastBalance,reduction,treatmentState,accountNumber,servicesPerformed,cptCodes,outsideBrokerFlatFee,outsideBrokerRate,outsideBrokerMultiply,insideBrokerRate,insideBrokerMultiply,providerTxnID,minPerformanceRate,minPerformanceFlatFee,thresholdRate,thresholdFlatFee,expectedPmtRate,expectedPmtFlatFee,wcFeeSchedule,interestRate,treatingPhysician,referringPhysician,servicingFeePercent,paidToPlaintiff,ifgDefaultServiceFee,assigneePaysToAssignor,projectedPayoffDate,collectionsDate,deemedWriteOffDate,expensedBadDebtDate,unExpensedBadDebtDate,bageledDate,mDSContractDate,reOpenedDate,ifgAdvanceDate,paidDate,qbTxnId,qbEditSequence,qbJournalDate,refundQBTxnId,refundQBEditSequence,refundQBJournalDate,ghostAccount,ghostedDate,ghostedBy,unGhostedDate,unGhostedBy,excludeFromBorrowingBase,additionalPayment,missingBill,missingLien,missingMedicalRecords,assignedTo,resubmitted,overageId,temp,createdBy,dateCreated,removed,securitizationGroup,outsideAgentId,defaultTeamLead,defaultTeamLeaderRate,treatmentCity,origination,thresholdProviderRate,thresholdLocationRate,teamLeaderRateSource,checkNumber,accountDateReceived,dateApplied,amountApplied,taxable,reimbursable,taxRate,time,rate,expenseAmount,count,description,note,medicareRate,providerPercentOfMedicare,contractedAmount,markupPercent,reimbursedTotal,initialRevenue,factor,retailBill,estMargin,roi,attorneyPaid,percentOfRetail,reimbursedFromPCR,ingredientCost,dispensingCost,administrativeCost,coPay,totalCost,averageWholesalePrice,weightedAverageCost,averageSalePrice,invoiceCost,usualAndCustomary,nationalDrugCode,procedureVendorId }) {
    
    if(this.parentLegalCaseId != ''){
      legalCaseId = this.parentLegalCaseId
    }


    if(this.parentLocationId != ''){
      locationId = this.parentLocationId
    }


    if(this.parentVendorId != ''){
      vendorId = this.parentVendorId
    }


    if(this.parentAccountStatusId != ''){
      accountStatusId = this.parentAccountStatusId
    }


    if(this.parentProcedureTypeId != ''){
      procedureTypeId = this.parentProcedureTypeId
    }


    if(this.parentAgreementTypeId != ''){
      agreementTypeId = this.parentAgreementTypeId
    }


    if(this.parentAccountAgentId != ''){
      accountAgentId = this.parentAccountAgentId
    }


    if(this.parentContractId != ''){
      contractId = this.parentContractId
    }


    if(this.parentPortfolioId != ''){
      portfolioId = this.parentPortfolioId
    }


    if(this.parentProcedureVendorId != ''){
      procedureVendorId = this.parentProcedureVendorId
    }

    await this.store.createCaseAccountEffect({ name,legalCaseId,locationId,vendorId,accountStatusId,procedureTypeId,agreementTypeId,accountAgentId,contractId,portfolioId,thirdPartyFunderName,originalDueDate,accountTerm,serviceDate,quantity,originalDebt,cost,balance,lastBalance,reduction,treatmentState,accountNumber,servicesPerformed,cptCodes,outsideBrokerFlatFee,outsideBrokerRate,outsideBrokerMultiply,insideBrokerRate,insideBrokerMultiply,providerTxnID,minPerformanceRate,minPerformanceFlatFee,thresholdRate,thresholdFlatFee,expectedPmtRate,expectedPmtFlatFee,wcFeeSchedule,interestRate,treatingPhysician,referringPhysician,servicingFeePercent,paidToPlaintiff,ifgDefaultServiceFee,assigneePaysToAssignor,projectedPayoffDate,collectionsDate,deemedWriteOffDate,expensedBadDebtDate,unExpensedBadDebtDate,bageledDate,mDSContractDate,reOpenedDate,ifgAdvanceDate,paidDate,qbTxnId,qbEditSequence,qbJournalDate,refundQBTxnId,refundQBEditSequence,refundQBJournalDate,ghostAccount,ghostedDate,ghostedBy,unGhostedDate,unGhostedBy,excludeFromBorrowingBase,additionalPayment,missingBill,missingLien,missingMedicalRecords,assignedTo,resubmitted,overageId,temp,createdBy,dateCreated,removed,securitizationGroup,outsideAgentId,defaultTeamLead,defaultTeamLeaderRate,treatmentCity,origination,thresholdProviderRate,thresholdLocationRate,teamLeaderRateSource,checkNumber,accountDateReceived,dateApplied,amountApplied,taxable,reimbursable,taxRate,time,rate,expenseAmount,count,description,note,medicareRate,providerPercentOfMedicare,contractedAmount,markupPercent,reimbursedTotal,initialRevenue,factor,retailBill,estMargin,roi,attorneyPaid,percentOfRetail,reimbursedFromPCR,ingredientCost,dispensingCost,administrativeCost,coPay,totalCost,averageWholesalePrice,weightedAverageCost,averageSalePrice,invoiceCost,usualAndCustomary,nationalDrugCode,procedureVendorId })

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
