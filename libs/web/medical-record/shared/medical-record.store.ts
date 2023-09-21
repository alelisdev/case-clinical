
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { DateFilterInput } from '@case-clinical/web/core/data-access';

import { Injectable } from '@angular/core'
import { MedicalRecordService } from './medical-record.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateMedicalRecordInput, UserUpdateMedicalRecordInput, WebCoreDataAccessService, CorePaging, MedicalRecord, ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface MedicalRecordFeatureState {
  errors?: any
  loading?: boolean
  item?: MedicalRecord
  done: boolean,
  formName?: string
clinicalProviderId?: string|undefined,
  medicalRecords: MedicalRecord[]
 clinicalProviders?: ClinicalProvider[]
  searchQuery?: string
  paging?: CorePaging
  dateFilter?: DateFilterInput|undefined
}

@Injectable()
export class WebMedicalRecordFeatureStore extends ComponentStore<MedicalRecordFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly medicalRecordService: MedicalRecordService
) {
    super({
      loading: false,
      medicalRecords: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
dateFilter:undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('medicalRecordId')) {
      var medicalRecordId = this.route.snapshot.paramMap.get('medicalRecordId')
      this.setFormName('medicalRecord_edit')
    } else {
      this.setFormName('medicalRecord_create')
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly medicalRecords$ = this.select((s) => s.medicalRecords)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly dateFilter$ = this.select(s => s.dateFilter)

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medicalRecords$,
this.clinicalProviders$,
    (errors, loading, item, formName, medicalRecords, clinicalProviders ) => ({
    errors,
    loading,
    item,
    formName,
    medicalRecords,

            clinicalProviders
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.clinicalProviderId$, this.searchQuery$, this.dateFilter$, (paging, clinicalProviderId,searchQuery, dateFilter) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    clinicalProviderId: clinicalProviderId,
    dateFilter:dateFilter,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setDateFilter = this.updater((state, dateFilter: DateFilterInput|undefined) => ({ ...state, dateFilter }))


            readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string|undefined) => ({
                ...state,
    clinicalProviderId,
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip,
    }
  }))
  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit,
    }
  }))

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



  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))



  readonly setItem = this.updater((state, item: MedicalRecord) => ({...state, item}))

  addNewMedicalRecord = this.updater((state, medicalRecord: MedicalRecord) => ({ ...state, medicalRecords: [...state.medicalRecords, medicalRecord] }))

  updateMedicalRecord = this.updater((state, medicalRecord: MedicalRecord) => {
    return {
      ...state,
      medicalRecords: state.medicalRecords.map((el) => {
        if (el.id === medicalRecord.id) {
          return medicalRecord
        } else {
          return el
        }
      }),
    }
  })

  addMedicalRecords = this.updater((state, newMedicalRecords: any[]) => ({...state, medicalRecords: state.medicalRecords.concat(newMedicalRecords) }))
  updateMedicalRecords = this.updater((state, updatedMedicalRecords: any[]) => {
    return {
      ...state,
      medicalRecords: state.medicalRecords.map((medicalRecord) => {
        const updated = updatedMedicalRecords.find((el) => el.id === medicalRecord.id);
        return updated ? updated : medicalRecord;
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
        return this.medicalRecordService.validateMedicalRecordExcelData(excelData, vm.clinicalProviders);
      })
    )
  }


  readonly loadMedicalRecordEffect = this.effect<string>((medicalRecordId$) =>
    medicalRecordId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((medicalRecordId) =>
        this.data.userMedicalRecord({ medicalRecordId }).pipe(
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



  readonly loadMedicalRecordsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userMedicalRecords({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                medicalRecords: res.data.items,
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

  readonly createMedicalRecordEffect = this.effect<UserCreateMedicalRecordInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.medicalRecordService.createMedicalRecord({...input }).pipe(
          tapResponse(
            (medicalRecord: MedicalRecord) => {
              this.addNewMedicalRecord(medicalRecord)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: medicalRecord, loading: false, done: true }), 300);
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

    readonly updateMedicalRecordEffect = this.effect<UserUpdateMedicalRecordInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.medicalRecordService.updateMedicalRecord(input, input.id).pipe(
              tapResponse(
                (medicalRecord) => {
                  this.updateMedicalRecord(medicalRecord)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: medicalRecord, loading: false, done: true }), 300);
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

    readonly deleteMedicalRecordEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, medicalRecord]) => {
          return this.data.userDeleteMedicalRecord({medicalRecordId: medicalRecord.id})
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

  readonly importExcelEffect = this.effect<UserUpdateMedicalRecordInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.medicalRecordService.importMedicalRecords(data).pipe(
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

            this.addMedicalRecords(created);
            this.updateMedicalRecords(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
