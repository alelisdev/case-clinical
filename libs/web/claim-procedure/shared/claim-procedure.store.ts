
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClaimProcedureService } from './claim-procedure.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClaimProcedureInput, UserUpdateClaimProcedureInput, WebCoreDataAccessService, CorePaging, ClaimProcedure, PlaceOfService,ClaimStatus,Claim,Appointment,Procedure } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ClaimProcedureFeatureState {
  errors?: any
  loading?: boolean
  item?: ClaimProcedure
  done: boolean,
  formName?: string
placeOfServiceId?: string,claimStatusId?: string,claimId?: string,appointmentId?: string,procedureId?: string,
  claimProcedures: ClaimProcedure[]
 placeOfServices?: PlaceOfService[],
 claimStatuses?: ClaimStatus[],
 claims?: Claim[],
 appointments?: Appointment[],
 procedures?: Procedure[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebClaimProcedureFeatureStore extends ComponentStore<ClaimProcedureFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly claimProcedureService: ClaimProcedureService
) {
    super({ 
      loading: false,
      claimProcedures: [],
      done: false,
      searchQuery: '',
      formName: undefined,
placeOfServiceId: undefined,
claimStatusId: undefined,
claimId: undefined,
appointmentId: undefined,
procedureId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('claimProcedureId')) {
      var claimProcedureId = this.route.snapshot.paramMap.get('claimProcedureId')
      this.setFormName('claimProcedure_edit')
    } else {
      this.setFormName('claimProcedure_create')
    }


    if(this.route.snapshot.paramMap.has("placeOfServiceId")) {
      var placeOfServiceId = this.route.snapshot.paramMap.get("placeOfServiceId")
      this.setPlaceOfServiceId(placeOfServiceId)
    }


    if(this.route.snapshot.paramMap.has("claimStatusId")) {
      var claimStatusId = this.route.snapshot.paramMap.get("claimStatusId")
      this.setClaimStatusId(claimStatusId)
    }


    if(this.route.snapshot.paramMap.has("claimId")) {
      var claimId = this.route.snapshot.paramMap.get("claimId")
      this.setClaimId(claimId)
    }


    if(this.route.snapshot.paramMap.has("appointmentId")) {
      var appointmentId = this.route.snapshot.paramMap.get("appointmentId")
      this.setAppointmentId(appointmentId)
    }


    if(this.route.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("procedureId")
      this.setProcedureId(procedureId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly claimProcedures$ = this.select((s) => s.claimProcedures)
  readonly placeOfServices$ = this.select((s) => s.placeOfServices || [])
  readonly claimStatuses$ = this.select((s) => s.claimStatuses || [])
  readonly claims$ = this.select((s) => s.claims || [])
  readonly appointments$ = this.select((s) => s.appointments || [])
  readonly procedures$ = this.select((s) => s.procedures || [])

readonly placeOfServiceId$ = this.select((s) => s.placeOfServiceId)

readonly claimStatusId$ = this.select((s) => s.claimStatusId)

readonly claimId$ = this.select((s) => s.claimId)

readonly appointmentId$ = this.select((s) => s.appointmentId)

readonly procedureId$ = this.select((s) => s.procedureId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.claimProcedures$,
this.placeOfServices$,this.claimStatuses$,this.claims$,this.appointments$,this.procedures$,
    (errors, loading, item, formName, claimProcedures, placeOfServices,claimStatuses,claims,appointments,procedures ) => ({
    errors,
    loading,
    item,
    formName,
    claimProcedures,

            placeOfServices,claimStatuses,claims,appointments,procedures
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.placeOfServiceId$,
this.claimStatusId$,
this.claimId$,
this.appointmentId$,
this.procedureId$, this.searchQuery$, (paging, placeOfServiceId,
claimStatusId,
claimId,
appointmentId,
procedureId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    placeOfServiceId: placeOfServiceId,claimStatusId: claimStatusId,claimId: claimId,appointmentId: appointmentId,procedureId: procedureId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPlaceOfServiceId = this.updater((state, placeOfServiceId: string) => ({
                ...state,
    placeOfServiceId,
  }))


            readonly setClaimStatusId = this.updater((state, claimStatusId: string) => ({
                ...state,
    claimStatusId,
  }))


            readonly setClaimId = this.updater((state, claimId: string) => ({
                ...state,
    claimId,
  }))


            readonly setAppointmentId = this.updater((state, appointmentId: string) => ({
                ...state,
    appointmentId,
  }))


            readonly setProcedureId = this.updater((state, procedureId: string) => ({
                ...state,
    procedureId,
  }))



  readonly filterPlaceOfServices = (term) => 
        this.data.userSelectPlaceOfServices({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let placeOfServices = res.data.items;
              this.patchState({placeOfServices})
              return placeOfServices
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


  readonly filterClaimStatuses = (term) => 
        this.data.userSelectClaimStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let claimStatuses = res.data.items;
              this.patchState({claimStatuses})
              return claimStatuses
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


  readonly filterClaims = (term) => 
        this.data.userSelectClaims({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let claims = res.data.items;
              this.patchState({claims})
              return claims
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


  readonly filterAppointments = (term) => 
        this.data.userSelectAppointments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let appointments = res.data.items;
              this.patchState({appointments})
              return appointments
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


  readonly filterProcedures = (term) => 
        this.data.userSelectProcedures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedures = res.data.items;
              this.patchState({procedures})
              return procedures
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



  readonly addPlaceOfService = this.updater((state, placeOfService: PlaceOfService) => ({
    ...state, placeOfServices: state.placeOfServices.concat(placeOfService)
  }))


  readonly addClaimStatus = this.updater((state, claimStatus: ClaimStatus) => ({
    ...state, claimStatuses: state.claimStatuses.concat(claimStatus)
  }))


  readonly addClaim = this.updater((state, claim: Claim) => ({
    ...state, claims: state.claims.concat(claim)
  }))


  readonly addAppointment = this.updater((state, appointment: Appointment) => ({
    ...state, appointments: state.appointments.concat(appointment)
  }))


  readonly addProcedure = this.updater((state, procedure: Procedure) => ({
    ...state, procedures: state.procedures.concat(procedure)
  }))

    

  readonly setItem = this.updater((state, item: ClaimProcedure) => ({...state, item}))

  addNewClaimProcedure = this.updater((state, claimProcedure: ClaimProcedure) => ({ ...state, claimProcedures: [...state.claimProcedures, claimProcedure] }))

  updateClaimProcedure = this.updater((state, claimProcedure: ClaimProcedure) => {
    return {
      ...state,
      claimProcedures: state.claimProcedures.map((el) => {
        if (el.id === claimProcedure.id) {
          return claimProcedure
        } else {
          return el
        }
      }),
    }
  })

  addClaimProcedures = this.updater((state, newClaimProcedures: any[]) => ({...state, claimProcedures: state.claimProcedures.concat(newClaimProcedures) }))
  updateClaimProcedures = this.updater((state, updatedClaimProcedures: any[]) => {
    return {
      ...state,
      claimProcedures: state.claimProcedures.map((claimProcedure) => {
        const updated = updatedClaimProcedures.find((el) => el.id === claimProcedure.id);
        return updated ? updated : claimProcedure;
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
        return this.claimProcedureService.validateClaimProcedureExcelData(excelData, vm.placeOfServices,vm.claimStatuses,vm.claims,vm.appointments,vm.procedures);
      })
    )
  }


  readonly loadClaimProcedureEffect = this.effect<string>((claimProcedureId$) =>
    claimProcedureId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((claimProcedureId) =>
        this.data.userClaimProcedure({ claimProcedureId }).pipe(
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



  readonly loadClaimProceduresEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClaimProcedures({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                claimProcedures: res.data.items,
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

  readonly createClaimProcedureEffect = this.effect<UserCreateClaimProcedureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.claimProcedureService.createClaimProcedure({...input }).pipe(
          tapResponse(
            (claimProcedure: ClaimProcedure) => {
              this.addNewClaimProcedure(claimProcedure)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: claimProcedure, loading: false, done: true }), 300);
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

    readonly updateClaimProcedureEffect = this.effect<UserUpdateClaimProcedureInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.claimProcedureService.updateClaimProcedure(input, input.id).pipe(
              tapResponse(
                (claimProcedure) => {
                  this.updateClaimProcedure(claimProcedure)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: claimProcedure, loading: false, done: true }), 300);
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
  
    readonly deleteClaimProcedureEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, claimProcedure]) => {
          return this.data.userDeleteClaimProcedure({claimProcedureId: claimProcedure.id})
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

  readonly importExcelEffect = this.effect<UserUpdateClaimProcedureInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.claimProcedureService.importClaimProcedures(data).pipe(
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

            this.addClaimProcedures(created);
            this.updateClaimProcedures(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
