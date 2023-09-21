
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorAuthorizationImplantInput, WebCoreDataAccessService, PriorAuthorizationImplant, Implant,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationImplantService } from '@case-clinical/web/prior-authorization-implant/shared'

export interface PriorAuthorizationImplantEditState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationImplant,
 implants?: Implant[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationImplantEditStore extends ComponentStore<PriorAuthorizationImplantEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationImplantService: PriorAuthorizationImplantService
) {
    super({ loading: false })
    
    this.loadPriorAuthorizationImplantEffect(route.params.pipe(map((route) => route?.priorAuthorizationImplantId)))
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

  
  readonly loadPriorAuthorizationImplantEffect = this.effect<string>((priorAuthorizationImplantId$) =>
     priorAuthorizationImplantId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorAuthorizationImplantId) =>
        this.data.userPriorAuthorizationImplant({priorAuthorizationImplantId}).pipe(
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

  readonly updatePriorAuthorizationImplantEffect = this.effect<UserUpdatePriorAuthorizationImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.priorAuthorizationImplantService.updatePriorAuthorizationImplant(input, item?.id).pipe(
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
