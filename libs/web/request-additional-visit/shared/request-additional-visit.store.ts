
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RequestAdditionalVisitService } from './request-additional-visit.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRequestAdditionalVisitInput, UserUpdateRequestAdditionalVisitInput, WebCoreDataAccessService, CorePaging, RequestAdditionalVisit, Patient,LegalCase } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RequestAdditionalVisitFeatureState {
  errors?: any
  loading?: boolean
  item?: RequestAdditionalVisit
  done: boolean,
  formName?: string
patientId?: string,legalCaseId?: string,
  requestAdditionalVisits: RequestAdditionalVisit[]
 patients?: Patient[],
 legalCases?: LegalCase[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRequestAdditionalVisitFeatureStore extends ComponentStore<RequestAdditionalVisitFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly requestAdditionalVisitService: RequestAdditionalVisitService
) {
    super({ 
      loading: false,
      requestAdditionalVisits: [],
      done: false,
      searchQuery: '',
      formName: undefined,
patientId: undefined,
legalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('requestAdditionalVisitId')) {
      var requestAdditionalVisitId = this.route.snapshot.paramMap.get('requestAdditionalVisitId')
      this.setFormName('requestAdditionalVisit_edit')
    } else {
      this.setFormName('requestAdditionalVisit_create')
    }


    if(this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly requestAdditionalVisits$ = this.select((s) => s.requestAdditionalVisits)
  readonly patients$ = this.select((s) => s.patients || [])
  readonly legalCases$ = this.select((s) => s.legalCases || [])

readonly patientId$ = this.select((s) => s.patientId)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.requestAdditionalVisits$,
this.patients$,this.legalCases$,
    (errors, loading, item, formName, requestAdditionalVisits, patients,legalCases ) => ({
    errors,
    loading,
    item,
    formName,
    requestAdditionalVisits,

            patients,legalCases
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.patientId$,
this.legalCaseId$, this.searchQuery$, (paging, patientId,
legalCaseId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    patientId: patientId,legalCaseId: legalCaseId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))



  readonly filterPatients = (term) => 
        this.data.userSelectPatients({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patients = res.data.items;
              this.patchState({patients})
              return patients
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


  readonly filterLegalCases = (term) => 
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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



  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))

    

  readonly setItem = this.updater((state, item: RequestAdditionalVisit) => ({...state, item}))

  addNewRequestAdditionalVisit = this.updater((state, requestAdditionalVisit: RequestAdditionalVisit) => ({ ...state, requestAdditionalVisits: [...state.requestAdditionalVisits, requestAdditionalVisit] }))

  updateRequestAdditionalVisit = this.updater((state, requestAdditionalVisit: RequestAdditionalVisit) => {
    return {
      ...state,
      requestAdditionalVisits: state.requestAdditionalVisits.map((el) => {
        if (el.id === requestAdditionalVisit.id) {
          return requestAdditionalVisit
        } else {
          return el
        }
      }),
    }
  })

  addRequestAdditionalVisits = this.updater((state, newRequestAdditionalVisits: any[]) => ({...state, requestAdditionalVisits: state.requestAdditionalVisits.concat(newRequestAdditionalVisits) }))
  updateRequestAdditionalVisits = this.updater((state, updatedRequestAdditionalVisits: any[]) => {
    return {
      ...state,
      requestAdditionalVisits: state.requestAdditionalVisits.map((requestAdditionalVisit) => {
        const updated = updatedRequestAdditionalVisits.find((el) => el.id === requestAdditionalVisit.id);
        return updated ? updated : requestAdditionalVisit;
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
        return this.requestAdditionalVisitService.validateRequestAdditionalVisitExcelData(excelData, vm.patients,vm.legalCases);
      })
    )
  }


  readonly loadRequestAdditionalVisitEffect = this.effect<string>((requestAdditionalVisitId$) =>
    requestAdditionalVisitId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((requestAdditionalVisitId) =>
        this.data.userRequestAdditionalVisit({ requestAdditionalVisitId }).pipe(
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



  readonly loadRequestAdditionalVisitsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRequestAdditionalVisits({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                requestAdditionalVisits: res.data.items,
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

  readonly createRequestAdditionalVisitEffect = this.effect<UserCreateRequestAdditionalVisitInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.requestAdditionalVisitService.createRequestAdditionalVisit({...input }).pipe(
          tapResponse(
            (requestAdditionalVisit: RequestAdditionalVisit) => {
              this.addNewRequestAdditionalVisit(requestAdditionalVisit)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: requestAdditionalVisit, loading: false, done: true }), 300);
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

    readonly updateRequestAdditionalVisitEffect = this.effect<UserUpdateRequestAdditionalVisitInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.requestAdditionalVisitService.updateRequestAdditionalVisit(input, input.id).pipe(
              tapResponse(
                (requestAdditionalVisit) => {
                  this.updateRequestAdditionalVisit(requestAdditionalVisit)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: requestAdditionalVisit, loading: false, done: true }), 300);
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
  
    readonly deleteRequestAdditionalVisitEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, requestAdditionalVisit]) => {
          return this.data.userDeleteRequestAdditionalVisit({requestAdditionalVisitId: requestAdditionalVisit.id})
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

  readonly importExcelEffect = this.effect<UserUpdateRequestAdditionalVisitInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.requestAdditionalVisitService.importRequestAdditionalVisits(data).pipe(
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

            this.addRequestAdditionalVisits(created);
            this.updateRequestAdditionalVisits(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
