
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateDiagnosisCodeInput, WebCoreDataAccessService, DiagnosisCode,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { DiagnosisCodeService } from '@case-clinical/web/diagnosis-code/shared'

export interface DiagnosisCodeEditState {
  errors?: any
  loading?: boolean
  item?: DiagnosisCode,

  searchTerm?: string
}

@Injectable()
export class WebDiagnosisCodeEditStore extends ComponentStore<DiagnosisCodeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly diagnosisCodeService: DiagnosisCodeService
) {
    super({ loading: false })
    
    this.loadDiagnosisCodeEffect(route.params.pipe(map((route) => route?.diagnosisCodeId)))
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





  
  readonly loadDiagnosisCodeEffect = this.effect<string>((diagnosisCodeId$) =>
     diagnosisCodeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((diagnosisCodeId) =>
        this.data.userDiagnosisCode({diagnosisCodeId}).pipe(
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

  readonly updateDiagnosisCodeEffect = this.effect<UserUpdateDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.diagnosisCodeService.updateDiagnosisCode(input, item?.id).pipe(
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
