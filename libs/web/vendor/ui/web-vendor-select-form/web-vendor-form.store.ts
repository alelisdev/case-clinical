
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Vendor, UserCreateVendorInput, VendorType } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface VendorFormState {
  errors?: any
  loading?: boolean
  item?: Vendor,
 vendorTypes?: VendorType[]
  searchTerm?: string
}

@Injectable()
export class WebVendorFormStore extends ComponentStore<VendorFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly vendorTypes$ = this.select((s) => s.vendorTypes || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.vendorTypes$,
    (errors, loading, item, vendorTypes ) => ({
    errors,
    loading,
    item,
vendorTypes
  }),
{debounce: true})



  readonly filterVendorTypes = (term) => 
        this.data.userSelectVendorTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendorTypes = res.data.items;
              this.patchState({vendorTypes})
              return vendorTypes
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



  readonly createVendorEffect = this.effect<UserCreateVendorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateVendor({ input }).pipe(
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


  readonly addVendorType = this.updater((state, vendorType: VendorType) => ({
    ...state, vendorTypes: state.vendorTypes.concat(vendorType)
  }))

}
