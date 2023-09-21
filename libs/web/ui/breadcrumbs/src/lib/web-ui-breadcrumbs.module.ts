import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiBreadcrumbsComponent } from './web-ui-breadcrumbs.component'
import { WebUiBreadcrumService } from './web-ui-breadcrumbs.service'

@NgModule({
  declarations: [WebUiBreadcrumbsComponent],
  exports: [WebUiBreadcrumbsComponent],
  imports: [CommonModule, RouterModule],
})
export class WebUiBreadcrumbsModule { }
