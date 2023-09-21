
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorMedsToDate, UserCreatePriorMedsToDateInput, LegalCase,PriorMedsToDateStatus, Specialty, VisitKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorMedsToDateFormState {
  errors?: any
  loading?: boolean
  item?: PriorMedsToDate,
 legalCases?: LegalCase[],
 priorMedsToDateStatuses?: PriorMedsToDateStatus[],
 specialties?: Specialty[],
 visitKinds?: VisitKind[],
 
  searchTerm?: string
}

@Injectable()
export class WebPriorMedsToDateFormStore extends ComponentStore<PriorMedsToDateFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly priorMedsToDateStatuses$ = this.select((s) => s.priorMedsToDateStatuses || [])
  readonly specialties$ = this.select((s) => s.specialties || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.legalCases$,this.priorMedsToDateStatuses$,this.specialties$,this.visitKinds$,
    (errors, loading, item, legalCases,priorMedsToDateStatuses,specialties,visitKinds ) => ({
    errors,
    loading,
    item,
legalCases,priorMedsToDateStatuses
,specialties,visitKinds
  }),
{debounce: true})



  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
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
  this.data.userSpecialties({input: { name: term}}).pipe(
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
        this.data.userVisitKinds({input: { name: term}}).pipe(
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


  readonly createPriorMedsToDateEffect = this.effect<UserCreatePriorMedsToDateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorMedsToDate({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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

}
