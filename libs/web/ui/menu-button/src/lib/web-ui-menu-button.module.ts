import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiMenuButtonComponent } from './web-ui-menu-button.component'

@NgModule({
  declarations: [WebUiMenuButtonComponent],
  exports: [WebUiMenuButtonComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class WebUiMenuButtonModule {}
