
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClaimService } from './claim.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClaimInput, UserUpdateClaimInput, WebCoreDataAccessService, CorePaging, Claim, PriorAuthorizationRequest,Document,Patient } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ClaimFeatureState {
  errors?: any
  loading?: boolean
  item?: Claim
  done: boolean,
  formName?: string
priorAuthorizationRequestId?: string,claimId?: string,explanationOfPaymentId?: string,patientId?: string,
  claims: Claim[]
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 documents?: Document[],
 patients?: Patient[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebClaimFeatureStore extends ComponentStore<ClaimFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly claimService: ClaimService
) {
    super({ 
      loading: false,
      claims: [],
      done: false,
      searchQuery: '',
      formName: undefined,
priorAuthorizationRequestId: undefined,
claimId: undefined,
explanationOfPaymentId: undefined,
patientId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('claimId')) {
      var claimId = this.route.snapshot.paramMap.get('claimId')
      this.setFormName('claim_edit')
    } else {
      this.setFormName('claim_create')
    }


    if(this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }


    if(this.route.snapshot.paramMap.has("claimId")) {
      var claimId = this.route.snapshot.paramMap.get("claimId")
      this.setClaimId(claimId)
    }


    if(this.route.snapshot.paramMap.has("explanationOfPaymentId")) {
      var explanationOfPaymentId = this.route.snapshot.paramMap.get("explanationOfPaymentId")
      this.setExplanationOfPaymentId(explanationOfPaymentId)
    }


    if(this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly claims$ = this.select((s) => s.claims)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly documents$ = this.select((s) => s.documents || [])
  readonly patients$ = this.select((s) => s.patients || [])

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

readonly claimId$ = this.select((s) => s.claimId)

readonly explanationOfPaymentId$ = this.select((s) => s.explanationOfPaymentId)

readonly patientId$ = this.select((s) => s.patientId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.claims$,
this.priorAuthorizationRequests$,this.documents$,this.patients$,
    (errors, loading, item, formName, claims, priorAuthorizationRequests,documents,patients ) => ({
    errors,
    loading,
    item,
    formName,
    claims,

            priorAuthorizationRequests,documents,patients
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.priorAuthorizationRequestId$,
this.claimId$,
this.explanationOfPaymentId$,
this.patientId$, this.searchQuery$, (paging, priorAuthorizationRequestId,
claimId,
explanationOfPaymentId,
patientId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    priorAuthorizationRequestId: priorAuthorizationRequestId,claimId: claimId,explanationOfPaymentId: explanationOfPaymentId,patientId: patientId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))


            readonly setClaimId = this.updater((state, claimId: string) => ({
                ...state,
    claimId,
  }))


            readonly setExplanationOfPaymentId = this.updater((state, explanationOfPaymentId: string) => ({
                ...state,
    explanationOfPaymentId,
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))



  readonly filterPriorAuthorizationRequests = (term) => 
        this.data.userSelectPriorAuthorizationRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorAuthorizationRequests = res.data.items;
              this.patchState({priorAuthorizationRequests})
              return priorAuthorizationRequests
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



  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))


  readonly addDocument = this.updater((state, document: Document) => ({
    ...state, documents: state.documents.concat(document)
  }))


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))

    

  readonly setItem = this.updater((state, item: Claim) => ({...state, item}))

  addNewClaim = this.updater((state, claim: Claim) => ({ ...state, claims: [...state.claims, claim] }))

  updateClaim = this.updater((state, claim: Claim) => {
    return {
      ...state,
      claims: state.claims.map((el) => {
        if (el.id === claim.id) {
          return claim
        } else {
          return el
        }
      }),
    }
  })

  addClaims = this.updater((state, newClaims: any[]) => ({...state, claims: state.claims.concat(newClaims) }))
  updateClaims = this.updater((state, updatedClaims: any[]) => {
    return {
      ...state,
      claims: state.claims.map((claim) => {
        const updated = updatedClaims.find((el) => el.id === claim.id);
        return updated ? updated : claim;
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
        return this.claimService.validateClaimExcelData(excelData, vm.priorAuthorizationRequests,vm.documents,vm.documents,vm.patients);
      })
    )
  }


  readonly loadClaimEffect = this.effect<string>((claimId$) =>
    claimId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((claimId) =>
        this.data.userClaim({ claimId }).pipe(
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



  readonly loadClaimsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClaims({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                claims: res.data.items,
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

  readonly createClaimEffect = this.effect<UserCreateClaimInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.claimService.createClaim({...input }).pipe(
          tapResponse(
            (claim: Claim) => {
              this.addNewClaim(claim)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: claim, loading: false, done: true }), 300);
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

    readonly updateClaimEffect = this.effect<UserUpdateClaimInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.claimService.updateClaim(input, input.id).pipe(
              tapResponse(
                (claim) => {
                  this.updateClaim(claim)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: claim, loading: false, done: true }), 300);
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
  
    readonly deleteClaimEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, claim]) => {
          return this.data.userDeleteClaim({claimId: claim.id})
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

  readonly importExcelEffect = this.effect<UserUpdateClaimInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.claimService.importClaims(data).pipe(
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

            this.addClaims(created);
            this.updateClaims(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
