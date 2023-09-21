import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormEmbedComponent } from './ui-form-embed.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { LightgalleryModule } from 'lightgallery/angular/13';

@NgModule({
  declarations: [UiFormEmbedComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    LightgalleryModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'embed',
          component: UiFormEmbedComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormEmbedModule {}
