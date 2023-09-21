import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'libs/shared/shared.module';
import { CubeDashboardComponent } from './cube-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CubejsClientModule } from "@cubejs-client/ngx";
import { CubeDashboardRoutes } from './cube-dashboard.routing';
import { NgChartsModule } from 'ng2-charts';
import { WebUiFormlyDesignerModule } from 'libs/web/ui/formly-designer/src/lib/web-ui-formly-designer.module'
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { CubeService } from './cube-service.service';
import { environment } from '@case-clinical/core/feature'
import { UiFormsSharedModule } from '@case-clinical/web/shared/ui';

const cubejsOptions = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.K9PiJkjegbhnw4Ca5pPlkTmZihoOm42w8bja9Qs2qJg",
  options: {
    apiUrl: environment.apiHost + "/cubejs-api/v1"
  }
};


@NgModule({
    declarations: [
        CubeDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(CubeDashboardRoutes),
        CubejsClientModule.forRoot(cubejsOptions),
        MatButtonModule,
        NgChartsModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        WebUiFormModule,
        UiFormsSharedModule,
        WebUiFormlyDesignerModule,
        MatRippleModule,
        MatSidenavModule,
        MatCardModule,
        MatGridListModule,
        CubejsClientModule.forRoot(cubejsOptions),
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule
    ],
    providers: [
      CubeService
    ]
})
export class CubeDashboardModule{}
