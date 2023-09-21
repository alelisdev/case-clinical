
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthDme, UserCreatePriorAuthDmeInput, PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthDmeFormState {
  errors?: any
  loading?: boolean
  item?: PriorAuthDme,
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 durableMedicalEquipments?: DurableMedicalEquipment[]
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
    ...state, durableMedicalEquipments: state.durableMedicalEquipments.concat(durableMedicalEquipment)
  }))

}
