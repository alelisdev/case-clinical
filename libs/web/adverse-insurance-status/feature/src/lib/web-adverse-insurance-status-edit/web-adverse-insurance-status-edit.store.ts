
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateAdverseInsuranceStatusInput, WebCoreDataAccessService, AdverseInsuranceStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AdverseInsuranceStatusService } from '@case-clinical/web/adverse-insurance-status/shared'

export interface AdverseInsuranceStatusEditState {
  errors?: any
  loading?: boolean
  item?: AdverseInsuranceStatus,

  searchTerm?: string
}

@Injectable()
export class WebAdverseInsuranceStatusEditStore extends ComponentStore<AdverseInsuranceStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly adverseInsuranceStatusService: AdverseInsuranceStatusService
) {
    super({ loading: false })
    
    this.loadAdverseInsuranceStatusEffect(route.params.pipe(map((route) => route?.adverseInsuranceStatusId)))
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





  
  readonly loadAdverseInsuranceStatusEffect = this.effect<string>((adverseInsuranceStatusId$) =>
     adverseInsuranceStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((adverseInsuranceStatusId) =>
        this.data.userAdverseInsuranceStatus({adverseInsuranceStatusId}).pipe(
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

  readonly updateAdverseInsuranceStatusEffect = this.effect<UserUpdateAdverseInsuranceStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.adverseInsuranceStatusService.updateAdverseInsuranceStatus(input, item?.id).pipe(
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
