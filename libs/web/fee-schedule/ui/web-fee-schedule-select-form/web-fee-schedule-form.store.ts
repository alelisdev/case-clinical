
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, FeeSchedule, UserCreateFeeScheduleInput, Organization,Specialty } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface FeeScheduleFormState {
  errors?: any
  loading?: boolean
  item?: FeeSchedule,
 organizations?: Organization[],
 specialties?: Specialty[]
  searchTerm?: string
}

@Injectable()
export class WebFeeScheduleFormStore extends ComponentStore<FeeScheduleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
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



  readonly createFeeScheduleEffect = this.effect<UserCreateFeeScheduleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateFeeSchedule({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )


  readonly addOrganization = this.updater((state, organization: Organization) => ({
    ...state, organizations: state.organizations.concat(organization)
  }))


  readonly addSpecialty = this.updater((state, specialty: Specialty) => ({
    ...state, specialties: state.specialties.concat(specialty)
  }))

}
