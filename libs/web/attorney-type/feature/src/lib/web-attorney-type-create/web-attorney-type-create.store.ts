
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAttorneyTypeInput, WebCoreDataAccessService, AttorneyType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AttorneyTypeService } from '@case-clinical/web/attorney-type/shared'

export interface AttorneyTypeCreateState {
  errors?: any
  loading?: boolean
  item?: AttorneyType,

  searchTerm?: string
}

@Injectable()
export class WebAttorneyTypeCreateStore extends ComponentStore<AttorneyTypeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyTypeService: AttorneyTypeService
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





    

  readonly createAttorneyTypeEffect = this.effect<UserCreateAttorneyTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.attorneyTypeService.createAttorneyType({...input}).pipe(
          tapResponse(
            (attorneyType: AttorneyType) => {
              this.patchState({ item: attorneyType, loading: false })
              return this.router.navigate(['..', attorneyType?.id], {relativeTo: this.route})
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
