import { Component, OnDestroy} from '@angular/core'
import { DoctorProfileStore } from './doctor-profile.component.store';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { PatientBaseComponent } from '../patient-base.component';

@Component({
  selector: 'patient-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  providers: [
    DoctorProfileStore,
    WebClinicalProviderFeatureStore,
    WebReviewFeatureStore,
    WebDocumentFeatureStore
  ],
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Doctor Details';
  portalName = "Patient";
 
  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {};
  subscriber: any;

  constructor(public store: DoctorProfileStore) {
    super();
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    })
  }
  
  vm$ = this.store.vm$;

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      previewImage: this.store.attachment$,
    }
  }

  onSave($event: any){
    this.store.addNewProfile($event);
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
