
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Invoice } from '@case-clinical/web/core/data-access'
import { WebInvoiceDetailCreateStore } from './web-invoice-detail-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-invoice-detail-create.component.html',
  providers: [WebInvoiceDetailCreateStore],
})
export class WebInvoiceDetailCreateComponent {
    readonly vm$ = this.store.vm$
    readonly invoices$ = this.store.invoices$

  model:any = {}

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
WebUiFormField.date('dateOfService', { label: 'Date of Service' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('providerName', { label: 'Provider Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('procedureDescription', { label: 'Procedure Description' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.number('quantity', { label: 'Quantity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('charges', { label: 'Charges' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('lineTotal', { label: 'Line Total' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'invoice',
          'invoiceId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('invoiceId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentInvoiceId = s
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
    private readonly store: WebInvoiceDetailCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createInvoiceDetail(input) {

    if(this.parentInvoiceId != ''){
      input = {...input, invoiceId: this.parentInvoiceId} 
    }


    this.store.createInvoiceDetailEffect(input)
  }
}
