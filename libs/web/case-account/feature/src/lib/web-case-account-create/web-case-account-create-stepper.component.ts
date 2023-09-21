
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { LegalCase,Location,Vendor,AccountStatus,ProcedureType,AgreementType,ClaimProcedure,InvoiceDetail,Contract,Portfolio,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { WebCaseAccountCreateStore } from './web-case-account-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-case-account-create.component.html',
  providers: [WebCaseAccountCreateStore],
})
export class WebCaseAccountCreateComponent {
    readonly vm$ = this.store.vm$
    readonly legalCases$ = this.store.legalCases$
readonly locations$ = this.store.locations$
readonly vendors$ = this.store.vendors$
readonly accountStatuses$ = this.store.accountStatuses$
readonly procedureTypes$ = this.store.procedureTypes$
readonly agreementTypes$ = this.store.agreementTypes$
readonly claimProcedures$ = this.store.claimProcedures$
readonly invoiceDetails$ = this.store.invoiceDetails$
readonly contracts$ = this.store.contracts$
readonly portfolios$ = this.store.portfolios$
readonly procedureVendors$ = this.store.procedureVendors$

  model:any = {}

parentLegalCaseId: ''
parentLocationId: ''
parentVendorId: ''
parentAccountStatusId: ''
parentProcedureTypeId: ''
parentAgreementTypeId: ''
parentClaimProcedureId: ''
parentInvoiceDetailId: ''
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
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.input('accountAgentId', { label: 'Account Agent Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('thirdPartyFunderName', { label: 'Third Party Funder Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('originalDueDate', { label: 'Original Due Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('accountTerm', { label: 'Account Term' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('serviceDate', { label: 'Service Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('quantity', { label: 'Quantity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('originalDebt', { label: 'Original Debt' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('cost', { label: 'Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('balance', { label: 'Balance' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('lastBalance', { label: 'Last Balance' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('reduction', { label: 'Reduction' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('treatmentState', { label: 'Treatment State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('accountNumber', { label: 'Account Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('servicesPerformed', { label: 'Services Performed' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('cptCodes', { label: 'Cpt Codes' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('treatingPhysician', { label: 'Treating Physician' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('referringPhysician', { label: 'Referring Physician' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('collectionsDate', { label: 'Collections Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('deemedWriteOffDate', { label: 'Deemed Write off Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('expensedBadDebtDate', { label: 'Expensed Bad Debt Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('paidDate', { label: 'Paid Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('ghostAccount', { label: 'Ghost Account' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('ghostedDate', { label: 'Ghosted Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('ghostedBy', { label: 'Ghosted by' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('unGhostedDate', { label: 'Un Ghosted Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('unGhostedBy', { label: 'Un Ghosted by' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('additionalPayment', { label: 'Additional Payment' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('missingBill', { label: 'Missing Bill' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('missingLien', { label: 'Missing Lien' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('missingMedicalRecords', { label: 'Missing Medical Records' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('assignedTo', { label: 'Assigned to' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('resubmitted', { label: 'Resubmitted' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('treatmentCity', { label: 'Treatment City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('origination', { label: 'Origination' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('thresholdProviderRate', { label: 'Threshold Provider Rate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('thresholdLocationRate', { label: 'Threshold Location Rate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('teamLeaderRateSource', { label: 'Team Leader Rate Source' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('checkNumber', { label: 'Check Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('accountDateReceived', { label: 'Account Date Received' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateApplied', { label: 'Date Applied' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('amountApplied', { label: 'Amount Applied' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('description', { label: 'Description' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('note', { label: 'Note' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.currency('medicareRate', { label: 'Medicare Rate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('providerPercentOfMedicare', { label: 'Provider Percent of Medicare' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('contractedAmount', { label: 'Contracted Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('markupPercent', { label: 'Markup Percent' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('reimbursedTotal', { label: 'Reimbursed Total' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('initialRevenue', { label: 'Initial Revenue' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('factor', { label: 'Factor' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('retailBill', { label: 'Retail Bill' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('estMargin', { label: 'Est Margin' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('roi', { label: 'Roi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('attorneyPaid', { label: 'Attorney Paid' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('percentOfRetail', { label: 'Percent of Retail' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('reimbursedFromPCR', { label: 'Reimbursed From PCR' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('ingredientCost', { label: 'Ingredient Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('dispensingCost', { label: 'Dispensing Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('administrativeCost', { label: 'Administrative Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('coPay', { label: 'Co Pay' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('totalCost', { label: 'Total Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('averageWholesalePrice', { label: 'Average Wholesale Price' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('weightedAverageCost', { label: 'Weighted Average Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('averageSalePrice', { label: 'Average Sale Price' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('invoiceCost', { label: 'Invoice Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('usualAndCustomary', { label: 'Usual and Customary' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('nationalDrugCode', { label: 'National Drug Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,

    
  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          'claim-procedure',
          'claimProcedureId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('claimProcedureId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClaimProcedureId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'invoice-detail',
          'invoiceDetailId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('invoiceDetailId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentInvoiceDetailId = s
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebCaseAccountCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCaseAccount(input) {

    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    if(this.parentLocationId != ''){
      input = {...input, locationId: this.parentLocationId} 
    }


    if(this.parentVendorId != ''){
      input = {...input, vendorId: this.parentVendorId} 
    }


    if(this.parentAccountStatusId != ''){
      input = {...input, accountStatusId: this.parentAccountStatusId} 
    }


    if(this.parentProcedureTypeId != ''){
      input = {...input, procedureTypeId: this.parentProcedureTypeId} 
    }


    if(this.parentAgreementTypeId != ''){
      input = {...input, agreementTypeId: this.parentAgreementTypeId} 
    }


    if(this.parentClaimProcedureId != ''){
      input = {...input, claimProcedureId: this.parentClaimProcedureId} 
    }


    if(this.parentInvoiceDetailId != ''){
      input = {...input, invoiceDetailId: this.parentInvoiceDetailId} 
    }


    if(this.parentContractId != ''){
      input = {...input, contractId: this.parentContractId} 
    }


    if(this.parentPortfolioId != ''){
      input = {...input, portfolioId: this.parentPortfolioId} 
    }


    if(this.parentProcedureVendorId != ''){
      input = {...input, procedureVendorId: this.parentProcedureVendorId} 
    }


    this.store.createCaseAccountEffect(input)
  }
}
