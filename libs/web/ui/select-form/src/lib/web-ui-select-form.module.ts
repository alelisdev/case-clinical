import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { WebUiSelectFormComponent } from './web-ui-select-form.component';

@NgModule({
  declarations: [
    WebUiSelectFormComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    WebUiButtonModule,
  ],
  exports: [
    WebUiSelectFormComponent
  ]
})
export class WebUiSelectFormModule { }
