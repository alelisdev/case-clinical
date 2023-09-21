import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WebAuthStore } from '@case-clinical/web/auth/data-access';
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared';
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared';
import { map, tap } from 'rxjs';

export interface MISDashboardState {
  loading: boolean,
  query: string,
}

@Injectable()
export class MISDashboardStore extends ComponentStore<MISDashboardState> {
  constructor(
    private authStore: WebAuthStore,
    private recommendedOrderStore: WebRecommendedOrderFeatureStore,
    private authorizationStore: WebAuthorizationFeatureStore,
  ) {
    super({
      query: "",
      loading: false,
    })

    // this.authorizationStore.loadAuthorizationsEffect();

    this.recommendedOrderStore.setVendorName('Magnetic Imaging Services');
    this.recommendedOrderStore.loadRecommendedOrdersEffect();
  }

  loading$ = this.select(s => s.loading)
  user$ = this.authStore.user$;
  recommendedOrders$ = this.recommendedOrderStore.recommendedOrders$.pipe(map((orders) => {
    return orders.map((order) => {
      return {
        ...order,
        authorizations: order.authorizations?.map((_order) => _order.authorization)
      }
    })
  })).pipe(tap(recommendedOrders => console.log({ recommendedOrders })));
  authorizations$ = this.authorizationStore.authorizations$;

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.recommendedOrders$,
    this.authorizations$,
    (
      loading,
      user,
      recommendedOrders,
      authorizations,
    ) => ({
      loading,
      user,
      recommendedOrders,
      authorizations,
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      today: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    })
  )

}
