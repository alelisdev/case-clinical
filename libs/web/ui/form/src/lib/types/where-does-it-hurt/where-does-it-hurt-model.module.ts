import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormlyModule } from '@ngx-formly/core'
import { FormlyAnatomicalModelComponent } from './formly-anatomical-model.component'
import { WhereDoesItHurtModelComponent } from './anatomical-model.component'
import { ArraySortPipe } from './array-sort.pipe'
import { NgxMaterialPopoverModule } from 'ngx-material-popover'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxMaterialPopoverModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'where-does-it-hurt',
          component: FormlyAnatomicalModelComponent,
        },
      ],
    }),
  ],
  declarations: [FormlyAnatomicalModelComponent, WhereDoesItHurtModelComponent, ArraySortPipe],
  exports: [FormlyAnatomicalModelComponent, WhereDoesItHurtModelComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WebUiWhereDoesItHurtModelModule { }