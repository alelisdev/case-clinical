import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as moment from 'moment';
import { SharedModule } from 'libs/shared/shared.module';
import { ScrumboardComponent } from 'libs/web/modules/admin/apps/scrumboard/scrumboard.component';
import { ScrumboardBoardsComponent } from 'libs/web/modules/admin/apps/scrumboard/boards/boards.component';
import { ScrumboardBoardComponent } from 'libs/web/modules/admin/apps/scrumboard/board/board.component';
import { ScrumboardBoardAddCardComponent } from 'libs/web/modules/admin/apps/scrumboard/board/add-card/add-card.component';
import { ScrumboardBoardAddListComponent } from 'libs/web/modules/admin/apps/scrumboard/board/add-list/add-list.component';
import { ScrumboardCardComponent } from 'libs/web/modules/admin/apps/scrumboard/card/card.component';
import { ScrumboardCardDetailsComponent } from 'libs/web/modules/admin/apps/scrumboard/card/details/details.component';
import { scrumboardRoutes } from 'libs/web/modules/admin/apps/scrumboard/scrumboard.routing';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { UiContextProviderModule } from 'libs/web/ui/form/src/lib/wrappers/context-provider/ui-context-provider.module';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [
        ScrumboardComponent,
        ScrumboardBoardsComponent,
        ScrumboardBoardComponent,
        ScrumboardBoardAddCardComponent,
        ScrumboardBoardAddListComponent,
        ScrumboardCardComponent,
        ScrumboardCardDetailsComponent
    ],
    imports     : [
        RouterModule.forChild(scrumboardRoutes),
        DragDropModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        WebUiFormModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormlyModule,
        MatMenuModule,
        UiContextProviderModule,
        MatMomentDateModule,
        MatProgressBarModule,
        SharedModule
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: moment.ISO_8601
                },
                display: {
                    dateInput         : 'll',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        },

    ]
})
export class ScrumboardModule
{
}
