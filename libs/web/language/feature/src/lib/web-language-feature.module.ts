
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLanguageFeatureComponent } from './web-language-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-language-list/web-language-list.module').then((m) => m.WebLanguageListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-language-create/web-language-create.module').then((m) => m.WebLanguageCreateModule),
      },
      {
        path: ':languageId',
        component: WebLanguageFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-language-detail/web-language-detail.module').then((m) => m.WebLanguageDetailModule),
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
  declarations: [WebLanguageFeatureComponent],
})
export class WebLanguageFeatureModule {}

