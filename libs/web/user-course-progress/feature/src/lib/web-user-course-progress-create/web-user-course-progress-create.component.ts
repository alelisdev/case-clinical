
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebUserCourseProgressFeatureStore} from '@case-clinical/web/user-course-progress/shared'

@Component({templateUrl: './web-user-course-progress-create.component.html',
  providers: [WebUserCourseProgressFeatureStore],
})
export class WebUserCourseProgressCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    users: this.store.filterUsers(''),
courses: this.store.filterCourses('')
  }

  constructor(
    private readonly store: WebUserCourseProgressFeatureStore,
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
