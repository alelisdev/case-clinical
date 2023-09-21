
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateWriteOffStatusInput, WebCoreDataAccessService, WriteOffStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { WriteOffStatusService } from '@case-clinical/web/write-off-status/shared'

export interface WriteOffStatusEditState {
  errors?: any
  loading?: boolean
  item?: WriteOffStatus,

  searchTerm?: string
}

@Injectable()
export class WebWriteOffStatusEditStore extends ComponentStore<WriteOffStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly writeOffStatusService: WriteOffStatusService
) {
    super({ loading: false })
    
    this.loadWriteOffStatusEffect(route.params.pipe(map((route) => route?.writeOffStatusId)))
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





  
  readonly loadWriteOffStatusEffect = this.effect<string>((writeOffStatusId$) =>
     writeOffStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((writeOffStatusId) =>
        this.data.userWriteOffStatus({writeOffStatusId}).pipe(
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

  readonly updateWriteOffStatusEffect = this.effect<UserUpdateWriteOffStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.writeOffStatusService.updateWriteOffStatus(input, item?.id).pipe(
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
