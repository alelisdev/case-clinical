
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, AssignedDocument, Document,Template,DocumentType,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AssignedDocumentFormState {
  errors?: any
  loading?: boolean
  item?: AssignedDocument,
 documents?: Document[],
 templates?: Template[],
 documentTypes?: DocumentType[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebAssignedDocumentFormStore extends ComponentStore<AssignedDocumentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly documents$ = this.select((s) => s.documents)
  readonly templates$ = this.select((s) => s.templates)
  readonly documentTypes$ = this.select((s) => s.documentTypes)
  readonly users$ = this.select((s) => s.users)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.documents$,this.templates$,this.documentTypes$,this.users$,
    (errors, loading, item, documents,templates,documentTypes,users ) => ({
    errors,
    loading,
    item,
documents,templates,documentTypes,users
  }),
{debounce: true})



  readonly filterDocuments = (term) => 
        this.data.userDocuments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let documents = res.data.items;
              return documents
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterTemplates = (term) => 
        this.data.userTemplates({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let templates = res.data.items;
              return templates
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterDocumentTypes = (term) => 
        this.data.userDocumentTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let documentTypes = res.data.items;
              return documentTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterUsers = (term) => 
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              return users
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


}
