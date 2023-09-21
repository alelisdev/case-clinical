
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { DocumentService } from './document.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateDocumentInput, UserUpdateDocumentInput, WebCoreDataAccessService, CorePaging, Document,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface DocumentFeatureState {
  errors?: any
  loading?: boolean
  item?: Document
  done: boolean,
  formName?: string

  documents: Document[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebDocumentFeatureStore extends ComponentStore<DocumentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly documentService: DocumentService
) {
    super({
      loading: false,
      documents: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('documentId')) {
      var documentId = this.route.snapshot.paramMap.get('documentId')
      this.setFormName('document_edit')
    } else {
      this.setFormName('document_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly documents$ = this.select((s) => s.documents)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.documents$,

    (errors, loading, item, formName, documents,  ) => ({
    errors,
    loading,
    item,
    formName,
    documents,


  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,

    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))









  readonly setItem = this.updater((state, item: Document) => ({...state, item}))

  addNewDocument = this.updater((state, document: Document) => ({ ...state, documents: [...state.documents, document] }))

  updateDocument = this.updater((state, document: Document) => {
    return {
      ...state,
      documents: state.documents.map((el) => {
        if (el.id === document.id) {
          return document
        } else {
          return el
        }
      }),
    }
  })

  addDocuments = this.updater((state, newDocuments: any[]) => ({...state, documents: state.documents.concat(newDocuments) }))
  updateDocuments = this.updater((state, updatedDocuments: any[]) => {
    return {
      ...state,
      documents: state.documents.map((document) => {
        const updated = updatedDocuments.find((el) => el.id === document.id);
        return updated ? updated : document;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.documentService.validateDocumentExcelData(excelData);
      })
    )
  }


  readonly loadDocumentEffect = this.effect<string>((documentId$) =>
    documentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((documentId) =>
        this.data.getDocument(documentId).pipe(
          tapResponse(
            (document: Document) => {
                    this.patchState({
                    item: document,
                    loading: false
                })
            },
            (errors: any) =>
            {
              console.log(errors)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )



  readonly loadDocumentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userDocuments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                documents: res.data.items,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly createDocumentEffect = this.effect<UserCreateDocumentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>{
        console.log(input)
        return  this.documentService.createDocument({...input }).pipe(
          tapResponse(
            (document: Document) => {
              this.addNewDocument(document)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: document, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        );
      },
       
      ),
    ),
  )

    readonly updateDocumentEffect = this.effect<UserUpdateDocumentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.documentService.updateDocument(input, input.id).pipe(
              tapResponse(
                (document) => {
                  this.updateDocument(document)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: document, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )

    readonly deleteDocumentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, document]) => {
          return this.data.userDeleteDocument({documentId: document.id, featureName: ' '})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateDocumentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.documentService.importDocuments(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addDocuments(created);
            this.updateDocuments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
