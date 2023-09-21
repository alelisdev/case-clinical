
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorMedsToDateInput, WebCoreDataAccessService, PriorMedsToDate, LegalCase,PriorMedsToDateStatus, Specialty, VisitKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorMedsToDateService } from '@case-clinical/web/prior-meds-to-date/shared'

export interface PriorMedsToDateEditState {
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
export class WebPriorMedsToDateEditStore extends ComponentStore<PriorMedsToDateEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorMedsToDateService: PriorMedsToDateService
) {
    super({ loading: false })
    
    this.loadPriorMedsToDateEffect(route.params.pipe(map((route) => route?.priorMedsToDateId)))
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
legalCases,priorMedsToDateStatuses,specialties,visitKinds
  }),
{debounce: true})



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

  
  readonly loadPriorMedsToDateEffect = this.effect<string>((priorMedsToDateId$) =>
     priorMedsToDateId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorMedsToDateId) =>
        this.data.userPriorMedsToDate({priorMedsToDateId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
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
         this.priorMedsToDateService.updatePriorMedsToDate(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
