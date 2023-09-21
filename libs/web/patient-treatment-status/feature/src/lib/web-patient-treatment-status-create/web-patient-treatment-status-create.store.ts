
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePatientTreatmentStatusInput, WebCoreDataAccessService, PatientTreatmentStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PatientTreatmentStatusService } from '@case-clinical/web/patient-treatment-status/shared'

export interface PatientTreatmentStatusCreateState {
  errors?: any
  loading?: boolean
  item?: PatientTreatmentStatus,

  searchTerm?: string
}

@Injectable()
export class WebPatientTreatmentStatusCreateStore extends ComponentStore<PatientTreatmentStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly patientTreatmentStatusService: PatientTreatmentStatusService
) {
    super({ loading: false })
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





    

  readonly createPatientTreatmentStatusEffect = this.effect<UserCreatePatientTreatmentStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.patientTreatmentStatusService.createPatientTreatmentStatus({...input}).pipe(
          tapResponse(
            (patientTreatmentStatus: PatientTreatmentStatus) => {
              this.patchState({ item: patientTreatmentStatus, loading: false })
              return this.router.navigate(['..', patientTreatmentStatus?.id], {relativeTo: this.route})
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
