import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { Price, PriceSubscription } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { SettingsService } from '../business-logic/settings.service';
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface FeaturesState {
  loading: boolean,
  subscriptions: PriceSubscription[],
  prices: Price[],
  query: string,
  hideSubscribed: boolean
}

@Injectable()
export class FeaturesStore extends ComponentStore<FeaturesState> {
  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      query: "",
      loading: false,
      prices: [],
      subscriptions: [],
      hideSubscribed: false
    })
  }

  loading$ = this.select(s => s.loading)
  prices$ = this.select(s => s.prices)
  subscriptions$ = this.select(s => s.subscriptions)

  filteredPrices$ = this.select(s => {
    let fliteredPrices = s.prices.map((price) => {
      const subscription = s.subscriptions.find((sub) => sub.priceId === price.id)
      if(subscription && subscription.status === 'active') {
        price.subscribed = true;
      } else {
        price.subscribed = false;
      }
      return price;
    })

    if(s.query.length > 0) {
      fliteredPrices = fliteredPrices.filter((price) => price.name.includes(s.query))
    }

    if(s.hideSubscribed) {
      fliteredPrices = fliteredPrices.filter((price) => !price.subscribed)
    }

    return fliteredPrices;
  })

  vm$ = this.select(
    this.filteredPrices$,
    this.loading$,
    (
      filteredPrices,
      loading
    ) => ({
      filteredPrices,
      loading
    })
  )

  setSearchQuery = this.updater((state, query: string) => ({ ...state, query: query }))

  setHideSubscribed = this.updater((state, hideSubsribed: boolean) => ({ ...state, hideSubscribed: hideSubsribed }))

  loadSubscriptionsEffect = this.effect(($) => $.pipe(
    tap(() => { this.patchState({ loading: true }); this.loading.show() }),
    switchMap(() => this.service.getSubscriptions().pipe(
      tapResponse(
        subscriptions => {
          this.patchState({
            subscriptions: subscriptions,
            loading: false,
          })
          this.loading.hide()
        },
        (error: any) => {
          this.patchState({
            loading: false
          })
          this.loading.hide()
        }
      )
    ))
  ))

  loadPricesEffect = this.effect((input$) =>
    input$.pipe(
      switchMap((_) =>
        this.service.getPrices().pipe(
          tapResponse(
            (data) => {
              this.patchState({
                prices: data,
              })
            },
            (error) => {},
          ),
        ),
      ),
    ),
  )

  cancelSubscriptionEffect = this.effect<string>((priceId$) => priceId$.pipe(
    withLatestFrom(this.subscriptions$),
    switchMap(([ priceId, subscriptions ]) => {
      const subscription = subscriptions.find((sub) => sub.priceId === priceId)
      return this.service.cancelSubscribe(subscription.id).pipe(
        tapResponse((status) => {
          const newSubscriptions = subscriptions.filter((sub) => sub.priceId !== priceId)
          this.toast.success('Successfuly canceled from the feature', { duration: 3000 })
          this.patchState({
            subscriptions: newSubscriptions,
            loading: false,
          })
        },
        error => {
          this.patchState({
            loading: false
          })
        })
      )
    })
  ))

  subscribePriceEffect = this.effect<string>((priceId$) => priceId$.pipe(
    tap(() => {
      this.patchState({
        loading: true
      })
    }),
    withLatestFrom(this.subscriptions$),
    switchMap(([pId, subscriptions]) => this.service.subscribePrice(pId).pipe(
      tapResponse((subscriptionId) => {
        this.toast.success('Successfuly subscribed to the feature', { duration: 3000 })
        this.patchState({
          loading: false,
          subscriptions: [
            ...subscriptions,
            {
              id: subscriptionId,
              priceId: pId,
              status: 'active'
            }
          ]
        })
      }, error => {
        console.log(error)
        this.toast.error('Failed to subscribe', { duration: 3000 })
        this.patchState({
          loading: false
        })
      })
    ))
  ))
}
