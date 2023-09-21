
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthGuideline, UserCreatePriorAuthGuidelineInput, Guideline,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthGuidelineFormState {
  errors?: any
  loading?: boolean
  item?: PriorAuthGuideline,
 guidelines?: Guideline[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthGuidelineFormStore extends ComponentStore<PriorAuthGuidelineFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly guidelines$ = this.select((s) => s.guidelines || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.guidelines$,this.priorAuthorizationRequests$,
    (errors, loading, item, guidelines,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
guidelines,priorAuthorizationRequests
  }),
{debounce: true})



  readonly filterGuidelines = (term) => 
        this.data.userSelectGuidelines({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let guidelines = res.data.items;
              this.patchState({guidelines})
              return guidelines
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


  readonly filterPriorAuthorizationRequests = (term) => 
        this.data.userSelectPriorAuthorizationRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorAuthorizationRequests = res.data.items;
              this.patchState({priorAuthorizationRequests})
              return priorAuthorizationRequests
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



  readonly createPriorAuthGuidelineEffect = this.effect<UserCreatePriorAuthGuidelineInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorAuthGuideline({ input }).pipe(
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


  readonly addGuideline = this.updater((state, guideline: Guideline) => ({
    ...state, guidelines: state.guidelines.concat(guideline)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

}
