
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateAssignedDocumentInput, Template,DocumentType,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebAssignedDocumentEditStore } from './web-assigned-document-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-assigned-document-edit.component.html',
  providers: [WebAssignedDocumentEditStore],
})
export class WebAssignedDocumentEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
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
    
  WebUiFormField.file(
      'document',
      {
        label: 'Document',
        delete: (d) => {
          this.model.document = {}
        },
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.select(
          'templateId',
          {
            label: 'Template',
            options: this.store
                .filterTemplates('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('templateId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.templateId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'documentTypeId',
          {
            label: 'Document Type',
            options: this.store
                .filterDocumentTypes('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('documentTypeId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.documentTypeId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'userId',
          {
            label: 'User',
            options: this.store
                .filterUsers('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('userId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.userId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
				])
    
  ]

    

  constructor(
    private readonly store: WebAssignedDocumentEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateAssignedDocument(input: UserUpdateAssignedDocumentInput) {
     const { name,expirationDate,entityName,entityId,documentId,templateId,documentTypeId,userId } = input
     this.store.updateAssignedDocumentEffect({ name,expirationDate,entityName,entityId,documentId,templateId,documentTypeId,userId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
