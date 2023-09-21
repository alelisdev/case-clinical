import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CaseProcedureService } from './case-procedure.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreateCaseProcedureInput,
  UserUpdateCaseProcedureInput,
  WebCoreDataAccessService,
  CorePaging,
  CaseProcedure,
  LegalCase,
  Appointment,
  Location,
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface CaseProcedureFeatureState {
  errors?: any
  loading?: boolean
  item?: CaseProcedure
  done: boolean
  formName?: string
  legalCaseId?: string
  appointmentId?: string
  locationId?: string
  caseProcedures: CaseProcedure[]
  legalCases?: LegalCase[]
  appointments?: Appointment[]
  locations?: Location[]
  searchQuery?: string
  paging?: CorePaging
  selectedRows?: CaseProcedure[]
}

@Injectable()
export class WebCaseProcedureFeatureStore extends ComponentStore<CaseProcedureFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseProcedureService: CaseProcedureService,
  ) {
    super({
      loading: false,
      caseProcedures: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      legalCaseId: undefined,
      appointmentId: undefined,
      locationId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('caseProcedureId')) {
      var caseProcedureId = this.route.snapshot.paramMap.get('caseProcedureId')
      this.setFormName('caseProcedure_edit')
    } else {
      this.setFormName('caseProcedure_create')
    }

    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      var legalCaseId = this.route.snapshot.paramMap.get('legalCaseId')
      this.setLegalCaseId(legalCaseId)
    }

    if (this.route.snapshot.paramMap.has('appointmentId')) {
      var appointmentId = this.route.snapshot.paramMap.get('appointmentId')
      this.setAppointmentId(appointmentId)
    }

    if (this.route.snapshot.paramMap.has('locationId')) {
      var locationId = this.route.snapshot.paramMap.get('locationId')
      this.setLocationId(locationId)
    }
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly caseProcedures$ = this.select((s) => s.caseProcedures)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly appointments$ = this.select((s) => s.appointments || [])
  readonly locations$ = this.select((s) => s.locations || [])

  readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly appointmentId$ = this.select((s) => s.appointmentId)

  readonly locationId$ = this.select((s) => s.locationId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.caseProcedures$,
    this.legalCases$,
    this.appointments$,
    this.locations$,
    (errors, loading, item, formName, caseProcedures, legalCases, appointments, locations) => ({
      errors,
      loading,
      item,
      formName,
      caseProcedures,

      legalCases,
      appointments,
      locations,
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.legalCaseId$,
    this.appointmentId$,
    this.locationId$,
    this.searchQuery$,
    (paging, legalCaseId, appointmentId, locationId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      legalCaseId: legalCaseId,
      appointmentId: appointmentId,
      locationId: locationId,
      total: paging.total,
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
    ...state,
    legalCaseId,
  }))

  readonly setAppointmentId = this.updater((state, appointmentId: string) => ({
    ...state,
    appointmentId,
  }))

  readonly setLocationId = this.updater((state, locationId: string) => ({
    ...state,
    locationId,
  }))

  readonly setSelectedCaseProcedures = this.updater((state, selectedRows: CaseProcedure[]) => ({
    ...state,
    selectedCaseProcedure: selectedRows,
  }))

  readonly filterLegalCases = (term) =>
    this.data.userSelectLegalCases({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let legalCases = res.data.items
          this.patchState({ legalCases })
          return legalCases
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterAppointments = (term) =>
    this.data.userSelectAppointments({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let appointments = res.data.items
          this.patchState({ appointments })
          return appointments
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterLocations = (term) =>
    this.data.userSelectLocations({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let locations = res.data.items
          this.patchState({ locations })
          return locations
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state,
    legalCases: state.legalCases.concat(legalCase),
  }))

  readonly addAppointment = this.updater((state, appointment: Appointment) => ({
    ...state,
    appointments: state.appointments.concat(appointment),
  }))

  readonly addLocation = this.updater((state, location: Location) => ({
    ...state,
    locations: state.locations.concat(location),
  }))

  readonly setItem = this.updater((state, item: CaseProcedure) => ({ ...state, item }))

  addNewCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => ({
    ...state,
    caseProcedures: [...state.caseProcedures, caseProcedure],
  }))

  updateCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => {
    return {
      ...state,
      caseProcedures: state.caseProcedures.map((el) => {
        if (el.id === caseProcedure.id) {
          return caseProcedure
        } else {
          return el
        }
      }),
    }
  })

  addCaseProcedures = this.updater((state, newCaseProcedures: any[]) => ({
    ...state,
    caseProcedures: state.caseProcedures.concat(newCaseProcedures),
  }))
  updateCaseProcedures = this.updater((state, updatedCaseProcedures: any[]) => {
    return {
      ...state,
      caseProcedures: state.caseProcedures.map((caseProcedure) => {
        const updated = updatedCaseProcedures.find((el) => el.id === caseProcedure.id)
        return updated ? updated : caseProcedure
      }),
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.caseProcedureService.validateCaseProcedureExcelData(
          excelData,
          vm.legalCases,
          vm.appointments,
          vm.locations,
        )
      }),
    )
  }

  readonly loadCaseProcedureEffect = this.effect<string>((caseProcedureId$) =>
    caseProcedureId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((caseProcedureId) =>
        this.data.userCaseProcedure({ caseProcedureId }).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                item: res.data.item,
                errors: res.errors,
                loading: false,
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

  readonly loadCaseProceduresEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) => {
        console.log('hit the load effect')
        return this.data.userSelectDetailCaseProcedures({ input }).pipe(
          tapResponse(
            (res) =>
              {
                console.log(res.data.items)
                this.patchState({
                  paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                  caseProcedures: res.data.items,
                  errors: res.errors,
                  loading: false,
                })
              },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        )
      }),
    ),
  )

  readonly createCaseProcedureEffect = this.effect<UserCreateCaseProcedureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.caseProcedureService.createCaseProcedure({ ...input }).pipe(
          tapResponse(
            (caseProcedure: CaseProcedure) => {
              this.addNewCaseProcedure(caseProcedure)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: caseProcedure, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
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
            },
          ),
        ),
      ),
    ),
  )

  readonly updateCaseProcedureEffect = this.effect<UserUpdateCaseProcedureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.caseProcedureService.updateCaseProcedure(input, input.id).pipe(
          tapResponse(
            (caseProcedure) => {
              this.updateCaseProcedure(caseProcedure)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: caseProcedure, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
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
            },
          ),
        ),
      ),
    ),
  )

  readonly deleteCaseProcedureEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([_, caseProcedure]) => {
        return this.data.userDeleteCaseProcedure({ caseProcedureId: caseProcedure.id }).pipe(
          tapResponse(
            (res) => {
              this.toast.success('Deleted successfully!', { duration: 3000 })
              setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
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
            },
          ),
        )
      }),
    ),
  )

  readonly importExcelEffect = this.effect<UserUpdateCaseProcedureInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.caseProcedureService.importCaseProcedures(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addCaseProcedures(created)
            this.updateCaseProcedures(updated)

            this.toast.success(
              `${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`,
              { duration: 3000 },
            )
          }),
        ),
      ),
    ),
  )
}
