import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { Injectable, Injector } from '@angular/core'
import { ModalController } from '@case-clinical/web/ui/form'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

export interface MembersState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class MembersStore extends AttorneyBaseStore<MembersState> {
  private subscriber: any
  private leadCreateModalControl?: ModalController

  constructor(
    injector: Injector,
    private legalCaseStore: WebLegalCaseFeatureStore,
    private leadStore: WebLeadFeatureStore,
  ) {
    super(injector)

    this.loadLegalCasesEffect()
    this.loadLeadsEffect()
  }

  loading$ = this.select((s) => s.loading)
  legalCases$ = this.legalCaseStore.legalCases$
  leads$ = this.leadStore.leads$

  vm$ = this.select(this.loading$, this.user$, this.legalCases$, this.leads$, (loading, user, legalCases, leads) => {
    return {
      loading,
      user,
      legalCases,
      leads,
    }
  })

  loadLegalCasesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.selectedAttorneyId$, this.firmId$),
      switchMap(([, attorneyId, firmId]) => {
        this.legalCaseStore.setAttorneyId(attorneyId !== 'all' ? (attorneyId as string) : undefined)
        this.legalCaseStore.setFirmId(firmId as string)
        this.legalCaseStore.loadLegalCasesEffect()
        return of(true)
      }),
    ),
  )

  loadLeadsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.selectedAttorneyId$),
      switchMap(([, selectedAttorneyId]) => {
        this.leadStore.setSubmittedById(selectedAttorneyId !== 'all' ? (selectedAttorneyId as string) : undefined)
        this.leadStore.loadLeadsEffect()
        return of(true)
      }),
    ),
  )

  openLeadCreateModal() {
    this.leadCreateModalControl?.open()
  }

  closeLeadCreateModal() {
    this.leadCreateModalControl?.close()
  }

  setLeadCreateModalControl(control: ModalController) {
    this.leadCreateModalControl = control
  }

  override attorneyIdDidChange(): void {
    this.loadLegalCasesEffect()
    // this.loadLeadsEffect();
  }

  override getInitialState(): MembersState {
    return {
      query: '',
      loading: false,
    }
  }
}
