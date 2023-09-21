import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { Price, PriceSubscription } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { switchMap, tap, of } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { products } from './data';


export interface GridLayoutComponentState {
  loading: boolean,
  query: string,
}

@Injectable()
export class GridLayoutComponentStore extends ComponentStore<GridLayoutComponentState> {
  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService) {
    super({
      query: "",
      loading: false,
    })
  }

  loading$ = this.select(s => s.loading)
  vm$ = this.select(
    this.loading$,
    (
      loading
    ) => ({
      loading
    })
  )

  loadProducts() {
    return of(products);
  }
}
