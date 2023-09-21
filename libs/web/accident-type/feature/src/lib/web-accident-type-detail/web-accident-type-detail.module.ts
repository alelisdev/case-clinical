
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'libs/shared/shared.module';
import { WebAccidentTypeDetailComponent } from './web-accident-type-detail.component'
import { WebAccidentTypeOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebAccidentTypeDetailComponent,

    WebAccidentTypeOverviewComponent
],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    FuseHighlightModule,
    FuseAlertModule,
    FuseNavigationModule,
    FuseScrollResetModule,
    SharedModule,
    CommonModule,
    WebUiPanelModule,
    WebUiDescriptionListModule,
    WebUiCardHeaderModule,
    WebUiPageModule,
    UtilitySharedModule,
    UiFormsSharedModule,
    WebCoreFeatureModule,
    WebUiFormlyDesignerModule,
    RouterModule.forChild([
        { path: '',
           component: WebAccidentTypeDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebAccidentTypeOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-accident-type-edit/web-accident-type-edit.module').then((m) => m.WebAccidentTypeEditModule),
            },
          {
                  path: 'legal-cases',
                  data: {
                    title: 'Detail',
                    breadcrumb: [
                      {
                        name: 'Accident Types',
                        path: '../../accident-types'
                      },
                      {
                        name: 'Overview',
                        path: '.'
                      },
                      {
                        name: 'Legal Cases',
                        path: 'queues/accident-types/:id/details/legal-cases'
                      }
                    ]
                  },
                  loadChildren: () => import('@case-clinical/web/legal-case/feature').then((m) => m.WebLegalCaseFeatureModule),
                },
          {
                  path: 'required-fields',
                  data: {
                    title: 'Detail',
                    breadcrumb: [
                      {
                        name: 'Accident Types',
                        path: '../../accident-types'
                      },
                      {
                        name: 'Overview',
                        path: '.'
                      },
                      {
                        name: 'Required Fields',
                        path: 'queues/accident-types/:id/details/required-fields'
                      }
                    ]
                  },
                  loadChildren: () => import('@case-clinical/web/required-field/feature').then((m) => m.WebRequiredFieldFeatureModule),
                },
            {
            path:'',
            pathMatch: 'full',
            redirectTo: 'overview'
          }
        ]
        }]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class WebAccidentTypeDetailModule {}
