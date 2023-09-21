import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared';
import moment from 'moment';

export declare interface RecommendOrderModalActionListener {
  RecommendOrderModalActionCompleted(): void;
}

export interface RecommendOrderModalState {
  loading: boolean,
  query: string,
}

@Injectable()
export class RecommendOrderModalStore extends ComponentStore<RecommendOrderModalState> {

  listener?: RecommendOrderModalActionListener;

  constructor(
    private store: WebRecommendedOrderFeatureStore,
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

  setListener(_listener: RecommendOrderModalActionListener) {
    this.listener = _listener;
  }

  createRecommendOrder(model: any) {
    console.log("recorder-model", model)
    const {
      patientId,
      legalCaseId,
      patientName,
      mrn,
      status,
      requestingProviderId,
      diagnosisCodes
    } = model;
    const name = `${patientName}_${mrn}_${requestingProviderId}_${moment(new Date()).format('DD/MMMM/yyyy hh:mm:ss')}`;
    const diagnosisCodesValue = diagnosisCodes?.map((diagnosisCode:any)=>{
      return {
        diagnosisCodeId:diagnosisCode,
        name:''
      }
    }) 
    const subscriber = this.store.actionResult$.subscribe((result) => {
      const { done } = result;
        if(done) {
          subscriber.unsubscribe();
          this.listener?.RecommendOrderModalActionCompleted();
        }
    })
    this.store.createRecommendedOrderEffect({ name, patientId, legalCaseId, status, requestingProviderId, diagnosisCodes:diagnosisCodesValue });
  }
}
