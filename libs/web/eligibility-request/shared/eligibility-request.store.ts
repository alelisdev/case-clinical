
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { EligibilityRequestService } from './eligibility-request.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateEligibilityRequestInput, UserUpdateEligibilityRequestInput, WebCoreDataAccessService, CorePaging, EligibilityRequest, EligibilityStatus } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface EligibilityRequestFeatureState {
  errors?: any
  loading?: boolean
  item?: EligibilityRequest
  done: boolean,
  formName?: string
eligibilityStatusId?: string,
  eligibilityRequests: EligibilityRequest[]
 eligibilityStatuses?: EligibilityStatus[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebEligibilityRequestFeatureStore extends ComponentStore<EligibilityRequestFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly eligibilityRequestService: EligibilityRequestService
) {
    super({ 
      loading: false,
      eligibilityRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
eligibilityStatusId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('eligibilityRequestId')) {
      var eligibilityRequestId = this.route.snapshot.paramMap.get('eligibilityRequestId')
      this.setFormName('eligibilityRequest_edit')
    } else {
      this.setFormName('eligibilityRequest_create')
    }


    if(this.route.snapshot.paramMap.has("eligibilityStatusId")) {
      var eligibilityStatusId = this.route.snapshot.paramMap.get("eligibilityStatusId")
      this.setEligibilityStatusId(eligibilityStatusId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly eligibilityRequests$ = this.select((s) => s.eligibilityRequests)
  readonly eligibilityStatuses$ = this.select((s) => s.eligibilityStatuses || [])

readonly eligibilityStatusId$ = this.select((s) => s.eligibilityStatusId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.eligibilityRequests$,
this.eligibilityStatuses$,
    (errors, loading, item, formName, eligibilityRequests, eligibilityStatuses ) => ({
    errors,
    loading,
    item,
    formName,
    eligibilityRequests,

            eligibilityStatuses
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.eligibilityStatusId$, this.searchQuery$, (paging, eligibilityStatusId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    eligibilityStatusId: eligibilityStatusId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setEligibilityStatusId = this.updater((state, eligibilityStatusId: string) => ({
                ...state,
    eligibilityStatusId,
  }))



  readonly filterEligibilityStatuses = (term) => 
        this.data.userSelectEligibilityStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let eligibilityStatuses = res.data.items;
              this.patchState({eligibilityStatuses})
              return eligibilityStatuses
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



  readonly addEligibilityStatus = this.updater((state, eligibilityStatus: EligibilityStatus) => ({
    ...state, eligibilityStatuses: state.eligibilityStatuses.concat(eligibilityStatus)
  }))

    

  readonly setItem = this.updater((state, item: EligibilityRequest) => ({...state, item}))

  addNewEligibilityRequest = this.updater((state, eligibilityRequest: EligibilityRequest) => ({ ...state, eligibilityRequests: [...state.eligibilityRequests, eligibilityRequest] }))

  updateEligibilityRequest = this.updater((state, eligibilityRequest: EligibilityRequest) => {
    return {
      ...state,
      eligibilityRequests: state.eligibilityRequests.map((el) => {
        if (el.id === eligibilityRequest.id) {
          return eligibilityRequest
        } else {
          return el
        }
      }),
    }
  })

  addEligibilityRequests = this.updater((state, newEligibilityRequests: any[]) => ({...state, eligibilityRequests: state.eligibilityRequests.concat(newEligibilityRequests) }))
  updateEligibilityRequests = this.updater((state, updatedEligibilityRequests: any[]) => {
    return {
      ...state,
      eligibilityRequests: state.eligibilityRequests.map((eligibilityRequest) => {
        const updated = updatedEligibilityRequests.find((el) => el.id === eligibilityRequest.id);
        return updated ? updated : eligibilityRequest;
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
        return this.eligibilityRequestService.validateEligibilityRequestExcelData(excelData, vm.eligibilityStatuses);
      })
    )
  }


  readonly loadEligibilityRequestEffect = this.effect<string>((eligibilityRequestId$) =>
    eligibilityRequestId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((eligibilityRequestId) =>
        this.data.userEligibilityRequest({ eligibilityRequestId }).pipe(
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



  readonly loadEligibilityRequestsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userEligibilityRequests({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                eligibilityRequests: res.data.items,
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

  readonly createEligibilityRequestEffect = this.effect<UserCreateEligibilityRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.eligibilityRequestService.createEligibilityRequest({...input }).pipe(
          tapResponse(
            (eligibilityRequest: EligibilityRequest) => {
              this.addNewEligibilityRequest(eligibilityRequest)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: eligibilityRequest, loading: false, done: true }), 300);
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

    readonly updateEligibilityRequestEffect = this.effect<UserUpdateEligibilityRequestInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.eligibilityRequestService.updateEligibilityRequest(input, input.id).pipe(
              tapResponse(
                (eligibilityRequest) => {
                  this.updateEligibilityRequest(eligibilityRequest)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: eligibilityRequest, loading: false, done: true }), 300);
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
  
    readonly deleteEligibilityRequestEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, eligibilityRequest]) => {
          return this.data.userDeleteEligibilityRequest({eligibilityRequestId: eligibilityRequest.id})
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

  readonly importExcelEffect = this.effect<UserUpdateEligibilityRequestInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.eligibilityRequestService.importEligibilityRequests(data).pipe(
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

            this.addEligibilityRequests(created);
            this.updateEligibilityRequests(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
