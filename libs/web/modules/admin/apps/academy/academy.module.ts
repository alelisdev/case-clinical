import { AcademyCategoryEditComponent } from './academy-category-select/academy-category-edit';
import { AcademyCategorySelectComponent } from './academy-category-select/academy-category-select';
import { AcademyComponent } from './academy.component';
import { AcademyDetailsComponent } from './details/details.component';
import { AcademyListComponent } from './list/list.component';
import { academyRoutes } from './academy.routing';
import { AcademyService } from './academy.service';
import { AcademyStore } from './academy.store';
import { CourseEditComponent } from './course-edit/course-edit.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormlyModule } from '@ngx-formly/core';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'libs/shared/shared.module';
import { StepEditComponent } from './step-edit/step-edit.component';
import { TranslocoModule } from '@ngneat/transloco';
import { WebAcademyCategoryTableViewComponent } from './academy-category-select/academy-category-table-view';
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { WebUiPanelModule } from '@case-clinical/web/ui/panel';
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form';

@NgModule({
    declarations: [
        AcademyCategoryEditComponent,
        AcademyCategorySelectComponent,
        AcademyComponent,
        AcademyDetailsComponent,
        AcademyListComponent,
        CourseEditComponent,
        StepEditComponent,
        WebAcademyCategoryTableViewComponent,
    ],
    imports : [
        DragDropModule,
        FuseFindByKeyPipeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTooltipModule,
        RouterModule.forChild(academyRoutes),
        SharedModule,
        TranslocoModule,
        WebDatatableUiModule,
        WebUiButtonModule,
        WebUiCardHeaderModule,
        WebUiFormModule,
        WebUiPanelModule,
        WebUiSelectFormModule,
        FormlyModule.forChild({
            types: [
              {
                name: 'academy-category-select',
                component: AcademyCategorySelectComponent,
                wrappers: ['form-field'],
              }
            ],
          }),
    ],
    providers: [
        AcademyService,
        AcademyStore
    ]
})
export class AcademyModule {}
