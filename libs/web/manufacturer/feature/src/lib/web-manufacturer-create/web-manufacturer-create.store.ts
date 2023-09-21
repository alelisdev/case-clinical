
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateManufacturerInput, WebCoreDataAccessService, Manufacturer,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ManufacturerService } from '@case-clinical/web/manufacturer/shared'

export interface ManufacturerCreateState {
  errors?: any
  loading?: boolean
  item?: Manufacturer,

  searchTerm?: string
}

@Injectable()
export class WebManufacturerCreateStore extends ComponentStore<ManufacturerCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly manufacturerService: ManufacturerService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

  }),
{debounce: true})





    

  readonly createManufacturerEffect = this.effect<UserCreateManufacturerInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.manufacturerService.createManufacturer({...input}).pipe(
          tapResponse(
            (manufacturer: Manufacturer) => {
              this.patchState({ item: manufacturer, loading: false })
              return this.router.navigate(['..', manufacturer?.id], {relativeTo: this.route})
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
