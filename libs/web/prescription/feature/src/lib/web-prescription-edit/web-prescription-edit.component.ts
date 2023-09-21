
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prescription-edit.component.html',
  providers: [WebPrescriptionFeatureStore],
})
export class WebPrescriptionEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    patients: this.store.filterPatients(''),
documents: this.store.filterDocuments('')
  }

  constructor(
    private readonly store: WebPrescriptionFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPrescriptionEffect(this.route.params.pipe(map((route) => route?.prescriptionId)))
    }

   ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..'], { relativeTo: this.route })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
