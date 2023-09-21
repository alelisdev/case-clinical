
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AdverseInsuranceStatusService } from './adverse-insurance-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAdverseInsuranceStatusInput, UserUpdateAdverseInsuranceStatusInput, WebCoreDataAccessService, CorePaging, AdverseInsuranceStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AdverseInsuranceStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: AdverseInsuranceStatus
  done: boolean,
  formName?: string

  adverseInsuranceStatuses: AdverseInsuranceStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAdverseInsuranceStatusFeatureStore extends ComponentStore<AdverseInsuranceStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly adverseInsuranceStatusService: AdverseInsuranceStatusService
) {
    super({ 
      loading: false,
      adverseInsuranceStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('adverseInsuranceStatusId')) {
      var adverseInsuranceStatusId = this.route.snapshot.paramMap.get('adverseInsuranceStatusId')
      this.setFormName('adverseInsuranceStatus_edit')
    } else {
      this.setFormName('adverseInsuranceStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly adverseInsuranceStatuses$ = this.select((s) => s.adverseInsuranceStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.adverseInsuranceStatuses$,

    (errors, loading, item, formName, adverseInsuranceStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    adverseInsuranceStatuses,

            
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







    

  readonly setItem = this.updater((state, item: AdverseInsuranceStatus) => ({...state, item}))

  addNewAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus: AdverseInsuranceStatus) => ({ ...state, adverseInsuranceStatuses: [...state.adverseInsuranceStatuses, adverseInsuranceStatus] }))

  updateAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus: AdverseInsuranceStatus) => {
    return {
      ...state,
      adverseInsuranceStatuses: state.adverseInsuranceStatuses.map((el) => {
        if (el.id === adverseInsuranceStatus.id) {
          return adverseInsuranceStatus
        } else {
          return el
        }
      }),
    }
  })

  addAdverseInsuranceStatuses = this.updater((state, newAdverseInsuranceStatuses: any[]) => ({...state, adverseInsuranceStatuses: state.adverseInsuranceStatuses.concat(newAdverseInsuranceStatuses) }))
  updateAdverseInsuranceStatuses = this.updater((state, updatedAdverseInsuranceStatuses: any[]) => {
    return {
      ...state,
      adverseInsuranceStatuses: state.adverseInsuranceStatuses.map((adverseInsuranceStatus) => {
        const updated = updatedAdverseInsuranceStatuses.find((el) => el.id === adverseInsuranceStatus.id);
        return updated ? updated : adverseInsuranceStatus;
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
        return this.adverseInsuranceStatusService.validateAdverseInsuranceStatusExcelData(excelData);
      })
    )
  }


  readonly loadAdverseInsuranceStatusEffect = this.effect<string>((adverseInsuranceStatusId$) =>
    adverseInsuranceStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((adverseInsuranceStatusId) =>
        this.data.userAdverseInsuranceStatus({ adverseInsuranceStatusId }).pipe(
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



  readonly loadAdverseInsuranceStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAdverseInsuranceStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                adverseInsuranceStatuses: res.data.items,
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

  readonly createAdverseInsuranceStatusEffect = this.effect<UserCreateAdverseInsuranceStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.adverseInsuranceStatusService.createAdverseInsuranceStatus({...input }).pipe(
          tapResponse(
            (adverseInsuranceStatus: AdverseInsuranceStatus) => {
              this.addNewAdverseInsuranceStatus(adverseInsuranceStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: adverseInsuranceStatus, loading: false, done: true }), 300);
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

    readonly updateAdverseInsuranceStatusEffect = this.effect<UserUpdateAdverseInsuranceStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.adverseInsuranceStatusService.updateAdverseInsuranceStatus(input, input.id).pipe(
              tapResponse(
                (adverseInsuranceStatus) => {
                  this.updateAdverseInsuranceStatus(adverseInsuranceStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: adverseInsuranceStatus, loading: false, done: true }), 300);
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
  
    readonly deleteAdverseInsuranceStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, adverseInsuranceStatus]) => {
          return this.data.userDeleteAdverseInsuranceStatus({adverseInsuranceStatusId: adverseInsuranceStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAdverseInsuranceStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.adverseInsuranceStatusService.importAdverseInsuranceStatuses(data).pipe(
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

            this.addAdverseInsuranceStatuses(created);
            this.updateAdverseInsuranceStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
