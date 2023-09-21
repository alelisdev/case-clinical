import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface FormlyDesigerState {
  loading: boolean,
  query: string,
}

@Injectable()
export class FormlyDesigerStore extends ComponentStore<FormlyDesigerState> {
  constructor(private loading: FuseLoadingService, private toast: WebUiToastService) {
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

}
