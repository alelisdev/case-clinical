import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HotToastModule } from '@ngneat/hot-toast'
import { WebUiToastService } from './web-ui-toast.service'

@NgModule({
  imports: [
    HotToastModule.forRoot(),
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  providers: [
    WebUiToastService
  ]
})
export class WebUiToastModule {}
