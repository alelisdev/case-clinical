import { AgGridModule } from '@ag-grid-community/angular';
import { CoreFormlySettingModule } from '@case-clinical/core/formly-setting'
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
import { MisDashboardComponent } from 'libs/web/modules/admin/dashboards/mis/mis-dashboard.component';
import { misDashboardRoutes } from 'libs/web/modules/admin/dashboards/mis/mis-dashboard.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'libs/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'

@NgModule({
    declarations: [
        MisDashboardComponent
    ],
    imports     : [
        AgGridModule.withComponents([]),
        CoreFormlySettingModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        RouterModule.forChild(misDashboardRoutes),
        SharedModule,
        TranslocoModule,
        UiFormsSharedModule,
        UtilitySharedModule,
        WebUiFormlyDesignerModule,
        WebUiFormModule,
    ]
})
export class MisDashboardModule
{
}
