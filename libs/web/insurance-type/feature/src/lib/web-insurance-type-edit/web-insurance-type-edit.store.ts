
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateInsuranceTypeInput, WebCoreDataAccessService, InsuranceType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { InsuranceTypeService } from '@case-clinical/web/insurance-type/shared'

export interface InsuranceTypeEditState {
  errors?: any
  loading?: boolean
  item?: InsuranceType,

  searchTerm?: string
}

@Injectable()
export class WebInsuranceTypeEditStore extends ComponentStore<InsuranceTypeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceTypeService: InsuranceTypeService
) {
    super({ loading: false })
    
    this.loadInsuranceTypeEffect(route.params.pipe(map((route) => route?.insuranceTypeId)))
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





  
  readonly loadInsuranceTypeEffect = this.effect<string>((insuranceTypeId$) =>
     insuranceTypeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((insuranceTypeId) =>
        this.data.userInsuranceType({insuranceTypeId}).pipe(
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

  readonly updateInsuranceTypeEffect = this.effect<UserUpdateInsuranceTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.insuranceTypeService.updateInsuranceType(input, item?.id).pipe(
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
