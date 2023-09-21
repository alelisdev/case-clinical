import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebProcedureOrTreatmentRequestFeatureStore } from '@case-clinical/web/procedure-or-treatment-request/shared';

export declare interface ProcedureRequestModalActionListener {
  procedureRequestModalActionCompleted(): void;
}

export interface ProcedureRequestModalState {
  loading: boolean,
  query: string,
}

@Injectable()
export class ProcedureRequestModalStore extends ComponentStore<ProcedureRequestModalState> {

  listener?: ProcedureRequestModalActionListener;

  constructor(
    private toast: WebUiToastService,
    private store: WebProcedureOrTreatmentRequestFeatureStore,
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

  setListener(_listener: ProcedureRequestModalActionListener) {
    this.listener = _listener;
  }

  createProcedureRequest(model: any) {
    const {
      patientName,
      patientId,
      legalCaseId,
      mrn,
      status,
      requestingProviderId
    } = model;

    console.log({
      patientName,
      patientId,
      legalCaseId,
      mrn,
      status,
      requestingProviderId
    });

    const name = `${patientName}_${mrn}_${requestingProviderId}`;

    const subscriber = this.store.actionResult$.subscribe((result) => {
      const { done } = result;
        if(done) {
          subscriber.unsubscribe();
          this.listener?.procedureRequestModalActionCompleted();
        }
    })

    this.store.createProcedureOrTreatmentRequestEffect({ name, patientId, legalCaseId, requestingProviderId, status })
  }
}
