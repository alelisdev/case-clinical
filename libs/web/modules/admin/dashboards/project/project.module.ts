import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

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
import { ProjectComponent } from 'libs/web/modules/admin/dashboards/project/project.component';
import { projectRoutes } from 'libs/web/modules/admin/dashboards/project/project.routing';
import { SharedModule } from 'libs/shared/shared.module';
import { UtilitySharedModule, UiFormsSharedModule } from '@case-clinical/web/shared/ui'

import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
@NgModule({
    declarations: [
        ProjectComponent
    ],
    imports     : [
        RouterModule.forChild(projectRoutes),
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
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        UtilitySharedModule,
        UiFormsSharedModule,
        WebUiFormlyDesignerModule,
    ]
})
export class ProjectModule
{
}
