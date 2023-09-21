
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorMedsToDateService } from './prior-meds-to-date.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorMedsToDateInput, UserUpdatePriorMedsToDateInput, WebCoreDataAccessService, CorePaging, PriorMedsToDate, LegalCase,PriorMedsToDateStatus, Specialty, VisitKind } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorMedsToDateFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorMedsToDate
  done: boolean,
  formName?: string
legalCaseId?: string,priorMedsToDateStatusId?: string,specialtyId?: string,visitKindId?: string,
  priorMedsToDates: PriorMedsToDate[]
 legalCases?: LegalCase[],
 priorMedsToDateStatuses?: PriorMedsToDateStatus[],
 specialties?: Specialty[],
 visitKinds?: VisitKind[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorMedsToDateFeatureStore extends ComponentStore<PriorMedsToDateFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorMedsToDateService: PriorMedsToDateService
) {
    super({ 
      loading: false,
      priorMedsToDates: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
priorMedsToDateStatusId: undefined,
specialtyId: undefined,
visitKindId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorMedsToDateId')) {
      var priorMedsToDateId = this.route.snapshot.paramMap.get('priorMedsToDateId')
      this.setFormName('priorMedsToDate_edit')
    } else {
      this.setFormName('priorMedsToDate_create')
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }


    if(this.route.snapshot.paramMap.has("priorMedsToDateStatusId")) {
      var priorMedsToDateStatusId = this.route.snapshot.paramMap.get("priorMedsToDateStatusId")
      this.setPriorMedsToDateStatusId(priorMedsToDateStatusId)
    }

    if(this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId")
      this.setSpecialtyId(specialtyId)
    }

    if(this.route.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.route.snapshot.paramMap.get("visitKindId")
      this.setVisitKindId(visitKindId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorMedsToDates$ = this.select((s) => s.priorMedsToDates)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly priorMedsToDateStatuses$ = this.select((s) => s.priorMedsToDateStatuses || [])

  readonly specialties$ = this.select((s) => s.specialties || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly priorMedsToDateStatusId$ = this.select((s) => s.priorMedsToDateStatusId)

readonly specialtyId$ = this.select((s) => s.specialtyId)

readonly visitKindId$ = this.select((s) => s.visitKindId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorMedsToDates$,
this.legalCases$,this.priorMedsToDateStatuses$,this.specialties$,this.visitKinds$,
    (errors, loading, item, formName, priorMedsToDates, legalCases,priorMedsToDateStatuses, specialties,visitKinds ) => ({
    errors,
    loading,
    item,
    formName,
    priorMedsToDates,

            legalCases,priorMedsToDateStatuses
            , specialties,visitKinds
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.priorMedsToDateStatusId$, this.specialtyId$,
this.visitKindId$, this.searchQuery$, (paging, legalCaseId,
priorMedsToDateStatusId,specialtyId,
visitKindId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,priorMedsToDateStatusId: priorMedsToDateStatusId,
    specialtyId:specialtyId,
visitKindId:visitKindId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))


            readonly setPriorMedsToDateStatusId = this.updater((state, priorMedsToDateStatusId: string) => ({
                ...state,
    priorMedsToDateStatusId,
  }))

  readonly setSpecialtyId = this.updater((state, specialtyId: string) => ({
    ...state,
    specialtyId,
}))


readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
    ...state,
    visitKindId,
}))



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


  readonly filterPriorMedsToDateStatuses = (term) => 
        this.data.userSelectPriorMedsToDateStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorMedsToDateStatuses = res.data.items;
              this.patchState({priorMedsToDateStatuses})
              return priorMedsToDateStatuses
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

  readonly filterSpecialties = (term) => 
        this.data.userSelectSpecialties({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let specialties = res.data.items;
              this.patchState({specialties})
              return specialties
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

  readonly filterVisitKinds = (term) => 
        this.data.userSelectVisitKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let visitKinds = res.data.items;
              this.patchState({visitKinds})
              return visitKinds
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



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addPriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus: PriorMedsToDateStatus) => ({
    ...state, priorMedsToDateStatuses: state.priorMedsToDateStatuses.concat(priorMedsToDateStatus)
  }))

 
  readonly addSpecialty = this.updater((state, specialty: Specialty) => ({
    ...state, specialties: state.specialties.concat(specialty)
  }))

  readonly addVisitKind = this.updater((state, visitKind: VisitKind) => ({
    ...state, visitKinds: state.visitKinds.concat(visitKind)
  }))

  readonly setItem = this.updater((state, item: PriorMedsToDate) => ({...state, item}))

  addNewPriorMedsToDate = this.updater((state, priorMedsToDate: PriorMedsToDate) => ({ ...state, priorMedsToDates: [...state.priorMedsToDates, priorMedsToDate] }))

  updatePriorMedsToDate = this.updater((state, priorMedsToDate: PriorMedsToDate) => {
    return {
      ...state,
      priorMedsToDates: state.priorMedsToDates.map((el) => {
        if (el.id === priorMedsToDate.id) {
          return priorMedsToDate
        } else {
          return el
        }
      }),
    }
  })

  addPriorMedsToDates = this.updater((state, newPriorMedsToDates: any[]) => ({...state, priorMedsToDates: state.priorMedsToDates.concat(newPriorMedsToDates) }))
  updatePriorMedsToDates = this.updater((state, updatedPriorMedsToDates: any[]) => {
    return {
      ...state,
      priorMedsToDates: state.priorMedsToDates.map((priorMedsToDate) => {
        const updated = updatedPriorMedsToDates.find((el) => el.id === priorMedsToDate.id);
        return updated ? updated : priorMedsToDate;
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
        return this.priorMedsToDateService.validatePriorMedsToDateExcelData(excelData, vm.legalCases,vm.priorMedsToDateStatuses);
      })
    )
  }


  readonly loadPriorMedsToDateEffect = this.effect<string>((priorMedsToDateId$) =>
    priorMedsToDateId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorMedsToDateId) =>
        this.data.userPriorMedsToDate({ priorMedsToDateId }).pipe(
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



  readonly loadPriorMedsToDatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorMedsToDates({input}).pipe(
          tapResponse(
            (res) =>{
              console.log('userPriorMedsToDates',res.data.items)
              return this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorMedsToDates: res.data.items,
                errors: res.errors,
                loading: false,
              })},
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

  readonly createPriorMedsToDateEffect = this.effect<UserCreatePriorMedsToDateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorMedsToDateService.createPriorMedsToDate({...input }).pipe(
          tapResponse(
            (priorMedsToDate: PriorMedsToDate) => {
              this.addNewPriorMedsToDate(priorMedsToDate)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorMedsToDate, loading: false, done: true }), 300);
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

    readonly updatePriorMedsToDateEffect = this.effect<UserUpdatePriorMedsToDateInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorMedsToDateService.updatePriorMedsToDate(input, input.id).pipe(
              tapResponse(
                (priorMedsToDate) => {
                  this.updatePriorMedsToDate(priorMedsToDate)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorMedsToDate, loading: false, done: true }), 300);
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
  
    readonly deletePriorMedsToDateEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorMedsToDate]) => {
          return this.data.userDeletePriorMedsToDate({priorMedsToDateId: priorMedsToDate.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorMedsToDateInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorMedsToDateService.importPriorMedsToDates(data).pipe(
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

            this.addPriorMedsToDates(created);
            this.updatePriorMedsToDates(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
