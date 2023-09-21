import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable, Inject } from "@angular/core";
import { switchMap, of, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'

export interface NegotiationsState {
  loading: boolean,
  attorneyId?: string,
  query: string,
  caseStatusId?: string,
}

@Injectable()
export class NegotiationsStore extends ComponentStore<NegotiationsState> {

  private offerAddModalCtrl?: FormlyModalController;

  constructor(
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private legalCaseStore: WebLegalCaseFeatureStore,
    private readonly route: ActivatedRoute,
    private caseStatusStore: WebCaseStatusFeatureStore,
    @Inject('lastFiveLegalCaseStore') private lastFiveLegalCaseStore: WebLegalCaseFeatureStore,
  ) {
    super({
      query: "",
      loading: false,
    })

    this.lastFiveLegalCaseStore.setLimit(5);

    const subscriber = this.legalCaseStore.item$.subscribe((item) => {
      if (item) {
        subscriber.unsubscribe();

        if(item.attorneyId) {
          this.setAttorneyId(item.attorneyId);
          setTimeout(() => this.loadLastLegalCasesEffect(), 500);
        }
      }
    });
    this.legalCaseStore.loadLegalCaseEffect(this.route.params.pipe(pluck('legalCaseId')))

    this.caseStatusStore.loadCaseStatusesEffect();
  }

  query$ = this.select(s => s.query);
  caseStatusId$ = this.select(s => s.caseStatusId);
  attorneyId$ = this.select(s => s.attorneyId);
  caseStatuses$ = this.caseStatusStore.caseStatuses$;

  loading$ = this.select(s => s.loading);
  legalCase$ = this.legalCaseStore.item$.pipe(tap(item => console.log(item)));

  lastLegalCases$ = this.lastFiveLegalCaseStore.legalCases$;

  input$ = this.select(this.query$, this.caseStatusId$, this.attorneyId$, (name, caseStatusId, attorneyId) => ({
    caseStatusId, attorneyId, name,
  }))

  vm$ = this.select(
    this.loading$,
    this.legalCase$,
    (
      loading,
      legalCase,
    ) => ({
      loading,
      legalCase,
    })
  )

  setSearchQuery = this.updater((state, query: string) => ({
    ...state,
    query
  }))

  setCaseStatusId = this.updater((state, caseStatusId: string) => ({
    ...state,
    caseStatusId,
  }))

  setAttorneyId = this.updater((state, attorneyId: string) => ({
    ...state,
    attorneyId,
  }))

  loadLastLegalCasesEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.input$),
    switchMap(([, input]) => {
      const { name, caseStatusId, attorneyId } = input;
      if(attorneyId) {
        this.lastFiveLegalCaseStore.setSearchQuery(name);
        this.lastFiveLegalCaseStore.setCaseStatusId(caseStatusId);
        this.lastFiveLegalCaseStore.setAttorneyId(attorneyId);
        this.lastFiveLegalCaseStore.loadLegalCasesEffect();
      }
      return of(true);
    }
    )
  ))

  searchQueryDidChange(query: string) {
    this.setSearchQuery(query);
    this.loadLastLegalCasesEffect();
  }

  caseStatusIdDidChange(caseStatusId: string) {
    this.setCaseStatusId(caseStatusId);
    this.loadLastLegalCasesEffect();
  }

  setOfferAddModalCtrl(ctrl: FormlyModalController) {
    this.offerAddModalCtrl = ctrl;
  }

  openOfferAddModal(data: any) {
    this.offerAddModalCtrl?.open({
      total: 300,
    }, {}, this);
  }



}
