
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateDurableMedicalEquipmentInput, WebCoreDataAccessService, DurableMedicalEquipment, Vendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { DurableMedicalEquipmentService } from '@case-clinical/web/durable-medical-equipment/shared'

export interface DurableMedicalEquipmentCreateState {
  errors?: any
  loading?: boolean
  item?: DurableMedicalEquipment,
 vendors?: Vendor[]
  searchTerm?: string
}

@Injectable()
export class WebDurableMedicalEquipmentCreateStore extends ComponentStore<DurableMedicalEquipmentCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly durableMedicalEquipmentService: DurableMedicalEquipmentService
) {
    super({ loading: false })
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

    

  readonly createDurableMedicalEquipmentEffect = this.effect<UserCreateDurableMedicalEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.durableMedicalEquipmentService.createDurableMedicalEquipment({...input}).pipe(
          tapResponse(
            (durableMedicalEquipment: DurableMedicalEquipment) => {
              this.patchState({ item: durableMedicalEquipment, loading: false })
              return this.router.navigate(['..', durableMedicalEquipment?.id], {relativeTo: this.route})
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
