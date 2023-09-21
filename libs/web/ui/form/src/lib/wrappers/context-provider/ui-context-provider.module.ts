import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiContextProviderComponent } from './ui-context-provider.component'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'

@NgModule({
  declarations: [UiContextProviderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'context-provider',
          component: UiContextProviderComponent,
        },
      ],
    }),
  ],
})
export class UiContextProviderModule {}
