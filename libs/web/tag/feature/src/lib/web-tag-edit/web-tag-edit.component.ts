
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-tag-edit.component.html',
  providers: [WebTagFeatureStore],
})
export class WebTagEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    
  }

  constructor(
    private readonly store: WebTagFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadTagEffect(this.route.params.pipe(map((route) => route?.tagId)))
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
