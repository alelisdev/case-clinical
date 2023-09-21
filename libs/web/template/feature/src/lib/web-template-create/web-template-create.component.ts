
import {ActivatedRoute,Router} from '@angular/router'
import {Component} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebTemplateCreateStore} from './web-template-create.store'

@Component({templateUrl: './web-template-create.component.html',
  providers: [WebTemplateCreateStore],
})
export class WebTemplateCreateComponent {
  readonly vm$ = this.store.vm$

  formData = {
    
  }

  constructor(
    private readonly store: WebTemplateCreateStore,
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
