/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentStore } from '@ngrx/component-store';
import { Injectable, Injector } from "@angular/core";
import { PatientPortalStore } from './patient-portal.store';
import { of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PatientBaseState {

}

@Injectable()
export abstract class PatientBaseStore<Type extends PatientBaseState> extends ComponentStore<Type> {
  public patientPortalStore: PatientPortalStore

  constructor(
    injector: Injector,
  ) {
    super()
    this.patientPortalStore = injector.get(PatientPortalStore);
    this.setState(this.getInitialState())
    this.user$ = this.patientPortalStore.user$;
    this.patient$ = this.patientPortalStore.patient$;
    this.memberships$ = this.patientPortalStore.memberships$;
    this.membership$ = this.patientPortalStore.selectedMembership$;
    this.selectedLegalCaseId$ = this.patientPortalStore.selectedLegalCaseId$;
    this.bookingItem$ = this.patientPortalStore.bookingItem$;
  }

  abstract getInitialState(): Type;
//   readonly selectedPatientId$;
//   readonly patientOptions$
  readonly user$;
  readonly patient$;
  readonly bookingItem$;
  readonly selectedLegalCaseId$;
  readonly memberships$;
  readonly membership$;
  // Notifies that patient id changed, this is called on the left sidebar of patient layout
  legalCaseIdDidChange(patientId: string) {
    // Never update this function
    // Just override this function to implement page specific refresh according to the patient change
  }

  setSelectedLegalCaseId(legalCaseId: string) {
    this.patientPortalStore.setSelectedLegalCaseId(legalCaseId);
    this.legalCaseIdDidChange(legalCaseId);
  }
}
