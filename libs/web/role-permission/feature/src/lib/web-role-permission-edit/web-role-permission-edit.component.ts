
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebRolePermissionFeatureStore } from '@case-clinical/web/role-permission/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-role-permission-edit.component.html',
  providers: [WebRolePermissionFeatureStore],
})
export class WebRolePermissionEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    permissions: this.store.filterPermissions('')
  }

  constructor(
    private readonly store: WebRolePermissionFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadRolePermissionEffect(this.route.params.pipe(map((route) => route?.rolePermissionId)))
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
