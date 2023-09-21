import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormConextProviderComponent } from './ui-form-context-provider'
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [UiFormConextProviderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild({

    }),
  ],
  exports: [
    UiFormConextProviderComponent
  ]
})
export class UiFormConextProviderModule {}
