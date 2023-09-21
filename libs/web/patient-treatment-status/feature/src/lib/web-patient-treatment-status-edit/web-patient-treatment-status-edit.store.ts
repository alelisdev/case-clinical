
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePatientTreatmentStatusInput, WebCoreDataAccessService, PatientTreatmentStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PatientTreatmentStatusService } from '@case-clinical/web/patient-treatment-status/shared'

export interface PatientTreatmentStatusEditState {
  errors?: any
  loading?: boolean
  item?: PatientTreatmentStatus,

  searchTerm?: string
}

@Injectable()
export class WebPatientTreatmentStatusEditStore extends ComponentStore<PatientTreatmentStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly patientTreatmentStatusService: PatientTreatmentStatusService
) {
    super({ loading: false })
    
    this.loadPatientTreatmentStatusEffect(route.params.pipe(map((route) => route?.patientTreatmentStatusId)))
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





  
  readonly loadPatientTreatmentStatusEffect = this.effect<string>((patientTreatmentStatusId$) =>
     patientTreatmentStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((patientTreatmentStatusId) =>
        this.data.userPatientTreatmentStatus({patientTreatmentStatusId}).pipe(
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

  readonly updatePatientTreatmentStatusEffect = this.effect<UserUpdatePatientTreatmentStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.patientTreatmentStatusService.updatePatientTreatmentStatus(input, item?.id).pipe(
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
