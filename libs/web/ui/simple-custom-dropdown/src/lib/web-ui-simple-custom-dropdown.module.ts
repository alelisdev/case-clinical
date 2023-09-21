import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WebUiSimpleCustomDropdownComponent } from './web-ui-simple-custom-dropdown.component'
import { CdkMenuModule } from '@angular/cdk-experimental/menu'

@NgModule({
  declarations: [WebUiSimpleCustomDropdownComponent],
  exports: [WebUiSimpleCustomDropdownComponent],
  imports: [CommonModule, CdkMenuModule],
})
export class WebUiSimpleCustomDropdownModule {}
