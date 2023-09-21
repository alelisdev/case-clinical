
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateVendorInput, WebCoreDataAccessService, Vendor, VendorType } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { VendorService } from '@case-clinical/web/vendor/shared'

export interface VendorEditState {
  errors?: any
  loading?: boolean
  item?: Vendor,
 vendorTypes?: VendorType[]
  searchTerm?: string
}

@Injectable()
export class WebVendorEditStore extends ComponentStore<VendorEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly vendorService: VendorService
) {
    super({ loading: false })
    
    this.loadVendorEffect(route.params.pipe(map((route) => route?.vendorId)))
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

  
  readonly loadVendorEffect = this.effect<string>((vendorId$) =>
     vendorId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((vendorId) =>
        this.data.userVendor({vendorId}).pipe(
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

  readonly updateVendorEffect = this.effect<UserUpdateVendorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.vendorService.updateVendor(input, item?.id).pipe(
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
