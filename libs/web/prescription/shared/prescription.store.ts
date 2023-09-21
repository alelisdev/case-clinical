import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PrescriptionService } from './prescription.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreatePrescriptionInput,
  UserUpdatePrescriptionInput,
  WebCoreDataAccessService,
  CorePaging,
  Prescription,
  Patient,
  Document,
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import * as moment from 'moment'

export interface PrescriptionFeatureState {
  errors?: any
  loading?: boolean
  item?: Prescription
  done: boolean
  formName?: string
  patientId?: string
  documentId?: string
  prescriptions: Prescription[]
  patients?: Patient[]
  documents?: Document[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPrescriptionFeatureStore extends ComponentStore<PrescriptionFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly prescriptionService: PrescriptionService,
  ) {
    super({
      loading: false,
      prescriptions: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      patientId: undefined,
      documentId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('prescriptionId')) {
      const prescriptionId = this.route.snapshot.paramMap.get('prescriptionId')
      this.setFormName('prescription_edit')
    } else {
      this.setFormName('prescription_create')
    }

    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId')
      this.setPatientId(patientId)
    }

    if (this.route.snapshot.paramMap.has('documentId')) {
      const documentId = this.route.snapshot.paramMap.get('documentId')
      this.setDocumentId(documentId)
    }
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly prescriptions$ = this.select((s) => {
    const sortedPrescriptions = s.prescriptions
    console.log('-----------------')
    sortedPrescriptions.sort((prescription1, prescription2) => {
      if (moment(prescription1.createdAt).isBefore(moment(prescription2.createdAt))) {
        return 1
      } else return -1
    })
    return sortedPrescriptions
  })
  readonly patients$ = this.select((s) => s.patients || [])
  readonly documents$ = this.select((s) => s.documents || [])

  readonly patientId$ = this.select((s) => s.patientId)
  readonly documentId$ = this.select((s) => s.documentId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.prescriptions$,
    this.patients$,
    this.documents$,
    (errors, loading, item, formName, prescriptions, patients, documents) => ({
      errors,
      loading,
      item,
      formName,
      prescriptions,
      patients,
      documents,
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.patientId$,
    this.documentId$,
    this.searchQuery$,
    (paging, patientId, documentId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      patientId: patientId,
      documentId: documentId,
      total: paging.total,
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setPatientId = this.updater((state, patientId: string) => ({
    ...state,
    patientId,
  }))

  readonly setDocumentId = this.updater((state, documentId: string) => ({
    ...state,
    documentId,
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip: skip
    }
  }))

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit: limit
    }
  }))

  readonly filterPatients = (term) =>
    this.data.userSelectPatients({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const patients = res.data.items
          this.patchState({ patients })
          return patients
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

  readonly filterDocuments = (term) =>
    this.data.userSelectDocuments({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const documents = res.data.items
          this.patchState({ documents })
          return documents
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

  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state,
    patients: state.patients.concat(patient),
  }))

  readonly addDocument = this.updater((state, document: Document) => ({
    ...state,
    documents: state.documents.concat(document),
  }))

  readonly setItem = this.updater((state, item: Prescription) => ({ ...state, item }))

  addNewPrescription = this.updater((state, prescription: Prescription) => ({
    ...state,
    prescriptions: [...state.prescriptions, prescription],
  }))

  updatePrescription = this.updater((state, prescription: Prescription) => {
    return {
      ...state,
      prescriptions: state.prescriptions.map((el) => {
        if (el.id === prescription.id) {
          return prescription
        } else {
          return el
        }
      }),
    }
  })

  addPrescriptions = this.updater((state, newPrescriptions: any[]) => ({
    ...state,
    prescriptions: state.prescriptions.concat(newPrescriptions),
  }))
  updatePrescriptions = this.updater((state, updatedPrescriptions: any[]) => {
    return {
      ...state,
      prescriptions: state.prescriptions.map((prescription) => {
        const updated = updatedPrescriptions.find((el) => el.id === prescription.id)
        return updated ? updated : prescription
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
        return this.prescriptionService.validatePrescriptionExcelData(excelData, vm.patients, vm.documents)
      }),
    )
  }

  readonly loadPrescriptionEffect = this.effect<string>((prescriptionId$) =>
    prescriptionId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((prescriptionId) =>
        this.data.userPrescription({ prescriptionId }).pipe(
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

  readonly loadPrescriptionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPrescriptions({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                prescriptions: res.data.items,
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

  readonly createPrescriptionEffect = this.effect<UserCreatePrescriptionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.prescriptionService.createPrescription({ ...input }).pipe(
          tapResponse(
            (prescription: Prescription) => {
              this.addNewPrescription(prescription)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: prescription, loading: false, done: true }), 300)
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

  readonly updatePrescriptionEffect = this.effect<UserUpdatePrescriptionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.prescriptionService.updatePrescription(input, input.id).pipe(
          tapResponse(
            (prescription) => {
              this.updatePrescription(prescription)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: prescription, loading: false, done: true }), 300)
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

  readonly deletePrescriptionEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([_, prescription]) => {
        return this.data.userDeletePrescription({ prescriptionId: prescription.id }).pipe(
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

  readonly importExcelEffect = this.effect<UserUpdatePrescriptionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.prescriptionService.importPrescriptions(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addPrescriptions(created)
            this.updatePrescriptions(updated)

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
