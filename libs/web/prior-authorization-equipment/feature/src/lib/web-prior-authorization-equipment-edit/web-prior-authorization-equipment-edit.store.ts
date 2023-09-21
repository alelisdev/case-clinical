
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorAuthorizationEquipmentInput, WebCoreDataAccessService, PriorAuthorizationEquipment, Equipment,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationEquipmentService } from '@case-clinical/web/prior-authorization-equipment/shared'

export interface PriorAuthorizationEquipmentEditState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationEquipment,
 equipments?: Equipment[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationEquipmentEditStore extends ComponentStore<PriorAuthorizationEquipmentEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationEquipmentService: PriorAuthorizationEquipmentService
) {
    super({ loading: false })
    
    this.loadPriorAuthorizationEquipmentEffect(route.params.pipe(map((route) => route?.priorAuthorizationEquipmentId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly equipments$ = this.select((s) => s.equipments || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.equipments$,this.priorAuthorizationRequests$,
    (errors, loading, item, equipments,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
equipments,priorAuthorizationRequests
  }),
{debounce: true})



  readonly filterEquipments = (term) => 
        this.data.userSelectEquipments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let equipments = res.data.items;
              this.patchState({equipments})
              return equipments
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



  readonly addEquipment = this.updater((state, equipment: Equipment) => ({
    ...state, equipments: state.equipments.concat(equipment)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

  
  readonly loadPriorAuthorizationEquipmentEffect = this.effect<string>((priorAuthorizationEquipmentId$) =>
     priorAuthorizationEquipmentId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorAuthorizationEquipmentId) =>
        this.data.userPriorAuthorizationEquipment({priorAuthorizationEquipmentId}).pipe(
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

  readonly updatePriorAuthorizationEquipmentEffect = this.effect<UserUpdatePriorAuthorizationEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.priorAuthorizationEquipmentService.updatePriorAuthorizationEquipment(input, item?.id).pipe(
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
