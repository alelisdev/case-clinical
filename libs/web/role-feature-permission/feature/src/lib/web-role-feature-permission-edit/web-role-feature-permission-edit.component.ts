
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebRoleFeaturePermissionFeatureStore } from '@case-clinical/web/role-feature-permission/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-role-feature-permission-edit.component.html',
  providers: [WebRoleFeaturePermissionFeatureStore],
})
export class WebRoleFeaturePermissionEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    featurePermissions: this.store.filterFeaturePermissions(''),
roles: this.store.filterRoles('')
  }

  constructor(
    private readonly store: WebRoleFeaturePermissionFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    this.store.loadRoleFeaturePermissionEffect(route.params.pipe(map((route) => route?.roleFeaturePermissionId)))
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
