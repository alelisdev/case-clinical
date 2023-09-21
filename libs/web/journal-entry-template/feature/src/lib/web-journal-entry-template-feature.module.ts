
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebJournalEntryTemplateFeatureComponent } from './web-journal-entry-template-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-journal-entry-template-list/web-journal-entry-template-list.module').then((m) => m.WebJournalEntryTemplateListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-journal-entry-template-create/web-journal-entry-template-create.module').then((m) => m.WebJournalEntryTemplateCreateModule),
      },
      {
        path: ':journalEntryTemplateId',
        component: WebJournalEntryTemplateFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-journal-entry-template-detail/web-journal-entry-template-detail.module').then((m) => m.WebJournalEntryTemplateDetailModule),
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
  declarations: [WebJournalEntryTemplateFeatureComponent],
})
export class WebJournalEntryTemplateFeatureModule {}

