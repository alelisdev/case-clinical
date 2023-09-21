import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormLinkComponent } from './ui-form-link.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { LightgalleryModule } from 'lightgallery/angular/13';

@NgModule({
  declarations: [UiFormLinkComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    LightgalleryModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'link',
          component: UiFormLinkComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormLinkModule {}
