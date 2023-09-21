
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPortfolioFeatureComponent } from './web-portfolio-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-portfolio-list/web-portfolio-list.module').then((m) => m.WebPortfolioListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-portfolio-create/web-portfolio-create.module').then((m) => m.WebPortfolioCreateModule),
      },
      {
        path: ':portfolioId',
        component: WebPortfolioFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-portfolio-detail/web-portfolio-detail.module').then((m) => m.WebPortfolioDetailModule),
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
  declarations: [WebPortfolioFeatureComponent],
})
export class WebPortfolioFeatureModule {}

