
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, AdverseInsuranceStatus, UserCreateAdverseInsuranceStatusInput,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AdverseInsuranceStatusFormState {
  errors?: any
  loading?: boolean
  item?: AdverseInsuranceStatus,

  searchTerm?: string
}

@Injectable()
export class WebAdverseInsuranceStatusFormStore extends ComponentStore<AdverseInsuranceStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
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





  readonly createAdverseInsuranceStatusEffect = this.effect<UserCreateAdverseInsuranceStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateAdverseInsuranceStatus({ input }).pipe(
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


}
