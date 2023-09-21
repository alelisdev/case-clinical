
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { FirmService } from './firm.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateFirmInput, UserUpdateFirmInput, WebCoreDataAccessService, CorePaging, Firm, FirmStatus,Document } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface FirmFeatureState {
  errors?: any
  loading?: boolean
  item?: Firm
  done: boolean,
  formName?: string
firmStatusId?: string,eulaId?: string,
  firms: Firm[]
 firmStatuses?: FirmStatus[],
 documents?: Document[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebFirmFeatureStore extends ComponentStore<FirmFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly firmService: FirmService
) {
    super({ 
      loading: false,
      firms: [],
      done: false,
      searchQuery: '',
      formName: undefined,
firmStatusId: undefined,
eulaId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('firmId')) {
      var firmId = this.route.snapshot.paramMap.get('firmId')
      this.setFormName('firm_edit')
    } else {
      this.setFormName('firm_create')
    }


    if(this.route.snapshot.paramMap.has("firmStatusId")) {
      var firmStatusId = this.route.snapshot.paramMap.get("firmStatusId")
      this.setFirmStatusId(firmStatusId)
    }


    if(this.route.snapshot.paramMap.has("eulaId")) {
      var eulaId = this.route.snapshot.paramMap.get("eulaId")
      this.setEulaId(eulaId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly firms$ = this.select((s) => s.firms)
  readonly firmStatuses$ = this.select((s) => s.firmStatuses || [])
  readonly documents$ = this.select((s) => s.documents || [])

readonly firmStatusId$ = this.select((s) => s.firmStatusId)

readonly eulaId$ = this.select((s) => s.eulaId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.firms$,
this.firmStatuses$,this.documents$,
    (errors, loading, item, formName, firms, firmStatuses,documents ) => ({
    errors,
    loading,
    item,
    formName,
    firms,

            firmStatuses,documents
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.firmStatusId$,
this.eulaId$, this.searchQuery$, (paging, firmStatusId,
eulaId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    firmStatusId: firmStatusId,eulaId: eulaId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setFirmStatusId = this.updater((state, firmStatusId: string) => ({
                ...state,
    firmStatusId,
  }))


            readonly setEulaId = this.updater((state, eulaId: string) => ({
                ...state,
    eulaId,
  }))



  readonly filterFirmStatuses = (term) => 
        this.data.userSelectFirmStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firmStatuses = res.data.items;
              this.patchState({firmStatuses})
              return firmStatuses
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


  readonly filterDocuments = (term) => 
        this.data.userSelectDocuments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let documents = res.data.items;
              this.patchState({documents})
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



  readonly addFirmStatus = this.updater((state, firmStatus: FirmStatus) => ({
    ...state, firmStatuses: state.firmStatuses.concat(firmStatus)
  }))


  readonly addDocument = this.updater((state, document: Document) => ({
    ...state, documents: state.documents.concat(document)
  }))

    

  readonly setItem = this.updater((state, item: Firm) => ({...state, item}))

  addNewFirm = this.updater((state, firm: Firm) => ({ ...state, firms: [...state.firms, firm] }))

  updateFirm = this.updater((state, firm: Firm) => {
    return {
      ...state,
      firms: state.firms.map((el) => {
        if (el.id === firm.id) {
          return firm
        } else {
          return el
        }
      }),
    }
  })

  addFirms = this.updater((state, newFirms: any[]) => ({...state, firms: state.firms.concat(newFirms) }))
  updateFirms = this.updater((state, updatedFirms: any[]) => {
    return {
      ...state,
      firms: state.firms.map((firm) => {
        const updated = updatedFirms.find((el) => el.id === firm.id);
        return updated ? updated : firm;
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
        return this.firmService.validateFirmExcelData(excelData, vm.firmStatuses,vm.documents);
      })
    )
  }


  readonly loadFirmEffect = this.effect<string>((firmId$) =>
    firmId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((firmId) =>
        this.data.userFirm({ firmId }).pipe(
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



  readonly loadFirmsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userFirms({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                firms: res.data.items,
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

  readonly createFirmEffect = this.effect<UserCreateFirmInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.firmService.createFirm({...input }).pipe(
          tapResponse(
            (firm: Firm) => {
              this.addNewFirm(firm)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: firm, loading: false, done: true }), 300);
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

    readonly updateFirmEffect = this.effect<UserUpdateFirmInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.firmService.updateFirm(input, input.id).pipe(
              tapResponse(
                (firm) => {
                  this.updateFirm(firm)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: firm, loading: false, done: true }), 300);
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
  
    readonly deleteFirmEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, firm]) => {
          return this.data.userDeleteFirm({firmId: firm.id})
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

  readonly importExcelEffect = this.effect<UserUpdateFirmInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.firmService.importFirms(data).pipe(
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

            this.addFirms(created);
            this.updateFirms(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
