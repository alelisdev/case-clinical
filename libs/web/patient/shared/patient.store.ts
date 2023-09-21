import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PatientService } from './patient.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreatePatientInput,
  UserUpdatePatientInput,
  WebCoreDataAccessService,
  CorePaging,
  Patient,
  Ethnicity,
  Gender,
  Language
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PatientFeatureState {
  errors?: any
  loading?: boolean
  item?: Patient
  done: boolean
  isAllPatients:boolean
  formName?: string
  ethnicityId?: string
  genderId?: string
  languageId?: string
  clinicalProviderId?: string
  locationId?: string
  vendorLocationId?:string | undefined
  patients: Patient[]
  ethnicities?: Ethnicity[]
  genders?: Gender[]
  languages?: Language[]
  searchQuery?: string
  memberRegistrationNumber?: string | undefined
  fromDate: Date|undefined
  toDate: Date|undefined

  paging?: CorePaging
  mrn?: string
}

@Injectable()
export class WebPatientFeatureStore extends ComponentStore<PatientFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly patientService: PatientService,
  ) {
    super({
      loading: false,
      patients: [],
      done: false,
      searchQuery: '',
      memberRegistrationNumber: undefined,
      formName: undefined,
      ethnicityId: undefined,
      genderId: undefined,
      languageId: undefined,
      clinicalProviderId: undefined,
      locationId: undefined,
      vendorLocationId:undefined,
      isAllPatients:false,
      fromDate:undefined,
      toDate:undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
      mrn: undefined,
    })

    if (this.route.snapshot.paramMap.has('patientId')) {
      var patientId = this.route.snapshot.paramMap.get('patientId')
      this.setFormName('patient_edit')
    } else {
      this.setFormName('patient_create')
    }

    if (this.route.snapshot.paramMap.has('ethnicityId')) {
      var ethnicityId = this.route.snapshot.paramMap.get('ethnicityId')
      this.setEthnicityId(ethnicityId)
    }

    if (this.route.snapshot.paramMap.has('genderId')) {
      var genderId = this.route.snapshot.paramMap.get('genderId')
      this.setGenderId(genderId)
    }

    if (this.route.snapshot.paramMap.has('languageId')) {
      var languageId = this.route.snapshot.paramMap.get('languageId')
      this.setLanguageId(languageId)
    }
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly isAllPatients$ = this.select((s) => s.isAllPatients)

  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly patients$ = this.select((s) => s.patients)
  readonly ethnicities$ = this.select((s) => s.ethnicities || [])
  readonly genders$ = this.select((s) => s.genders || [])
  readonly languages$ = this.select((s) => s.languages || [])

  readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)
  readonly locationId$ = this.select((s) => s.locationId)

  readonly ethnicityId$ = this.select((s) => s.ethnicityId)

  readonly genderId$ = this.select((s) => s.genderId)

  readonly languageId$ = this.select((s) => s.languageId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly memberRegistrationNumber$ = this.select((s) => s.memberRegistrationNumber)

  readonly fromDate$ = this.select((s) => s.fromDate)
  readonly toDate$ = this.select((s) => s.toDate)

  readonly vendorLocationId$ = this.select((s)=> s.vendorLocationId)
  readonly formName$ = this.select((s) => s.formName)

  readonly mrn$ = this.select((s) => s.mrn)
  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.patients$,
    this.ethnicities$,
    this.genders$,
    this.languages$,
    (errors, loading, item, formName, patients, ethnicities, genders, languages) => ({
      errors,
      loading,
      item,
      formName,
      patients,

      ethnicities,
      genders,
      languages,
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.ethnicityId$,
    this.genderId$,
    this.clinicalProviderId$,
    this.locationId$,
    this.vendorLocationId$,
    this.languageId$,
    this.searchQuery$,
    this.memberRegistrationNumber$,
    this.fromDate$,
    this.toDate$,
    this.isAllPatients$,
    this.mrn$,
    (paging, ethnicityId, genderId, clinicalProviderId, locationId ,vendorLocationId, languageId, searchQuery, memberRegistrationNumber, fromDate, toDate, isAllPatients, medicalRecordNumber) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      ethnicityId: ethnicityId,
      genderId: genderId,
      languageId: languageId,
      total: paging.total,
      clinicalProviderId: clinicalProviderId,
      locationId: locationId,
      vendorLocationId: vendorLocationId,
      memberRegistrationNumber: memberRegistrationNumber,
      fromDate:fromDate,
      toDate:toDate,
      medicalRecordNumber,
      isAllPatients:isAllPatients
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setEthnicityId = this.updater((state, ethnicityId: string) => ({
    ...state,
    ethnicityId,
  }))

  readonly setIsAllPatients = this.updater((state, isAllPatients: boolean) => ({
    ...state,
    isAllPatients,
  }))

    readonly setmedicalRecordNumber = this.updater((state, mrn: string) => ({
      ...state,
      mrn,
  }))

  readonly setGenderId = this.updater((state, genderId: string) => ({
    ...state,
    genderId,
  }))

  readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string) => ({
    ...state,
    clinicalProviderId,
  }))

  readonly setLocationId = this.updater((state, locationId: string) => ({
    ...state,
    locationId,
  }))

  readonly setVendorLocationId = this.updater((state, vendorLocationId: string|undefined) => ({
    ...state,
    vendorLocationId,
  }))

  readonly setLanguageId = this.updater((state, languageId: string) => ({
    ...state,
    languageId,
  }))

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit,
    },
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip,
    },
  }))

  readonly filterEthnicities = (term) =>
    this.data.userSelectEthnicities({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let ethnicities = res.data.items
          this.patchState({ ethnicities })
          return ethnicities
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

  readonly filterGenders = (term) =>
    this.data.userSelectGenders({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let genders = res.data.items
          this.patchState({ genders })
          return genders
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

  readonly filterLanguages = (term) =>
    this.data.userSelectLanguages({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let languages = res.data.items
          this.patchState({ languages })
          return languages
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

  readonly addEthnicity = this.updater((state, ethnicity: Ethnicity) => ({
    ...state,
    ethnicities: state.ethnicities.concat(ethnicity),
  }))

  readonly addGender = this.updater((state, gender: Gender) => ({
    ...state,
    genders: state.genders.concat(gender),
  }))

  readonly addLanguage = this.updater((state, language: Language) => ({
    ...state,
    languages: state.languages.concat(language),
  }))

  readonly setItem = this.updater((state, item: Patient) => ({ ...state, item }))

  addNewPatient = this.updater((state, patient: Patient) => ({ ...state, patients: [...state.patients, patient] }))

  updatePatient = this.updater((state, patient: Patient) => {
    return {
      ...state,
      patients: state.patients.map((el) => {
        return (el.id === patient.id)? patient: el;
      }),
    }
  })

  addPatients = this.updater((state, newPatients: any[]) => ({
    ...state,
    patients: state.patients.concat(newPatients),
  }))
  updatePatients = this.updater((state, updatedPatients: any[]) => {
    return {
      ...state,
      patients: state.patients.map((patient) => {
        const updated = updatedPatients.find((el) => el.id === patient.id)
        return updated ? updated : patient
      }),
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  readonly setMemberRegistrationNumber = this.updater((state, memberRegistrationNumber: string) => ({
    ...state,
    memberRegistrationNumber,
  }))

  readonly setFromDate = this.updater((state, fromDate: Date) => ({
    ...state,
    fromDate,
  }))

  readonly setToDate = this.updater((state, toDate: Date) => ({
    ...state,
    toDate,
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.patientService.validatePatientExcelData(excelData, vm.ethnicities, vm.genders, vm.languages)
      }),
    )
  }

  readonly loadPatientEffect = this.effect<string>((patientId$) =>
    patientId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((patientId) =>
        this.data.userPatient({ patientId }).pipe(
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

  readonly loadPatientsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPatients({ input }).pipe(
          tapResponse(
            (res) => {
              console.log('Skip:::::', res)
              return this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                patients: res.data.items,
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

  readonly createPatientEffect = this.effect<UserCreatePatientInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.patientService.createPatient({ ...input }).pipe(
          tapResponse(
            (patient: Patient) => {
              this.addNewPatient(patient)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: patient, loading: false, done: true }), 300)
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

  readonly updatePatientEffect = this.effect<UserUpdatePatientInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) => {
        return this.patientService.updatePatient(input, input.id).pipe(
          tapResponse(
            (patient) => {
              this.updatePatient(patient)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: patient, loading: false, done: true }), 300)
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

  readonly deletePatientEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([_, patient]) => {
        return this.data.userDeletePatient({ patientId: patient.id }).pipe(
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

  readonly importExcelEffect = this.effect<UserUpdatePatientInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.patientService.importPatients(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addPatients(created)
            this.updatePatients(updated)

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
