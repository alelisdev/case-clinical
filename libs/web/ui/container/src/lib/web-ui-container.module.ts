import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiContainerComponent } from './web-ui-container.component'

@NgModule({
  declarations: [WebUiContainerComponent],
  exports: [WebUiContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class WebUiContainerModule {}
