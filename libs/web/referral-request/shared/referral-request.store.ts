
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ReferralRequestService } from './referral-request.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateReferralRequestInput, UserUpdateReferralRequestInput, WebCoreDataAccessService, CorePaging, ReferralRequest, Patient,LegalCase,ClinicalProvider,ClinicalProviderLocation } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ReferralRequestFeatureState {
  errors?: any
  loading?: boolean
  item?: ReferralRequest
  done: boolean,
  formName?: string
patientId?: string,legalCaseId?: string,requestingProviderId?: string,referredToId?: string,clinicalProviderLocationId?: string,
  referralRequests: ReferralRequest[]
 patients?: Patient[],
 legalCases?: LegalCase[],
 clinicalProviders?: ClinicalProvider[],
 clinicalProviderLocations?: ClinicalProviderLocation[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebReferralRequestFeatureStore extends ComponentStore<ReferralRequestFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly referralRequestService: ReferralRequestService
) {
    super({
      loading: false,
      referralRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
patientId: undefined,
legalCaseId: undefined,
requestingProviderId: undefined,
referredToId: undefined,
clinicalProviderLocationId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('referralRequestId')) {
      var referralRequestId = this.route.snapshot.paramMap.get('referralRequestId')
      this.setFormName('referralRequest_edit')
    } else {
      this.setFormName('referralRequest_create')
    }


    if(this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }


    if(this.route.snapshot.paramMap.has("requestingProviderId")) {
      var requestingProviderId = this.route.snapshot.paramMap.get("requestingProviderId")
      this.setRequestingProviderId(requestingProviderId)
    }


    if(this.route.snapshot.paramMap.has("referredToId")) {
      var referredToId = this.route.snapshot.paramMap.get("referredToId")
      this.setReferredToId(referredToId)
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderLocationId")) {
      var clinicalProviderLocationId = this.route.snapshot.paramMap.get("clinicalProviderLocationId")
      this.setClinicalProviderLocationId(clinicalProviderLocationId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly referralRequests$ = this.select((s) => s.referralRequests)
  readonly patients$ = this.select((s) => s.patients || [])
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly clinicalProviderLocations$ = this.select((s) => s.clinicalProviderLocations || [])

readonly patientId$ = this.select((s) => s.patientId)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly requestingProviderId$ = this.select((s) => s.requestingProviderId)

readonly referredToId$ = this.select((s) => s.referredToId)

readonly clinicalProviderLocationId$ = this.select((s) => s.clinicalProviderLocationId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.referralRequests$,
this.patients$,this.legalCases$,this.clinicalProviders$,this.clinicalProviderLocations$,
    (errors, loading, item, formName, referralRequests, patients,legalCases,clinicalProviders,clinicalProviderLocations ) => ({
    errors,
    loading,
    item,
    formName,
    referralRequests,

            patients,legalCases,clinicalProviders,clinicalProviderLocations
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.patientId$,
this.legalCaseId$,
this.requestingProviderId$,
this.referredToId$,
this.clinicalProviderLocationId$, this.searchQuery$, (paging, patientId,
legalCaseId,
requestingProviderId,
referredToId,
clinicalProviderLocationId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    patientId: patientId,legalCaseId: legalCaseId,requestingProviderId: requestingProviderId,referredToId: referredToId,clinicalProviderLocationId: clinicalProviderLocationId,
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


            readonly setRequestingProviderId = this.updater((state, requestingProviderId: string) => ({
                ...state,
    requestingProviderId,
  }))


            readonly setReferredToId = this.updater((state, referredToId: string) => ({
                ...state,
    referredToId,
  }))


            readonly setClinicalProviderLocationId = this.updater((state, clinicalProviderLocationId: string) => ({
                ...state,
    clinicalProviderLocationId,
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


  readonly filterClinicalProviders = (term) =>
        this.data.userSelectClinicalProviders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let clinicalProviders = res.data.items;
              this.patchState({clinicalProviders})
              return clinicalProviders
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


  readonly filterClinicalProviderLocations = (term) =>
        this.data.userSelectClinicalProviderLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let clinicalProviderLocations = res.data.items;
              this.patchState({clinicalProviderLocations})
              return clinicalProviderLocations
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


  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))


  readonly addClinicalProviderLocation = this.updater((state, clinicalProviderLocation: ClinicalProviderLocation) => ({
    ...state, clinicalProviderLocations: state.clinicalProviderLocations.concat(clinicalProviderLocation)
  }))



  readonly setItem = this.updater((state, item: ReferralRequest) => ({...state, item}))

  addNewReferralRequest = this.updater((state, referralRequest: ReferralRequest) => ({ ...state, referralRequests: [...state.referralRequests, referralRequest] }))

  updateReferralRequest = this.updater((state, referralRequest: ReferralRequest) => {
    return {
      ...state,
      referralRequests: state.referralRequests.map((el) => {
        if (el.id === referralRequest.id) {
          return referralRequest
        } else {
          return el
        }
      }),
    }
  })

  addReferralRequests = this.updater((state, newReferralRequests: any[]) => ({...state, referralRequests: state.referralRequests.concat(newReferralRequests) }))
  updateReferralRequests = this.updater((state, updatedReferralRequests: any[]) => {
    return {
      ...state,
      referralRequests: state.referralRequests.map((referralRequest) => {
        const updated = updatedReferralRequests.find((el) => el.id === referralRequest.id);
        return updated ? updated : referralRequest;
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
        return this.referralRequestService.validateReferralRequestExcelData(excelData, vm.patients,vm.legalCases,vm.clinicalProviders, vm.clinicalProviders,vm.clinicalProviderLocations);
      })
    )
  }


  readonly loadReferralRequestEffect = this.effect<string>((referralRequestId$) =>
    referralRequestId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((referralRequestId) =>
        this.data.userReferralRequest({ referralRequestId }).pipe(
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



  readonly loadReferralRequestsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userReferralRequests({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                referralRequests: res.data.items,
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

  readonly createReferralRequestEffect = this.effect<UserCreateReferralRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.referralRequestService.createReferralRequest({...input }).pipe(
          tapResponse(
            (referralRequest: ReferralRequest) => {
              this.addNewReferralRequest(referralRequest)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: referralRequest, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              console.log(errors);
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

    readonly updateReferralRequestEffect = this.effect<UserUpdateReferralRequestInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.referralRequestService.updateReferralRequest(input, input.id).pipe(
              tapResponse(
                (referralRequest) => {
                  this.updateReferralRequest(referralRequest)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: referralRequest, loading: false, done: true }), 300);
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

    readonly deleteReferralRequestEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, referralRequest]) => {
          return this.data.userDeleteReferralRequest({referralRequestId: referralRequest.id})
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

  readonly importExcelEffect = this.effect<UserUpdateReferralRequestInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.referralRequestService.importReferralRequests(data).pipe(
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

            this.addReferralRequests(created);
            this.updateReferralRequests(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
