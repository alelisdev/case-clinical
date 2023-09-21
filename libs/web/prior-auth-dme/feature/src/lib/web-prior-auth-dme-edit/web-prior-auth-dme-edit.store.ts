
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorAuthDmeInput, WebCoreDataAccessService, PriorAuthDme, PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthDmeService } from '@case-clinical/web/prior-auth-dme/shared'

export interface PriorAuthDmeEditState {
  errors?: any
  loading?: boolean
  item?: PriorAuthDme,
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 durableMedicalEquipments?: DurableMedicalEquipment[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthDmeEditStore extends ComponentStore<PriorAuthDmeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthDmeService: PriorAuthDmeService
) {
    super({ loading: false })
    
    this.loadPriorAuthDmeEffect(route.params.pipe(map((route) => route?.priorAuthDmeId)))
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

  
  readonly loadPriorAuthDmeEffect = this.effect<string>((priorAuthDmeId$) =>
     priorAuthDmeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorAuthDmeId) =>
        this.data.userPriorAuthDme({priorAuthDmeId}).pipe(
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

  readonly updatePriorAuthDmeEffect = this.effect<UserUpdatePriorAuthDmeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.priorAuthDmeService.updatePriorAuthDme(input, item?.id).pipe(
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
