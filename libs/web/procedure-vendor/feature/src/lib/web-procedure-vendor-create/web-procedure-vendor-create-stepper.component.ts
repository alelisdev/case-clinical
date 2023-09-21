
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { CaseProcedure,Contract,Vendor,ProcedureVendorStatus } from '@case-clinical/web/core/data-access'
import { WebProcedureVendorCreateStore } from './web-procedure-vendor-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-procedure-vendor-create.component.html',
  providers: [WebProcedureVendorCreateStore],
})
export class WebProcedureVendorCreateComponent {
    readonly vm$ = this.store.vm$
    readonly caseProcedures$ = this.store.caseProcedures$
readonly contracts$ = this.store.contracts$
readonly vendors$ = this.store.vendors$
readonly procedureVendorStatuses$ = this.store.procedureVendorStatuses$

  model:any = {}

parentProcedureId: ''
parentContractId: ''
parentVendorId: ''
parentStatusId: ''

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
WebUiFormField.currency('estimate', { label: 'Estimate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('fundingApproved', { label: 'Funding Approved' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
,

    
  WebUiFormField.selectForm(
          'case-procedure',
          'procedureId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('procedureId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureId = s
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
          'procedure-vendor-status',
          'statusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('statusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentStatusId = s
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
    private readonly store: WebProcedureVendorCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createProcedureVendor(input) {

    if(this.parentProcedureId != ''){
      input = {...input, procedureId: this.parentProcedureId} 
    }


    if(this.parentContractId != ''){
      input = {...input, contractId: this.parentContractId} 
    }


    if(this.parentVendorId != ''){
      input = {...input, vendorId: this.parentVendorId} 
    }


    if(this.parentStatusId != ''){
      input = {...input, statusId: this.parentStatusId} 
    }


    this.store.createProcedureVendorEffect(input)
  }
}
