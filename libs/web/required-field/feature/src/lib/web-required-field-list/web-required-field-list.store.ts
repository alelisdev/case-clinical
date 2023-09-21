

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, RequiredField, CorePaging, UserUpdateRequiredFieldInput ,AccidentType, MedLevel } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { RequiredFieldService } from '@case-clinical/web/required-field/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface RequiredFieldListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
accidentTypeId?: string,medLevelId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: RequiredField[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebRequiredFieldListStore extends ComponentStore<RequiredFieldListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly requiredFieldService: RequiredFieldService,
        private readonly toast: WebUiToastService,
         private readonly accidentTypeStore: WebAccidentTypeFeatureStore,
 private readonly medLevelStore: WebMedLevelFeatureStore
    ) {
    super({
      headerTitle: 'RequiredFields',
      searchFocused: false,
      searchQuery: '',
accidentTypeId: undefined,
medLevelId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("accidentTypeId")) {
      var accidentTypeId = this.router.snapshot.paramMap.get("accidentTypeId")
      this.setAccidentTypeId(accidentTypeId)
    }


    if(this.router.snapshot.paramMap.has("medLevelId")) {
      var medLevelId = this.router.snapshot.paramMap.get("medLevelId")
      this.setMedLevelId(medLevelId)
    }

    this.accidentTypeStore.loadAccidentTypesEffect()
this.medLevelStore.loadMedLevelsEffect()
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


            readonly setAccidentTypeId = this.updater((state, accidentTypeId: string) => ({
                ...state,
    accidentTypeId,
  }))


            readonly setMedLevelId = this.updater((state, medLevelId: string) => ({
                ...state,
    medLevelId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly accidentTypeId$ = this.select((s) => s.accidentTypeId)

readonly medLevelId$ = this.select((s) => s.medLevelId)

accidentTypes$ = this.accidentTypeStore.accidentTypes$
medLevels$ = this.medLevelStore.medLevels$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.accidentTypeId$,
this.medLevelId$, this.searchQuery$, (paging, accidentTypeId,
medLevelId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    accidentTypeId: accidentTypeId,medLevelId: medLevelId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.accidentTypeId$,
this.medLevelId$,
    this.data$,
    this.accidentTypes$,
this.medLevels$,
    (paging, errors, loading, searchFocused, searchQuery, accidentTypeId,
medLevelId, data ,accidentTypes,medLevels) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      accidentTypeId,
medLevelId,
      data,
      accidentTypes,medLevels
    }),
  )

    addRequiredFields = this.updater((state, requiredFields: any[]) => ({...state, data: state.data.concat(requiredFields) }))
    updateRequiredFields = this.updater((state, requiredFields: any[]) => {
        return {
            ...state,
            data: state.data.map((requiredField) => {
            const updated = requiredFields.find((el) => el.id === requiredField.id);
            return updated ? updated : requiredField;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const accidentTypes = vm.accidentTypes;
const medLevels = vm.medLevels;
        return this.requiredFieldService.validateRequiredFieldExcelData(excelData,accidentTypes,medLevels);
      })
    )
  }


  readonly loadRequiredFieldsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRequiredFields({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateRequiredFieldInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.requiredFieldService.importRequiredFields(data).pipe(
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

            this.addRequiredFields(created);
            this.updateRequiredFields(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

