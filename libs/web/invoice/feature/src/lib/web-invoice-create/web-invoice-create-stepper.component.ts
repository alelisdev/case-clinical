
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Organization,LegalCase } from '@case-clinical/web/core/data-access'
import { WebInvoiceCreateStore } from './web-invoice-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-invoice-create.component.html',
  providers: [WebInvoiceCreateStore],
})
export class WebInvoiceCreateComponent {
    readonly vm$ = this.store.vm$
    readonly organizations$ = this.store.organizations$
readonly legalCases$ = this.store.legalCases$
readonly documents$ = this.store.documents$

  model:any = {}

parentOrganizationId: ''
parentLegalCaseId: ''
parentInvoiceId: ''

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
WebUiFormField.input('invoiceNumber', { label: 'Invoice Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('amount', { label: 'Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('paid', { label: 'Paid' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('due', { label: 'Due' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'organization',
          'organizationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('organizationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentOrganizationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
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

  WebUiFormField.file(
      'invoice',
      {
        label: 'Invoice',
        delete: (d) => {
          this.model.invoice = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.invoice = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
				])

  ]

  constructor(
    private readonly store: WebInvoiceCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createInvoice(input) {

    if(this.parentOrganizationId != ''){
      input = {...input, organizationId: this.parentOrganizationId} 
    }


    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    if(this.parentInvoiceId != ''){
      input = {...input, invoiceId: this.parentInvoiceId} 
    }


    this.store.createInvoiceEffect(input)
  }
}
