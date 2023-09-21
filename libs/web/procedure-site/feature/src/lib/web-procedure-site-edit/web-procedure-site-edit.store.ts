
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateProcedureSiteInput, WebCoreDataAccessService, ProcedureSite,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ProcedureSiteService } from '@case-clinical/web/procedure-site/shared'

export interface ProcedureSiteEditState {
  errors?: any
  loading?: boolean
  item?: ProcedureSite,

  searchTerm?: string
}

@Injectable()
export class WebProcedureSiteEditStore extends ComponentStore<ProcedureSiteEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureSiteService: ProcedureSiteService
) {
    super({ loading: false })
    
    this.loadProcedureSiteEffect(route.params.pipe(map((route) => route?.procedureSiteId)))
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





  
  readonly loadProcedureSiteEffect = this.effect<string>((procedureSiteId$) =>
     procedureSiteId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((procedureSiteId) =>
        this.data.userProcedureSite({procedureSiteId}).pipe(
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

  readonly updateProcedureSiteEffect = this.effect<UserUpdateProcedureSiteInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.procedureSiteService.updateProcedureSite(input, item?.id).pipe(
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
