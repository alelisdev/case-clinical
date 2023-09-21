
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Prescription } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PrescriptionDetailState {
  errors ?: any
  loading?: boolean
  item?: Prescription
}

@Injectable()
export class WebPrescriptionDetailStore extends ComponentStore<PrescriptionDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPrescriptionEffect(route.params.pipe(pluck('prescriptionId')))
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
{ label: 'Medical Provider', value: item?.medicalProvider },
{ label: 'Date Written', value: item?.dateWritten },
{ label: 'Days', value: item?.days },
{ label: 'Note', value: item?.note },
{ label: 'Category', value: item?.category },
{ label: 'Kind', value: item?.kind },
{ label: 'Quantity', value: item?.quantity },
{ label: 'Refills', value: item?.refills },
{ label: 'Rx Number', value: item?.rxNumber },
{ label: 'Sig', value: item?.sig },
{ label: 'Strength', value: item?.strength },
{ label: 'Unit', value: item?.unit },


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

  readonly loadPrescriptionEffect = this.effect<string>((prescriptionId$) =>
    prescriptionId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((prescriptionId) =>
        this.data.userPrescription({ prescriptionId }).pipe(
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

  readonly deletePrescriptionEffect = this.effect<Prescription>(
    (prescription$) =>
      prescription$.pipe(
        switchMap((prescription) =>
          this.data
            .userDeletePrescription({
              prescriptionId: prescription.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/prescriptions'])
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

