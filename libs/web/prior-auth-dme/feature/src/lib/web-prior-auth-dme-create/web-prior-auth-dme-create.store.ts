
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePriorAuthDmeInput, WebCoreDataAccessService, PriorAuthDme, PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthDmeService } from '@case-clinical/web/prior-auth-dme/shared'

export interface PriorAuthDmeCreateState {
  errors?: any
  loading?: boolean
  item?: PriorAuthDme,
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 durableMedicalEquipments?: DurableMedicalEquipment[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthDmeCreateStore extends ComponentStore<PriorAuthDmeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthDmeService: PriorAuthDmeService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly durableMedicalEquipments$ = this.select((s) => s.durableMedicalEquipments || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.priorAuthorizationRequests$,this.durableMedicalEquipments$,
    (errors, loading, item, priorAuthorizationRequests,durableMedicalEquipments ) => ({
    errors,
    loading,
    item,
priorAuthorizationRequests,durableMedicalEquipments
  }),
{debounce: true})



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


  readonly filterDurableMedicalEquipments = (term) => 
        this.data.userSelectDurableMedicalEquipments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let durableMedicalEquipments = res.data.items;
              this.patchState({durableMedicalEquipments})
              return durableMedicalEquipments
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



  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))


  readonly addDurableMedicalEquipment = this.updater((state, durableMedicalEquipment: DurableMedicalEquipment) => ({
    ...state, durableMedicalEquipments: state.durableMedicalEquipments.concat(durableMedicalEquipment)
  }))

    

  readonly createPriorAuthDmeEffect = this.effect<UserCreatePriorAuthDmeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.priorAuthDmeService.createPriorAuthDme({...input}).pipe(
          tapResponse(
            (priorAuthDme: PriorAuthDme) => {
              this.patchState({ item: priorAuthDme, loading: false })
              return this.router.navigate(['..', priorAuthDme?.id], {relativeTo: this.route})
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
