
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePlaceOfServiceInput, WebCoreDataAccessService, PlaceOfService,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PlaceOfServiceService } from '@case-clinical/web/place-of-service/shared'

export interface PlaceOfServiceCreateState {
  errors?: any
  loading?: boolean
  item?: PlaceOfService,

  searchTerm?: string
}

@Injectable()
export class WebPlaceOfServiceCreateStore extends ComponentStore<PlaceOfServiceCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly placeOfServiceService: PlaceOfServiceService
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





    

  readonly createPlaceOfServiceEffect = this.effect<UserCreatePlaceOfServiceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.placeOfServiceService.createPlaceOfService({...input}).pipe(
          tapResponse(
            (placeOfService: PlaceOfService) => {
              this.patchState({ item: placeOfService, loading: false })
              return this.router.navigate(['..', placeOfService?.id], {relativeTo: this.route})
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
