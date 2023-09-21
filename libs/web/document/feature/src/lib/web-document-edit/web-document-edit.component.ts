
import {ActivatedRoute,Router} from '@angular/router'
import {Component} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebDocumentEditStore} from './web-document-edit.store'

@Component({templateUrl: './web-document-edit.component.html',
  providers: [WebDocumentEditStore],
})
export class WebDocumentEditComponent {
  readonly vm$ = this.store.vm$

  formData = {
    contracts: this.store.filterContracts(''),
patients: this.store.filterPatients(''),
prescriptions: this.store.filterPrescriptions(''),
users: this.store.filterUsers(''),
patientStudies: this.store.filterPatientStudies(''),
procedureVendors: this.store.filterProcedureVendors('')
  }

  constructor(
    private readonly store: WebDocumentEditStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  updateRate($event) {
    const data = {
      ...$event,
contractId: $event.contract?.id,
patientId: $event.patient?.id,
prescriptionId: $event.prescription?.id,
providerId: $event.provider?.id,
patientStudyId: $event.patientStudies?.id,
procedureVendorId: $event.procedureVendor?.id
    };
delete data['contract']
delete data['patient']
delete data['prescription']
delete data['provider']
delete data['patientStudies']
delete data['procedureVendor']
    this.store.updateDocumentEffect(data);
  }
}
