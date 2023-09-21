

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Patient, CorePaging, UserUpdatePatientInput ,Ethnicity, Gender, Language } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PatientService } from '@case-clinical/web/patient/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebEthnicityFeatureStore } from '@case-clinical/web/ethnicity/shared'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
import { WebLanguageFeatureStore } from '@case-clinical/web/language/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PatientListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
ethnicityId?: string,genderId?: string,languageId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Patient[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPatientListStore extends ComponentStore<PatientListState> {
  constructor(
        private readonly data: WebCoreDataAccessService,
        private readonly router: ActivatedRoute,
        private readonly patientService: PatientService,
        private readonly toast: WebUiToastService,
         private readonly ethnicityStore: WebEthnicityFeatureStore,
 private readonly genderStore: WebGenderFeatureStore,
 private readonly languageStore: WebLanguageFeatureStore
    ) {
    super({
      headerTitle: 'Patients',
      searchFocused: false,
      searchQuery: '',
ethnicityId: undefined,
genderId: undefined,
languageId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })


    if(this.router.snapshot.paramMap.has("ethnicityId")) {
      var ethnicityId = this.router.snapshot.paramMap.get("ethnicityId")
      this.setEthnicityId(ethnicityId)
    }


    if(this.router.snapshot.paramMap.has("genderId")) {
      var genderId = this.router.snapshot.paramMap.get("genderId")
      this.setGenderId(genderId)
    }


    if(this.router.snapshot.paramMap.has("languageId")) {
      var languageId = this.router.snapshot.paramMap.get("languageId")
      this.setLanguageId(languageId)
    }

    this.ethnicityStore.loadEthnicitiesEffect()
this.genderStore.loadGendersEffect()
this.languageStore.loadLanguagesEffect()
  }

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: { ...state.paging, skip }
  }))

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  readonly setSearchBarInFocus = this.updater((state, searchFocused: boolean) => ({
    ...state,
    searchFocused
  }))


            readonly setEthnicityId = this.updater((state, ethnicityId: string) => ({
                ...state,
    ethnicityId,
  }))


            readonly setGenderId = this.updater((state, genderId: string) => ({
                ...state,
    genderId,
  }))


            readonly setLanguageId = this.updater((state, languageId: string) => ({
                ...state,
    languageId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly ethnicityId$ = this.select((s) => s.ethnicityId)

readonly genderId$ = this.select((s) => s.genderId)

readonly languageId$ = this.select((s) => s.languageId)

ethnicities$ = this.ethnicityStore.ethnicities$
genders$ = this.genderStore.genders$
languages$ = this.languageStore.languages$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.ethnicityId$,
this.genderId$,
this.languageId$, this.searchQuery$, (paging, ethnicityId,
genderId,
languageId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    ethnicityId: ethnicityId,genderId: genderId,languageId: languageId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.ethnicityId$,
this.genderId$,
this.languageId$,
    this.data$,
    this.ethnicities$,
this.genders$,
this.languages$,
    (paging, errors, loading, searchFocused, searchQuery, ethnicityId,
genderId,
languageId, data ,ethnicities,genders,languages) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      ethnicityId,
genderId,
languageId,
      data,
      ethnicities,genders,languages
    }),
  )

    addPatients = this.updater((state, patients: any[]) => ({...state, data: state.data.concat(patients) }))
    updatePatients = this.updater((state, patients: any[]) => {
        return {
            ...state,
            data: state.data.map((patient) => {
            const updated = patients.find((el) => el.id === patient.id);
            return updated ? updated : patient;
            })
        }
    })

  validateImportData(excelData: any[]) {
    //excelData = this.patientService.preprocessFirmExcelData(excelData)

    return this.vm$.pipe(
      switchMap((vm) => {
        const ethnicities = vm.ethnicities;
        const genders = vm.genders;
        const languages = vm.languages;
        return this.patientService.validatePatientExcelData(excelData,ethnicities,genders,languages);
      })
    )
  }


  readonly loadPatientsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPatients({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                data: res.data.items,
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

readonly importExcelEffect = this.effect<UserUpdatePatientInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.patientService.importPatients(data).pipe(
        catchError(error => {
          console.log(error)
          this.toast.error(error.Message ?? 'Failed to save', {duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addPatients(created);
            this.updatePatients(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

