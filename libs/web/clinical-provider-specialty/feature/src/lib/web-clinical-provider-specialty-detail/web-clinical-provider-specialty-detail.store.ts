
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ClinicalProviderSpecialty } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ClinicalProviderSpecialtyDetailState {
  errors ?: any
  loading?: boolean
  item?: ClinicalProviderSpecialty
}

@Injectable()
export class WebClinicalProviderSpecialtyDetailStore extends ComponentStore<ClinicalProviderSpecialtyDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadClinicalProviderSpecialtyEffect(route.params.pipe(pluck('clinicalProviderSpecialtyId')))
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

  readonly loadClinicalProviderSpecialtyEffect = this.effect<string>((clinicalProviderSpecialtyId$) =>
    clinicalProviderSpecialtyId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((clinicalProviderSpecialtyId) =>
        this.data.userClinicalProviderSpecialty({ clinicalProviderSpecialtyId }).pipe(
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

  readonly deleteClinicalProviderSpecialtyEffect = this.effect<ClinicalProviderSpecialty>(
    (clinicalProviderSpecialty$) =>
      clinicalProviderSpecialty$.pipe(
        switchMap((clinicalProviderSpecialty) =>
          this.data
            .userDeleteClinicalProviderSpecialty({
              clinicalProviderSpecialtyId: clinicalProviderSpecialty.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/clinical-provider-specialties'])
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

