import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiDashboardTable } from './web-ui-dashboard-table.component'
import { WebUiMenuButtonModule } from '@case-clinical/web/ui/menu-button'
import { AgGridModule  } from '@ag-grid-community/angular'

@NgModule({
  declarations: [WebUiDashboardTable],
  exports: [WebUiDashboardTable],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    WebUiMenuButtonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class WebUiDashboardTableModule {}
