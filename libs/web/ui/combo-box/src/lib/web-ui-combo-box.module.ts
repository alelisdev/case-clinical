import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiComboBoxComponent } from './web-ui-combo-box.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule,FormsModule],
  declarations: [WebUiComboBoxComponent],
  exports: [WebUiComboBoxComponent],
})
export class WebUiComboBoxModule {}
