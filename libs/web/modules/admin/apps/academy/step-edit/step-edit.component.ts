import { AcademyStore } from './../academy.store';
import { Course, AcademyCategory, Step } from '@case-clinical/web/core/data-access';
import { FormService, WebUiFormField } from '@case-clinical/web/ui/form';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { tap, EMPTY } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'step-edit',
  templateUrl: './step-edit.component.html'
})
export class StepEditComponent implements OnInit {
  @Input() courseId?: string
  @Input() step?: Step

  @Output() send = new EventEmitter()

  form = new FormGroup({})
  model: any = {}
  options = {
    formState: {
      mainModel: this.model,
    },
  }

  fields: any[]

  constructor(public formService: FormService, private toast: WebUiToastService, private store: AcademyStore) { }

  ngOnInit(): void {
    console.log(this.courseId, this.step)
    this.model = {
      courseId: this.courseId
    }
    if(this.step) {
      this.model = {
        ...this.model,
        title: this.step.title,
        subtitle: this.step.subtitle,
        content: this.step.content,
      }
    }
    this.fields = [
      WebUiFormField.fieldRow([
        WebUiFormField.input(
          'title',
          { label: 'Title', required: true, },
          {
            className: 'w-full px-1',
          },
        ),
        WebUiFormField.input('subtitle', { label: 'SubTitle', required: true }, { className: 'w-full px-1' }),
        WebUiFormField.markdown('content', { label: 'Content', value: this.step?.content }, { className: 'w-full px-1' }),
      ]),
    ]
  }

  onSubmit($event) {
    if(this.step) {
      console.log(this.step)
      this.store.updateCourseStepEffect({ input: $event, stepId: this.step.id, sendEmitter: this.send })
    } else {
      this.store.createCourseStepEffect({ input: $event, sendEmitter: this.send })
    }
  }
}
