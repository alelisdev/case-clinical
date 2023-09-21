
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContractedRateKindInput, WebCoreDataAccessService, ContractedRateKind,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractedRateKindService } from '@case-clinical/web/contracted-rate-kind/shared'

export interface ContractedRateKindEditState {
  errors?: any
  loading?: boolean
  item?: ContractedRateKind,

  searchTerm?: string
}

@Injectable()
export class WebContractedRateKindEditStore extends ComponentStore<ContractedRateKindEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractedRateKindService: ContractedRateKindService
) {
    super({ loading: false })
    
    this.loadContractedRateKindEffect(route.params.pipe(map((route) => route?.contractedRateKindId)))
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





  
  readonly loadContractedRateKindEffect = this.effect<string>((contractedRateKindId$) =>
     contractedRateKindId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contractedRateKindId) =>
        this.data.userContractedRateKind({contractedRateKindId}).pipe(
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

  readonly updateContractedRateKindEffect = this.effect<UserUpdateContractedRateKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.contractedRateKindService.updateContractedRateKind(input, item?.id).pipe(
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
