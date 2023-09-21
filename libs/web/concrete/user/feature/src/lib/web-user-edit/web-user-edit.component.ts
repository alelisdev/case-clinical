
import {ActivatedRoute,Router} from '@angular/router'
import {Component} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebUserEditStore} from './web-user-edit.store'

@Component({templateUrl: './web-user-edit.component.html',
  providers: [WebUserEditStore],
})
export class WebUserEditComponent {
  readonly vm$ = this.store.vm$

  formData = {
    
  }

  constructor(
    private readonly store: WebUserEditStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  updateUser($event) {
    const data = {
        ...$event
    }

    const { id } = data

    if (id !== undefined) {
        console.log('routing to ', id)
      this.router.navigate(['..'], { relativeTo: this.route })
    }
  }
}
