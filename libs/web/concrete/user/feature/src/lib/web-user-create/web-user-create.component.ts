
import {ActivatedRoute,Router} from '@angular/router'
import {Component} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebUserCreateStore} from './web-user-create.store'

@Component({templateUrl: './web-user-create.component.html',
  providers: [WebUserCreateStore],
})
export class WebUserCreateComponent {
  readonly vm$ = this.store.vm$

  formData = {
    
  }

  constructor(
    private readonly store: WebUserCreateStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  submit($event) {

    const data = {
        ...$event
    }

    const { id } = data

    if (id !== undefined) {console.log('routing to ', id)
      this.router.navigate(['..', id, 'details'], { relativeTo: this.route })
    }
  }
}
