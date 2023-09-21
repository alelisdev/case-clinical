
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebUserCourseProgressFeatureStore } from '@case-clinical/web/user-course-progress/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-user-course-progress-edit.component.html',
  providers: [WebUserCourseProgressFeatureStore],
})
export class WebUserCourseProgressEditComponent  implements OnInit, OnDestroy  {
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
    this.store.loadUserCourseProgressEffect(route.params.pipe(map((route) => route?.userCourseProgressId)))
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
