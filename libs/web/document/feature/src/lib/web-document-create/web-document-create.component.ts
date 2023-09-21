
import {ActivatedRoute,Router} from '@angular/router'
import {Component} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebDocumentCreateStore} from './web-document-create.store'

@Component({templateUrl: './web-document-create.component.html',
  providers: [WebDocumentCreateStore],
})
export class WebDocumentCreateComponent {
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
    private readonly store: WebDocumentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  submit($event) {
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
    this.store.createDocumentEffect(data);
  }
}
