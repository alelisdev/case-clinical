
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateTemplateInput, WebCoreDataAccessService, Template,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { TemplateService } from '../template.service'

export interface TemplateCreateState {
  errors?: any
  loading?: boolean
  item?: Template,

  searchTerm?: string
}

@Injectable()
export class WebTemplateCreateStore extends ComponentStore<TemplateCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly templateService: TemplateService
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





    

  readonly createTemplateEffect = this.effect<UserCreateTemplateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.templateService.createTemplate({...input}).pipe(
          tapResponse(
            (template: Template) => {
              this.patchState({ item: template, loading: false })
              return this.router.navigate(['..', template?.id], {relativeTo: this.route})
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
