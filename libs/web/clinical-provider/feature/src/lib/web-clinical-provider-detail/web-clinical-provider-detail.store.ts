
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ClinicalProvider } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ClinicalProviderDetailState {
  errors ?: any
  loading?: boolean
  item?: ClinicalProvider
}

@Injectable()
export class WebClinicalProviderDetailStore extends ComponentStore<ClinicalProviderDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadClinicalProviderEffect(route.params.pipe(pluck('clinicalProviderId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },


{ label: 'Npi', value: item?.npi },
{ label: 'Honorific', value: item?.honorific },
{ label: 'First Name', value: item?.firstName },
{ label: 'Last Name', value: item?.lastName },
{ label: 'Suffix', value: item?.suffix },
{ label: 'Phone Number', value: item?.phoneNumber },
{ label: 'Email Address', value: item?.emailAddress },


{ label: 'Clinical Provider Tags', value: item?.clinicalProviderTags },
{ label: 'Clinical Provider Locations', value: item?.clinicalProviderLocations },
{ label: 'Clinical Provider Specialties', value: item?.clinicalProviderSpecialties },
{ label: 'Pch Providers', value: item?.pchProviders },
{ label: 'Favorite Providers', value: item?.favoriteProviders },
{ label: 'Medical Records', value: item?.medicalRecords },
{ label: 'Appointments', value: item?.appointments },
{ label: 'Medical Condition Providers', value: item?.medicalConditionProviders },
{ label: 'User', value: item?.user },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadClinicalProviderEffect = this.effect<string>((clinicalProviderId$) =>
    clinicalProviderId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((clinicalProviderId) =>
        this.data.userClinicalProvider({ clinicalProviderId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly deleteClinicalProviderEffect = this.effect<ClinicalProvider>(
    (clinicalProvider$) =>
      clinicalProvider$.pipe(
        switchMap((clinicalProvider) =>
          this.data
            .userDeleteClinicalProvider({
              clinicalProviderId: clinicalProvider.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/clinical-providers'])
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
}

