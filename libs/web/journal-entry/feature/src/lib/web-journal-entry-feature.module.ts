
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebJournalEntryFeatureComponent } from './web-journal-entry-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-journal-entry-list/web-journal-entry-list.module').then((m) => m.WebJournalEntryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-journal-entry-create/web-journal-entry-create.module').then((m) => m.WebJournalEntryCreateModule),
      },
      {
        path: ':journalEntryId',
        component: WebJournalEntryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-journal-entry-detail/web-journal-entry-detail.module').then((m) => m.WebJournalEntryDetailModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'details'
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebJournalEntryFeatureComponent],
})
export class WebJournalEntryFeatureModule {}

