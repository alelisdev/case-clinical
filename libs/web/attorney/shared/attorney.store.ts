
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable, Injector } from '@angular/core'
import { AttorneyService } from './attorney.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAttorneyInput, UserUpdateAttorneyInput, WebCoreDataAccessService, CorePaging, Attorney, Firm,AttorneyStatus,AttorneyType } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AttorneyFeatureState {
  errors?: any
  loading?: boolean
  item?: Attorney
  done: boolean,
  formName?: string
firmId?: string,attorneyStatusId?: string,attorneyTypeId?: string,
  attorneys: Attorney[]
 firms?: Firm[],
 attorneyStatuses?: AttorneyStatus[],
 attorneyTypes?: AttorneyType[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAttorneyFeatureStore extends ComponentStore<AttorneyFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyService: AttorneyService,
) {
    super({
      loading: false,
      attorneys: [],
      done: false,
      searchQuery: '',
      formName: undefined,
firmId: undefined,
attorneyStatusId: undefined,
attorneyTypeId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('attorneyId')) {
      var attorneyId = this.route.snapshot.paramMap.get('attorneyId')
      this.setFormName('attorney_edit')
    } else {
      this.setFormName('attorney_create')
    }


    if(this.route.snapshot.paramMap.has("firmId")) {
      var firmId = this.route.snapshot.paramMap.get("firmId")
      this.setFirmId(firmId)
    }


    if(this.route.snapshot.paramMap.has("attorneyStatusId")) {
      var attorneyStatusId = this.route.snapshot.paramMap.get("attorneyStatusId")
      this.setAttorneyStatusId(attorneyStatusId)
    }


    if(this.route.snapshot.paramMap.has("attorneyTypeId")) {
      var attorneyTypeId = this.route.snapshot.paramMap.get("attorneyTypeId")
      this.setAttorneyTypeId(attorneyTypeId)
    }

  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly attorneys$ = this.select((s) => s.attorneys)
  readonly firms$ = this.select((s) => s.firms || [])
  readonly attorneyStatuses$ = this.select((s) => s.attorneyStatuses || [])
  readonly attorneyTypes$ = this.select((s) => s.attorneyTypes || [])

readonly firmId$ = this.select((s) => s.firmId)

readonly attorneyStatusId$ = this.select((s) => s.attorneyStatusId)

readonly attorneyTypeId$ = this.select((s) => s.attorneyTypeId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.attorneys$,
this.firms$,this.attorneyStatuses$,this.attorneyTypes$,
    (errors, loading, item, formName, attorneys, firms,attorneyStatuses,attorneyTypes ) => ({
    errors,
    loading,
    item,
    formName,
    attorneys,

            firms,attorneyStatuses,attorneyTypes
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.firmId$,
this.attorneyStatusId$,
this.attorneyTypeId$, this.searchQuery$, (paging, firmId,
attorneyStatusId,
attorneyTypeId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    firmId: firmId,attorneyStatusId: attorneyStatusId,attorneyTypeId: attorneyTypeId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setFirmId = this.updater((state, firmId: string) => ({
                ...state,
    firmId,
  }))


            readonly setAttorneyStatusId = this.updater((state, attorneyStatusId: string) => ({
                ...state,
    attorneyStatusId,
  }))


            readonly setAttorneyTypeId = this.updater((state, attorneyTypeId: string) => ({
                ...state,
    attorneyTypeId,
  }))



  readonly filterFirms = (term) =>
        this.data.userSelectFirms({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firms = res.data.items;
              this.patchState({firms})
              return firms
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


  readonly filterAttorneyStatuses = (term) =>
        this.data.userSelectAttorneyStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneyStatuses = res.data.items;
              this.patchState({attorneyStatuses})
              return attorneyStatuses
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


  readonly filterAttorneyTypes = (term) =>
        this.data.userSelectAttorneyTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneyTypes = res.data.items;
              this.patchState({attorneyTypes})
              return attorneyTypes
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



  readonly addFirm = this.updater((state, firm: Firm) => ({
    ...state, firms: state.firms.concat(firm)
  }))


  readonly addAttorneyStatus = this.updater((state, attorneyStatus: AttorneyStatus) => ({
    ...state, attorneyStatuses: state.attorneyStatuses.concat(attorneyStatus)
  }))


  readonly addAttorneyType = this.updater((state, attorneyType: AttorneyType) => ({
    ...state, attorneyTypes: state.attorneyTypes.concat(attorneyType)
  }))



  readonly setItem = this.updater((state, item: Attorney) => ({...state, item}))

  addNewAttorney = this.updater((state, attorney: Attorney) => ({ ...state, attorneys: [...state.attorneys, attorney] }))

  updateAttorney = this.updater((state, attorney: Attorney) => {
    return {
      ...state,
      attorneys: state.attorneys.map((el) => {
        if (el.id === attorney.id) {
          return attorney
        } else {
          return el
        }
      }),
    }
  })

  addAttorneys = this.updater((state, newAttorneys: any[]) => ({...state, attorneys: state.attorneys.concat(newAttorneys) }))
  updateAttorneys = this.updater((state, updatedAttorneys: any[]) => {
    return {
      ...state,
      attorneys: state.attorneys.map((attorney) => {
        const updated = updatedAttorneys.find((el) => el.id === attorney.id);
        return updated ? updated : attorney;
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
        return this.attorneyService.validateAttorneyExcelData(excelData, vm.firms,vm.attorneyStatuses,vm.attorneyTypes);
      })
    )
  }


  readonly loadAttorneyEffect = this.effect<string>((attorneyId$) =>
    attorneyId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((attorneyId) =>
        this.data.userAttorney({ attorneyId }).pipe(
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



  readonly loadAttorneysEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAttorneys({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                attorneys: res.data.items,
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

  readonly createAttorneyEffect = this.effect<UserCreateAttorneyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.attorneyService.createAttorney({...input }).pipe(
          tapResponse(
            (attorney: Attorney) => {
              this.addNewAttorney(attorney)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: attorney, loading: false, done: true }), 300);
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

    readonly updateAttorneyEffect = this.effect<UserUpdateAttorneyInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.attorneyService.updateAttorney(input, input.id).pipe(
              tapResponse(
                (attorney) => {
                  this.updateAttorney(attorney)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: attorney, loading: false, done: true }), 300);
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

    readonly deleteAttorneyEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, attorney]) => {
          return this.data.userDeleteAttorney({attorneyId: attorney.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAttorneyInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.attorneyService.importAttorneys(data).pipe(
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

            this.addAttorneys(created);
            this.updateAttorneys(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
