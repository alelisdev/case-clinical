
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAgreementTypeInput, WebCoreDataAccessService, AgreementType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AgreementTypeService } from '@case-clinical/web/agreement-type/shared'

export interface AgreementTypeCreateState {
  errors?: any
  loading?: boolean
  item?: AgreementType,

  searchTerm?: string
}

@Injectable()
export class WebAgreementTypeCreateStore extends ComponentStore<AgreementTypeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly agreementTypeService: AgreementTypeService
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





    

  readonly createAgreementTypeEffect = this.effect<UserCreateAgreementTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.agreementTypeService.createAgreementType({...input}).pipe(
          tapResponse(
            (agreementType: AgreementType) => {
              this.patchState({ item: agreementType, loading: false })
              return this.router.navigate(['..', agreementType?.id], {relativeTo: this.route})
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
