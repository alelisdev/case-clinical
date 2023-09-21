import { ComponentStore } from '@ngrx/component-store'
import { DiagnosisCode } from '@case-clinical/web/core/data-access'
import { Injectable } from '@angular/core'
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'

export interface MultiSelectComponentState {
  loading: boolean
  query: string
  selectedCodes: DiagnosisCode[]
}

@Injectable()
export class MultiSelectComponentStore extends ComponentStore<MultiSelectComponentState> {
  constructor(
    public store: WebDiagnosisCodeFeatureStore
  ) {
    super({
      loading: false,
      query: "",
      selectedCodes: []
    })

    this.store.loadDiagnosisCodesEffect();
  }

  diagnosisCodes$ = this.store.diagnosisCodes$;
  loading$ = this.select((s) => s.loading);
  selectedCodes$ = this.select((s) => s.selectedCodes);

  vm$ = this.select(
    this.loading$,
    (loading, ) => ({
      loading,
    }),
  )

  setSelectedCodes = this.updater((state, selectedCodes: DiagnosisCode[]) => ({ ...state, selectedCodes }))
}
