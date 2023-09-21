
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateDurableMedicalEquipmentInput, WebCoreDataAccessService, DurableMedicalEquipment, Vendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { DurableMedicalEquipmentService } from '@case-clinical/web/durable-medical-equipment/shared'

export interface DurableMedicalEquipmentEditState {
  errors?: any
  loading?: boolean
  item?: DurableMedicalEquipment,
 vendors?: Vendor[]
  searchTerm?: string
}

@Injectable()
export class WebDurableMedicalEquipmentEditStore extends ComponentStore<DurableMedicalEquipmentEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly durableMedicalEquipmentService: DurableMedicalEquipmentService
) {
    super({ loading: false })
    
    this.loadDurableMedicalEquipmentEffect(route.params.pipe(map((route) => route?.durableMedicalEquipmentId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.vendors$,
    (errors, loading, item, vendors ) => ({
    errors,
    loading,
    item,
vendors
  }),
{debounce: true})



  readonly filterVendors = (term) => 
        this.data.userSelectVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendors = res.data.items;
              this.patchState({vendors})
              return vendors
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



  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))

  
  readonly loadDurableMedicalEquipmentEffect = this.effect<string>((durableMedicalEquipmentId$) =>
     durableMedicalEquipmentId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((durableMedicalEquipmentId) =>
        this.data.userDurableMedicalEquipment({durableMedicalEquipmentId}).pipe(
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

  readonly updateDurableMedicalEquipmentEffect = this.effect<UserUpdateDurableMedicalEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.durableMedicalEquipmentService.updateDurableMedicalEquipment(input, item?.id).pipe(
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
