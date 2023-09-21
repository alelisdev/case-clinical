import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '../../button/src'
import { WebUiFormModule } from '../../form/src/lib/web-ui-form.module'
import { FirmFormComponent } from './firm-form.component'

@NgModule({
  exports: [FirmFormComponent],
  declarations: [FirmFormComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule, WebUiButtonModule],
})
export class FirmFormModule {}
