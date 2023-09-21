
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateVendorInput, WebCoreDataAccessService, Vendor, VendorType } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { VendorService } from '@case-clinical/web/vendor/shared'

export interface VendorCreateState {
  errors?: any
  loading?: boolean
  item?: Vendor,
 vendorTypes?: VendorType[]
  searchTerm?: string
}

@Injectable()
export class WebVendorCreateStore extends ComponentStore<VendorCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly vendorService: VendorService
) {
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



  readonly addVendorType = this.updater((state, vendorType: VendorType) => ({
    ...state, vendorTypes: state.vendorTypes.concat(vendorType)
  }))

    

  readonly createVendorEffect = this.effect<UserCreateVendorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.vendorService.createVendor({...input}).pipe(
          tapResponse(
            (vendor: Vendor) => {
              this.patchState({ item: vendor, loading: false })
              return this.router.navigate(['..', vendor?.id], {relativeTo: this.route})
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
