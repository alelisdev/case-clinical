import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';

export interface BooleanComponentState {
  loading: boolean,
  query: string,
}

@Injectable()
export class BooleanComponentStore extends ComponentStore<BooleanComponentState> {

  modalCtrl?: FormlyModalController;

  constructor(
    private formService: FormService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
  ) {
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

  setModalCtrl(controller: FormlyModalController) {
    this.modalCtrl = controller;
  }

  openModal() {
    this.modalCtrl?.open({}, {}, this);
  }
}
