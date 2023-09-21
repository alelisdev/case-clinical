
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateSurgicalPositionInput, WebCoreDataAccessService, SurgicalPosition,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { SurgicalPositionService } from '@case-clinical/web/surgical-position/shared'

export interface SurgicalPositionEditState {
  errors?: any
  loading?: boolean
  item?: SurgicalPosition,

  searchTerm?: string
}

@Injectable()
export class WebSurgicalPositionEditStore extends ComponentStore<SurgicalPositionEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly surgicalPositionService: SurgicalPositionService
) {
    super({ loading: false })
    
    this.loadSurgicalPositionEffect(route.params.pipe(map((route) => route?.surgicalPositionId)))
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





  
  readonly loadSurgicalPositionEffect = this.effect<string>((surgicalPositionId$) =>
     surgicalPositionId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((surgicalPositionId) =>
        this.data.userSurgicalPosition({surgicalPositionId}).pipe(
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

  readonly updateSurgicalPositionEffect = this.effect<UserUpdateSurgicalPositionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.surgicalPositionService.updateSurgicalPosition(input, item?.id).pipe(
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
