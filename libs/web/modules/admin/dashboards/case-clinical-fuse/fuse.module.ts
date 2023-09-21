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
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { FuseDashboardComponent } from './fuse.component';
import { fuseDashboardRoutes } from './fuse.routing';

@NgModule({
    declarations: [
      FuseDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(fuseDashboardRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        WebUiFormlyDesignerModule,
        WebUiFormModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule
    ]
})
export class FuseDashboardModule
{
}
