import { FormGroup } from '@angular/forms';
import { AcademyStore } from './../academy.store';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course, AcademyCategory } from '@case-clinical/web/core/data-access';
import { FormService, WebUiFormField } from '@case-clinical/web/ui/form';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html'
})
export class CourseEditComponent implements OnInit {
  @Input() course?: Course
  @Input() categories?: AcademyCategory[]
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
    if(this.course) {
      this.model = {
        title: this.course.title,
        slug: this.course.slug,
        description: this.course.description,
        duration: this.course.duration
      }
    }
    this.fields = [
      WebUiFormField.fieldRow([
        WebUiFormField.selectForm(
          'academy-category',
          'categoryId',
          {
            initialValue: this.course?.category?.id,
            label: 'Category',
            valueProp: 'id',
            labelProp: 'title',
            source: this.store.filterCategories,
            debounceTime: 5,
            onCreate: (event) => {
              console.log('category created: ', event)
            },
            onUpdate: (event) => {
              console.log('category updated: ', event)
            },
          },
          {
            className: 'w-full',
          },
        ),
        WebUiFormField.input(
          'title',
          { label: 'Title', required: true, },
          {
            className: 'w-full px-1',
          },
        ),
        WebUiFormField.input('slug', { label: 'Slug', required: true }, { className: 'w-full px-1' }),
        WebUiFormField.textarea('description', { label: 'Description', required: true }, { className: 'w-full px-1' }),
        WebUiFormField.number(
          'duration',
          { label: 'Duration', required: true },
          { className: 'w-full px-1' },
        ),
      ]),
    ]
  }

  onSubmit($event) {
    if(this.course) {
      this.store.updateCourseEffect({ input: $event, courseId: this.course.id, sendEmitter: this.send })
    } else {
      this.store.createCourseEffect({ input: $event, sendEmitter: this.send })
    }
  }
}
