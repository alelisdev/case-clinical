
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateFacilityFeeScheduleInput, WebCoreDataAccessService, FacilityFeeSchedule, Organization,Specialty } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { FacilityFeeScheduleService } from '@case-clinical/web/facility-fee-schedule/shared'

export interface FacilityFeeScheduleEditState {
  errors?: any
  loading?: boolean
  item?: FacilityFeeSchedule,
 organizations?: Organization[],
 specialties?: Specialty[]
  searchTerm?: string
}

@Injectable()
export class WebFacilityFeeScheduleEditStore extends ComponentStore<FacilityFeeScheduleEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly facilityFeeScheduleService: FacilityFeeScheduleService
) {
    super({ loading: false })
    
    this.loadFacilityFeeScheduleEffect(route.params.pipe(map((route) => route?.facilityFeeScheduleId)))
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

  
  readonly loadFacilityFeeScheduleEffect = this.effect<string>((facilityFeeScheduleId$) =>
     facilityFeeScheduleId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((facilityFeeScheduleId) =>
        this.data.userFacilityFeeSchedule({facilityFeeScheduleId}).pipe(
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

  readonly updateFacilityFeeScheduleEffect = this.effect<UserUpdateFacilityFeeScheduleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.facilityFeeScheduleService.updateFacilityFeeSchedule(input, item?.id).pipe(
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
