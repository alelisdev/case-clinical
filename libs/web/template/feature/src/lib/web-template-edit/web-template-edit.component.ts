
import {ActivatedRoute,Router} from '@angular/router'
import {Component} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebTemplateEditStore} from './web-template-edit.store'

@Component({templateUrl: './web-template-edit.component.html',
  providers: [WebTemplateEditStore],
})
export class WebTemplateEditComponent {
  readonly vm$ = this.store.vm$

  formData = {
    
  }

  constructor(
    private readonly store: WebTemplateEditStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  updateTemplate($event) {
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
