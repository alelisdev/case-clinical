
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebUserRoleFeatureStore } from '@case-clinical/web/user-role/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-user-role-edit.component.html',
  providers: [WebUserRoleFeatureStore],
})
export class WebUserRoleEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    roles: this.store.filterRoles(''),
users: this.store.filterUsers('')
  }

  constructor(
    private readonly store: WebUserRoleFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadUserRoleEffect(this.route.params.pipe(map((route) => route?.userRoleId)))
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
