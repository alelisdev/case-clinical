import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiNavsComponent } from './web-ui-navs.component';
import { WebUiLaIconModule } from '@case-clinical/web/ui/la-icon';

@NgModule({
  declarations: [WebUiNavsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WebUiLaIconModule,
  ],
  exports: [WebUiNavsComponent],
})
export class WebUiNavsModule {}
