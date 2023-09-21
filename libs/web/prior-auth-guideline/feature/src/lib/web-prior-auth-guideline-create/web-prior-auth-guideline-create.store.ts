
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePriorAuthGuidelineInput, WebCoreDataAccessService, PriorAuthGuideline, Guideline,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthGuidelineService } from '@case-clinical/web/prior-auth-guideline/shared'

export interface PriorAuthGuidelineCreateState {
  errors?: any
  loading?: boolean
  item?: PriorAuthGuideline,
 guidelines?: Guideline[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthGuidelineCreateStore extends ComponentStore<PriorAuthGuidelineCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthGuidelineService: PriorAuthGuidelineService
) {
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



  readonly addGuideline = this.updater((state, guideline: Guideline) => ({
    ...state, guidelines: state.guidelines.concat(guideline)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly createPriorAuthGuidelineEffect = this.effect<UserCreatePriorAuthGuidelineInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.priorAuthGuidelineService.createPriorAuthGuideline({...input}).pipe(
          tapResponse(
            (priorAuthGuideline: PriorAuthGuideline) => {
              this.patchState({ item: priorAuthGuideline, loading: false })
              return this.router.navigate(['..', priorAuthGuideline?.id], {relativeTo: this.route})
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
