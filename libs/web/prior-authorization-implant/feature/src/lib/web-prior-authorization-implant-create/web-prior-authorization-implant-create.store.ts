
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePriorAuthorizationImplantInput, WebCoreDataAccessService, PriorAuthorizationImplant, Implant,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationImplantService } from '@case-clinical/web/prior-authorization-implant/shared'

export interface PriorAuthorizationImplantCreateState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationImplant,
 implants?: Implant[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationImplantCreateStore extends ComponentStore<PriorAuthorizationImplantCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationImplantService: PriorAuthorizationImplantService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly implants$ = this.select((s) => s.implants || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.implants$,this.priorAuthorizationRequests$,
    (errors, loading, item, implants,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
implants,priorAuthorizationRequests
  }),
{debounce: true})



  readonly filterImplants = (term) => 
        this.data.userSelectImplants({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let implants = res.data.items;
              this.patchState({implants})
              return implants
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



  readonly addImplant = this.updater((state, implant: Implant) => ({
    ...state, implants: state.implants.concat(implant)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly createPriorAuthorizationImplantEffect = this.effect<UserCreatePriorAuthorizationImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.priorAuthorizationImplantService.createPriorAuthorizationImplant({...input}).pipe(
          tapResponse(
            (priorAuthorizationImplant: PriorAuthorizationImplant) => {
              this.patchState({ item: priorAuthorizationImplant, loading: false })
              return this.router.navigate(['..', priorAuthorizationImplant?.id], {relativeTo: this.route})
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
