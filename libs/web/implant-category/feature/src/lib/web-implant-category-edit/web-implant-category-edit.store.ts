
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateImplantCategoryInput, WebCoreDataAccessService, ImplantCategory,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ImplantCategoryService } from '@case-clinical/web/implant-category/shared'

export interface ImplantCategoryEditState {
  errors?: any
  loading?: boolean
  item?: ImplantCategory,

  searchTerm?: string
}

@Injectable()
export class WebImplantCategoryEditStore extends ComponentStore<ImplantCategoryEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly implantCategoryService: ImplantCategoryService
) {
    super({ loading: false })
    
    this.loadImplantCategoryEffect(route.params.pipe(map((route) => route?.implantCategoryId)))
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





  
  readonly loadImplantCategoryEffect = this.effect<string>((implantCategoryId$) =>
     implantCategoryId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((implantCategoryId) =>
        this.data.userImplantCategory({implantCategoryId}).pipe(
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

  readonly updateImplantCategoryEffect = this.effect<UserUpdateImplantCategoryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.implantCategoryService.updateImplantCategory(input, item?.id).pipe(
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
