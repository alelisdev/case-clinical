
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PatientStudyService } from './patient-study.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePatientStudyInput, UserUpdatePatientStudyInput, WebCoreDataAccessService, CorePaging, PatientStudy, Patient } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PatientStudyFeatureState {
  errors?: any
  loading?: boolean
  item?: PatientStudy
  done: boolean,
  formName?: string
patientId?: string,
  patientStudies: PatientStudy[]
 patients?: Patient[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPatientStudyFeatureStore extends ComponentStore<PatientStudyFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly patientStudyService: PatientStudyService
) {
    super({ 
      loading: false,
      patientStudies: [],
      done: false,
      searchQuery: '',
      formName: undefined,
patientId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('patientStudyId')) {
      var patientStudyId = this.route.snapshot.paramMap.get('patientStudyId')
      this.setFormName('patientStudy_edit')
    } else {
      this.setFormName('patientStudy_create')
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
  readonly patientStudies$ = this.select((s) => s.patientStudies)
  readonly patients$ = this.select((s) => s.patients || [])

readonly patientId$ = this.select((s) => s.patientId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.patientStudies$,
this.patients$,
    (errors, loading, item, formName, patientStudies, patients ) => ({
    errors,
    loading,
    item,
    formName,
    patientStudies,

            patients
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.patientId$, this.searchQuery$, (paging, patientId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    patientId: patientId,
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



  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))

    

  readonly setItem = this.updater((state, item: PatientStudy) => ({...state, item}))

  addNewPatientStudy = this.updater((state, patientStudy: PatientStudy) => ({ ...state, patientStudies: [...state.patientStudies, patientStudy] }))

  updatePatientStudy = this.updater((state, patientStudy: PatientStudy) => {
    return {
      ...state,
      patientStudies: state.patientStudies.map((el) => {
        if (el.id === patientStudy.id) {
          return patientStudy
        } else {
          return el
        }
      }),
    }
  })

  addPatientStudies = this.updater((state, newPatientStudies: any[]) => ({...state, patientStudies: state.patientStudies.concat(newPatientStudies) }))
  updatePatientStudies = this.updater((state, updatedPatientStudies: any[]) => {
    return {
      ...state,
      patientStudies: state.patientStudies.map((patientStudy) => {
        const updated = updatedPatientStudies.find((el) => el.id === patientStudy.id);
        return updated ? updated : patientStudy;
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
        return this.patientStudyService.validatePatientStudyExcelData(excelData, vm.patients);
      })
    )
  }


  readonly loadPatientStudyEffect = this.effect<string>((patientStudyId$) =>
    patientStudyId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((patientStudyId) =>
        this.data.userPatientStudy({ patientStudyId }).pipe(
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



  readonly loadPatientStudiesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPatientStudies({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                patientStudies: res.data.items,
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

  readonly createPatientStudyEffect = this.effect<UserCreatePatientStudyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.patientStudyService.createPatientStudy({...input }).pipe(
          tapResponse(
            (patientStudy: PatientStudy) => {
              this.addNewPatientStudy(patientStudy)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: patientStudy, loading: false, done: true }), 300);
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

    readonly updatePatientStudyEffect = this.effect<UserUpdatePatientStudyInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.patientStudyService.updatePatientStudy(input, input.id).pipe(
              tapResponse(
                (patientStudy) => {
                  this.updatePatientStudy(patientStudy)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: patientStudy, loading: false, done: true }), 300);
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
  
    readonly deletePatientStudyEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, patientStudy]) => {
          return this.data.userDeletePatientStudy({patientStudyId: patientStudy.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePatientStudyInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.patientStudyService.importPatientStudies(data).pipe(
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

            this.addPatientStudies(created);
            this.updatePatientStudies(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
