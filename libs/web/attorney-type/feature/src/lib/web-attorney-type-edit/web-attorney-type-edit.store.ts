
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateAttorneyTypeInput, WebCoreDataAccessService, AttorneyType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AttorneyTypeService } from '@case-clinical/web/attorney-type/shared'

export interface AttorneyTypeEditState {
  errors?: any
  loading?: boolean
  item?: AttorneyType,

  searchTerm?: string
}

@Injectable()
export class WebAttorneyTypeEditStore extends ComponentStore<AttorneyTypeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyTypeService: AttorneyTypeService
) {
    super({ loading: false })
    
    this.loadAttorneyTypeEffect(route.params.pipe(map((route) => route?.attorneyTypeId)))
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





  
  readonly loadAttorneyTypeEffect = this.effect<string>((attorneyTypeId$) =>
     attorneyTypeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((attorneyTypeId) =>
        this.data.userAttorneyType({attorneyTypeId}).pipe(
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

  readonly updateAttorneyTypeEffect = this.effect<UserUpdateAttorneyTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.attorneyTypeService.updateAttorneyType(input, item?.id).pipe(
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
