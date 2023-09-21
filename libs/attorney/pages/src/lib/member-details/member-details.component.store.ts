import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { Injectable, Injector } from '@angular/core'
import { ModalController } from '@case-clinical/web/ui/form'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { ActivatedRoute } from '@angular/router'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'

export interface MemberDetailsState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class MemberDetailsStore extends AttorneyBaseStore<MemberDetailsState> {

  private caseInfoModalCtrl?: FormlyModalController;
  private HealthInsuranceModalCtrl?: FormlyModalController;
  private AccidentModalCtrl?: FormlyModalController;
  private ProductLiabilityModalCtrl?: FormlyModalController;
  private WorkersCompensationModalCtrl?: FormlyModalController;
  private MotorVehicleAccidentModalCtrl?: FormlyModalController;
  private InsuranceInformationModalCtrl?: FormlyModalController;
  private InjuryModalCtrl?: FormlyModalController;
  
  constructor(
    injector: Injector,
    private readonly route: ActivatedRoute,
    private legalCaseStore: WebLegalCaseFeatureStore,
  ) {
    super(injector)

    if (this.route.snapshot.paramMap.has("memberId")) {
      const memberId = this.route.snapshot.paramMap.get("memberId") ?? '';

      this.legalCaseStore.loadLegalCaseEffect(memberId);
    }
  }
  
  loading$ = this.select((s) => s.loading)
  legalCase$ = this.legalCaseStore.item$

  vm$ = this.select(this.loading$, this.user$, this.legalCase$, (loading, user, legalCase) => {
    return {
      loading,
      user,
      legalCase,
    }
  })

  override getInitialState(): MemberDetailsState {
    return {
      query: '',
      loading: false,
    }
  }

  /** Case InFo Edit */
  setCaseInfoModalCtrl(ctrl: FormlyModalController) {
    this.caseInfoModalCtrl = ctrl;
  }

  openCaseInfoModal() {
    this.caseInfoModalCtrl?.open({}, {}, this);
  }
  /** Case InFo Edit */

  /** Health Insurance Edit */
  setHealthInsuranceModalCtrl(ctrl: FormlyModalController) {
    this.HealthInsuranceModalCtrl = ctrl;
  }

  openHealthInsuranceModal() {
    this.HealthInsuranceModalCtrl?.open({}, {}, this);
  }
  /** Health Insurance Edit */

  /** Accident Edit */
  setAccidentModalCtrl(ctrl: FormlyModalController) {
    this.AccidentModalCtrl = ctrl;
  }

  openAccidentModal() {
    this.AccidentModalCtrl?.open({}, {}, this);
  }
  /** Accident Edit */

  /** Product Liability Edit */
  setProductLiabilityModalCtrl(ctrl: FormlyModalController) {
    this.ProductLiabilityModalCtrl = ctrl;
  }

  openProductLiabilityModal() {
    this.ProductLiabilityModalCtrl?.open({}, {}, this);
  }
  /** Product Liability Edit */

  /** Workers Compensation Edit */
  setWorkersCompensationModalCtrl(ctrl: FormlyModalController) {
    this.WorkersCompensationModalCtrl = ctrl;
  }

  openWorkersCompensationModal() {
    this.WorkersCompensationModalCtrl?.open({}, {}, this);
  }
  /** Workers Compensation Edit */

  /** Motor Vehicle Accident Edit */
  setMotorVehicleAccidentModalCtrl(ctrl: FormlyModalController) {
    this.MotorVehicleAccidentModalCtrl = ctrl;
  }

  openMotorVehicleAccidentModal() {
    this.MotorVehicleAccidentModalCtrl?.open({}, {}, this);
  }
  /** Motor Vehicle Accident Edit */

  /** Insurance Information Edit */
  setInsuranceInformationModalCtrl(ctrl: FormlyModalController) {
    this.InsuranceInformationModalCtrl = ctrl;
  }

  openInsuranceInformationModal() {
    this.InsuranceInformationModalCtrl?.open({}, {}, this);
  }
  /** Insurance Information Edit */

  /** Injury Edit */
  setInjuryModalCtrl(ctrl: FormlyModalController) {
    this.InjuryModalCtrl = ctrl;
  }

  openInjuryModal() {
    this.InjuryModalCtrl?.open({}, {}, this);
  }
  /** Injury Edit */
}
