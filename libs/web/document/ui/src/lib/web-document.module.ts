import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebDocumentComponent } from './web-document.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebDocumentComponent],
  exports: [WebDocumentComponent],
})
export class WebDocumentModule {}
