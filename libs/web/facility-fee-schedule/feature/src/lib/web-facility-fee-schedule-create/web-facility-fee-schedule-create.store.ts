
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateFacilityFeeScheduleInput, WebCoreDataAccessService, FacilityFeeSchedule, Organization,Specialty } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { FacilityFeeScheduleService } from '@case-clinical/web/facility-fee-schedule/shared'

export interface FacilityFeeScheduleCreateState {
  errors?: any
  loading?: boolean
  item?: FacilityFeeSchedule,
 organizations?: Organization[],
 specialties?: Specialty[]
  searchTerm?: string
}

@Injectable()
export class WebFacilityFeeScheduleCreateStore extends ComponentStore<FacilityFeeScheduleCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly facilityFeeScheduleService: FacilityFeeScheduleService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly organizations$ = this.select((s) => s.organizations || [])
  readonly specialties$ = this.select((s) => s.specialties || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.organizations$,this.specialties$,
    (errors, loading, item, organizations,specialties ) => ({
    errors,
    loading,
    item,
organizations,specialties
  }),
{debounce: true})



  readonly filterOrganizations = (term) => 
        this.data.userSelectOrganizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let organizations = res.data.items;
              this.patchState({organizations})
              return organizations
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterSpecialties = (term) => 
        this.data.userSelectSpecialties({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let specialties = res.data.items;
              this.patchState({specialties})
              return specialties
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addOrganization = this.updater((state, organization: Organization) => ({
    ...state, organizations: state.organizations.concat(organization)
  }))


  readonly addSpecialty = this.updater((state, specialty: Specialty) => ({
    ...state, specialties: state.specialties.concat(specialty)
  }))

    

  readonly createFacilityFeeScheduleEffect = this.effect<UserCreateFacilityFeeScheduleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.facilityFeeScheduleService.createFacilityFeeSchedule({...input}).pipe(
          tapResponse(
            (facilityFeeSchedule: FacilityFeeSchedule) => {
              this.patchState({ item: facilityFeeSchedule, loading: false })
              return this.router.navigate(['..', facilityFeeSchedule?.id], {relativeTo: this.route})
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
