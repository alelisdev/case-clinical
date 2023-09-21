import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormMusicWidgetComponent } from './ui-form-music-widget.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AngMusicPlayerModule } from 'ang-music-player'

@NgModule({
  declarations: [UiFormMusicWidgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    AngMusicPlayerModule,
    UiFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'music-widget',
          component: UiFormMusicWidgetComponent,
        }
      ],
    }),
  ],
})
export class UiFormMusicWidgetModule {}
