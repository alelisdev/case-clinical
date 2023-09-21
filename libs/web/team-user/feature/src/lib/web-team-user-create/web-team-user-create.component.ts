
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebTeamUserFeatureStore} from '@case-clinical/web/team-user/shared'

@Component({templateUrl: './web-team-user-create.component.html',
  providers: [WebTeamUserFeatureStore],
})
export class WebTeamUserCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    teams: this.store.filterTeams(''),
users: this.store.filterUsers(''),
teamRoles: this.store.filterTeamRoles('')
  }

  constructor(
    private readonly store: WebTeamUserFeatureStore,
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
