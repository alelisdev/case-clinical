
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebUserRoleFeatureStore} from '@case-clinical/web/user-role/shared'

@Component({templateUrl: './web-user-role-create.component.html',
  providers: [WebUserRoleFeatureStore],
})
export class WebUserRoleCreateComponent implements OnInit, OnDestroy {
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
