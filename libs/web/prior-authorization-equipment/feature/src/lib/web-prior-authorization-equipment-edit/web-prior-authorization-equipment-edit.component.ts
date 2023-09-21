
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthorizationEquipmentFeatureStore } from '@case-clinical/web/prior-authorization-equipment/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-authorization-equipment-edit.component.html',
  providers: [WebPriorAuthorizationEquipmentFeatureStore],
})
export class WebPriorAuthorizationEquipmentEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    equipments: this.store.filterEquipments(''),
priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests('')
  }

  constructor(
    private readonly store: WebPriorAuthorizationEquipmentFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorAuthorizationEquipmentEffect(this.route.params.pipe(map((route) => route?.priorAuthorizationEquipmentId)))
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
