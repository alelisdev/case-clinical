
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebTaskTagFeatureStore } from '@case-clinical/web/task-tag/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-task-tag-edit.component.html',
  providers: [WebTaskTagFeatureStore],
})
export class WebTaskTagEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    taskItems: this.store.filterTaskItems(''),
tags: this.store.filterTags('')
  }

  constructor(
    private readonly store: WebTaskTagFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadTaskTagEffect(this.route.params.pipe(map((route) => route?.taskTagId)))
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
