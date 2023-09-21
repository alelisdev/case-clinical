
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthDme, UserCreatePriorAuthDmeInput, PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthDmeFormState {
  errors?: any
  loading?: boolean
  item?: PriorAuthDme,
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 durableMedicalequipments?: DurableMedicalEquipment[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthDmeFormStore extends ComponentStore<PriorAuthDmeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly durableMedicalequipments$ = this.select((s) => s.durableMedicalequipments || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.priorAuthorizationRequests$,this.durableMedicalequipments$,
    (errors, loading, item, priorAuthorizationRequests,durableMedicalequipments ) => ({
    errors,
    loading,
    item,
priorAuthorizationRequests,durableMedicalequipments
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


  readonly filterDurableMedicalequipments = (term) => 
        this.data.userSelectDurableMedicalequipments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let durableMedicalequipments = res.data.items;
              this.patchState({durableMedicalequipments})
              return durableMedicalequipments
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



  readonly createPriorAuthDmeEffect = this.effect<UserCreatePriorAuthDmeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorAuthDme({ input }).pipe(
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


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))


  readonly addDurableMedicalEquipment = this.updater((state, durableMedicalEquipment: DurableMedicalEquipment) => ({
    ...state, durableMedicalequipments: state.durableMedicalequipments.concat(durableMedicalEquipment)
  }))

}
