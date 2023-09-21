import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GridComponent } from './grid/grid.component'
import { ReactiveFormsModule } from '@angular/forms'
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { WebUiModalModule } from '@case-clinical/web/ui/modal';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    WebUiButtonModule,
    WebUiModalModule,
  ],
  declarations: [GridComponent],
  exports: [ GridComponent ]
})
export class WebUiGridModule {}
