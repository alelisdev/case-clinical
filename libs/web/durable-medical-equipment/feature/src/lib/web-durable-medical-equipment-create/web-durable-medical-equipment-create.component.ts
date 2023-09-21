
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebDurableMedicalEquipmentFeatureStore} from '@case-clinical/web/durable-medical-equipment/shared'

@Component({templateUrl: './web-durable-medical-equipment-create.component.html',
  providers: [WebDurableMedicalEquipmentFeatureStore],
})
export class WebDurableMedicalEquipmentCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    vendors: this.store.filterVendors('')
  }

  constructor(
    private readonly store: WebDurableMedicalEquipmentFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..', item?.id], { relativeTo: this.route })
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
