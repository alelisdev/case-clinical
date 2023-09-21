import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { FormService, WebUiFormField } from '@case-clinical/web/ui/form'
import { tap } from 'rxjs/operators'
import { AcademyStore } from '../academy.store';

@Component({
  selector: 'academy-category-edit-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-gray-100 rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(customer))" [model]="customer ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" type='button' variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button [disabled]="!form.valid" label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class AcademyCategoryEditComponent {
  @Input() customer: any = {}
  @Output() send = new EventEmitter()
  @Output() close = new EventEmitter()
  form = new FormGroup({})

  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input(
        'title',
        { label: 'Title', required: true, },
        {
          className: 'w-full px-1',
        },
      ),
      WebUiFormField.input('slug', { label: 'Slug', required: true }, { className: 'w-full px-1' }),
    ]),
  ]

  constructor(
    private readonly store: AcademyStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
    public formService: FormService,
  ) {}

  async submit({ id, title, slug }) {
    if(id) {
      this.store.updateAcademyCategoryEffect({ categoryId: id, input: { title, slug }, sendEmitter: this.send  })
    } else {
      this.store.createAcademyCategoryEffect({ input: { title, slug }, sendEmitter: this.send  })
    }
  }

  handleDiscardClick(event) {
    this.close.emit(event)
  }
}
