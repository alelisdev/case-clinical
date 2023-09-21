
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, DurableMedicalEquipment, UserCreateDurableMedicalEquipmentInput, Vendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface DurableMedicalEquipmentFormState {
  errors?: any
  loading?: boolean
  item?: DurableMedicalEquipment,
 vendors?: Vendor[]
  searchTerm?: string
}

@Injectable()
export class WebDurableMedicalEquipmentFormStore extends ComponentStore<DurableMedicalEquipmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
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
        this.data.userVendors({input: { name: term}}).pipe(
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



  readonly createDurableMedicalEquipmentEffect = this.effect<UserCreateDurableMedicalEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateDurableMedicalEquipment({ input }).pipe(
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


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))

}
