
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebRoleFeaturePermissionFeatureStore} from '@case-clinical/web/role-feature-permission/shared'

@Component({templateUrl: './web-role-feature-permission-create.component.html',
  providers: [WebRoleFeaturePermissionFeatureStore],
})
export class WebRoleFeaturePermissionCreateComponent implements OnInit, OnDestroy {
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
