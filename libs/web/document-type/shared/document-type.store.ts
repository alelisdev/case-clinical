
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { DocumentTypeService } from './document-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateDocumentTypeInput, UserUpdateDocumentTypeInput, WebCoreDataAccessService, CorePaging, DocumentType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface DocumentTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: DocumentType
  done: boolean,
  formName?: string

  documentTypes: DocumentType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebDocumentTypeFeatureStore extends ComponentStore<DocumentTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly documentTypeService: DocumentTypeService
) {
    super({ 
      loading: false,
      documentTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('documentTypeId')) {
      var documentTypeId = this.route.snapshot.paramMap.get('documentTypeId')
      this.setFormName('documentType_edit')
    } else {
      this.setFormName('documentType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly documentTypes$ = this.select((s) => s.documentTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.documentTypes$,

    (errors, loading, item, formName, documentTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    documentTypes,

            
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







    

  readonly setItem = this.updater((state, item: DocumentType) => ({...state, item}))

  addNewDocumentType = this.updater((state, documentType: DocumentType) => ({ ...state, documentTypes: [...state.documentTypes, documentType] }))

  updateDocumentType = this.updater((state, documentType: DocumentType) => {
    return {
      ...state,
      documentTypes: state.documentTypes.map((el) => {
        if (el.id === documentType.id) {
          return documentType
        } else {
          return el
        }
      }),
    }
  })

  addDocumentTypes = this.updater((state, newDocumentTypes: any[]) => ({...state, documentTypes: state.documentTypes.concat(newDocumentTypes) }))
  updateDocumentTypes = this.updater((state, updatedDocumentTypes: any[]) => {
    return {
      ...state,
      documentTypes: state.documentTypes.map((documentType) => {
        const updated = updatedDocumentTypes.find((el) => el.id === documentType.id);
        return updated ? updated : documentType;
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
        return this.documentTypeService.validateDocumentTypeExcelData(excelData);
      })
    )
  }


  readonly loadDocumentTypeEffect = this.effect<string>((documentTypeId$) =>
    documentTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((documentTypeId) =>
        this.data.userDocumentType({ documentTypeId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
            },
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



  readonly loadDocumentTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userDocumentTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                documentTypes: res.data.items,
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

  readonly createDocumentTypeEffect = this.effect<UserCreateDocumentTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.documentTypeService.createDocumentType({...input }).pipe(
          tapResponse(
            (documentType: DocumentType) => {
              this.addNewDocumentType(documentType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: documentType, loading: false, done: true }), 300);
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
        ),
      ),
    ),
  )

    readonly updateDocumentTypeEffect = this.effect<UserUpdateDocumentTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.documentTypeService.updateDocumentType(input, input.id).pipe(
              tapResponse(
                (documentType) => {
                  this.updateDocumentType(documentType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: documentType, loading: false, done: true }), 300);
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
  
    readonly deleteDocumentTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, documentType]) => {
          return this.data.userDeleteDocumentType({documentTypeId: documentType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateDocumentTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.documentTypeService.importDocumentTypes(data).pipe(
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

            this.addDocumentTypes(created);
            this.updateDocumentTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
