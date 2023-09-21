import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { BillingInfo, Plan } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { SettingsService } from '../business-logic/settings.service';
import { switchMap, tap } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

const countries = [
  {
    code: 'US',
    name: 'United States'
  },
  {
    code: 'CA',
    name: 'Canada'
  },
  {
    code: 'MX',
    name: 'Mexico'
  },
  {
    code: 'FR',
    name: 'France'
  },
  {
    code: 'DE',
    name: 'Germany'
  },
  {
    code: 'IT',
    name: 'Italy'
  },
]

export interface PlanBillingState {
  selectedPlanId?: string
  billingInfo?: any
  plans: Plan[],
  loading: boolean,
  countries: any[]
}

@Injectable()
export class PlanBillingStore extends ComponentStore<PlanBillingState> {
  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      plans: [],
      loading: false,
      countries: countries
    })
  }

  loading$ = this.select(s => s.loading)
  plans$ = this.select(s => s.plans)
  selectedPlanId$ = this.select(s => s.selectedPlanId)
  billingInfo$ = this.select(s => s.billingInfo)
  countries$ = this.select(s => s.countries)

  vm$ = this.select(
    this.loading$,
    this.countries$,
    this.plans$,
    this.selectedPlanId$,
    this.billingInfo$,
    (
      loading,
      countries,
      plans,
      selectedPlanId,
      billingInfo
    ) => ({
      loading,
      countries,
      plans,
      selectedPlanId,
      billingInfo
    })
  )

  selectPlan = this.updater((state, planId: string) => ({ ...state, selectedPlanId: planId }))

  updateCardInfoEffect = this.effect<any>(input$ => input$.pipe(
    tap((input) => {
      this.loading.show();
    }),
    switchMap((input) => this.service.updateBillingInfo(input).pipe(
      tapResponse(billingInfo => {
        this.toast.success('Successfully updated billing information', { duration: 3000 })
        this.loading.hide()
      }, (error: any) => {
        this.loading.hide()
        this.toast.error(error.Message, { duration: 3000 })
      })
    ))
  ))

  createCardInfoEffect = this.effect<any>(input$ => input$.pipe(
    tap((input) => {
      this.loading.show();
    }),
    switchMap((input) => this.service.createBillingInfo(input).pipe(
      tapResponse(billingInfo => {
        this.toast.success('Successfully created billing information', { duration: 3000 })
        this.patchState({
          billingInfo
        })
        this.loading.hide()
      }, (error: any) => {
        this.loading.hide()
        // this.toast.error('Failed to create billing information', { duration: 3000 })
        this.toast.error(error.Message, { duration: 3000 })
      })
    ))
  ))

  loadBillingInfo = this.effect($ => $.pipe(
    tap(
      () => {
        this.patchState({
          loading: true
        })
        this.loading.show();
      },
    ),
    switchMap((_) => this.service.loadBillingInfo().pipe(
      tapResponse(
        (billingInfo) => {
          console.log(billingInfo)
          this.loading.hide();
          this.patchState({
            billingInfo: {
              cardHolder: billingInfo.cardHolder,
              country: billingInfo.country,
              id: billingInfo.id,
              zip: billingInfo.zip,
              cardCVC: '***',
              cardExpiration: `${billingInfo.expireMonth}${billingInfo.expireYear}`,
              cardNumber: `*************${billingInfo.last4}`
            },
            loading: false
          })
        },
        (error) => {
          this.loading.hide();
          this.patchState({
            loading: false
          })
        }
      )
    ))
  ))

  loadPlansEffect = this.effect($ => $.pipe(
    switchMap((_) => this.service.loadPlans().pipe(
      tapResponse(
        (plans) => {
          let selectedPlanId = null;
          const myPlan = plans.find((plan) => plan.isMine);
          console.log(plans)
          if (myPlan) selectedPlanId = myPlan.id;
          this.patchState({
            selectedPlanId: selectedPlanId,
            plans: plans
          })
        },
        (error) => {
          console.log(error)
        }
      )
    ))
  ))


}
