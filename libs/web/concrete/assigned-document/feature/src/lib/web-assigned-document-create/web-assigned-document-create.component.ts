
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Template,DocumentType,User } from '@case-clinical/web/core/data-access'
import { WebAssignedDocumentCreateStore } from './web-assigned-document-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-assigned-document-create.component.html',
  providers: [WebAssignedDocumentCreateStore],
})
export class WebAssignedDocumentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly documents$ = this.store.documents$
readonly templates$ = this.store.templates$
readonly documentTypes$ = this.store.documentTypes$
readonly users$ = this.store.users$

  model:any = {}

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.date('expirationDate', { label: 'Expiration Date' }, {className: 'w-full  px-1'}),
WebUiFormField.input('entityName', { label: 'Entity Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('entityId', { label: 'Entity Id' }, {className: 'w-full  px-1', hide: true}),
    
//   WebUiFormField.file(
//       'document',
//       {
//         label: 'Document',
//         delete: (d) => {
//           this.model.document = {}
//         },
//       },
//       {
//         className: 'w-1/2  px-1',
//       },
//     )
// ,

WebUiFormField.select(
  'entityName',
  {
    label: 'Query selection',
    options: [{id: 'CREATE', name: 'Create New Template'}],
    valueProp: 'name',
    labelProp: 'name',
  },
  {
    className: 'w-1/4  px-1',
    hooks: {
      onInit: (field) => {
        this.store.filterQueries('')
      },
    }, 
  },
),
,

  WebUiFormField.select(
          'templateId',
          {
            label: 'Template',
            options: [{id: 'CREATE', name: 'Create New Template'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterTemplates('').pipe(
                  map((x:Template)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'documentTypeId',
          {
            label: 'Document Type',
            options: [{id: 'CREATE', name: 'Create New Document Type'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterDocumentTypes('').pipe(
                  map((x:DocumentType)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'userId',
          {
            label: 'User',
            options: [{id: 'CREATE', name: 'Create New User'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterUsers('').pipe(
                  map((x:User)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
				])

  ]

  constructor(
    private readonly store: WebAssignedDocumentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createAssignedDocument(input) {
    this.store.createAssignedDocumentEffect(input)
  }
}
