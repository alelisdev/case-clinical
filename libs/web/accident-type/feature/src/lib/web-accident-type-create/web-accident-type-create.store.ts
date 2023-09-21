
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAccidentTypeInput, WebCoreDataAccessService, AccidentType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AccidentTypeService } from '@case-clinical/web/accident-type/shared'

export interface AccidentTypeCreateState {
  errors?: any
  loading?: boolean
  item?: AccidentType,

  searchTerm?: string
}

@Injectable()
export class WebAccidentTypeCreateStore extends ComponentStore<AccidentTypeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly accidentTypeService: AccidentTypeService
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





    

  readonly createAccidentTypeEffect = this.effect<UserCreateAccidentTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.accidentTypeService.createAccidentType({...input}).pipe(
          tapResponse(
            (accidentType: AccidentType) => {
              this.patchState({ item: accidentType, loading: false })
              return this.router.navigate(['..', accidentType?.id], {relativeTo: this.route})
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
