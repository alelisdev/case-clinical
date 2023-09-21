
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthorizationEquipment, UserCreatePriorAuthorizationEquipmentInput, Equipment,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationEquipmentFormState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationEquipment,
 equipment?: Equipment[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationEquipmentFormStore extends ComponentStore<PriorAuthorizationEquipmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly equipment$ = this.select((s) => s.equipment || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.equipment$,this.priorAuthorizationRequests$,
    (errors, loading, item, equipment,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
equipment,priorAuthorizationRequests
  }),
{debounce: true})



  readonly filterEquipment = (term) => 
        this.data.userSelectEquipments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let equipment = res.data.items;
              this.patchState({equipment})
              return equipment
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



  readonly createPriorAuthorizationEquipmentEffect = this.effect<UserCreatePriorAuthorizationEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorAuthorizationEquipment({ input }).pipe(
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


  readonly addEquipment = this.updater((state, equipment: Equipment) => ({
    ...state, equipment: state.equipment.concat(equipment)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

}
