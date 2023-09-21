import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { WebUiSignaturePadComponent } from './web-ui-signature-pad.component';

@NgModule({
  declarations: [WebUiSignaturePadComponent],
  imports: [
    ClipboardModule,
    CommonModule,
    FormsModule,
    AngularSignaturePadModule ,
    RouterModule,
    WebUiIconModule,
  ],
  exports: [WebUiSignaturePadComponent],
})
export class WebUiSignaturePadModule {}
