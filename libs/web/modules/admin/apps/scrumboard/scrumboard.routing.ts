import { Route } from '@angular/router';
import { ScrumboardBoardsComponent } from 'libs/web/modules/admin/apps/scrumboard/boards/boards.component';
import { ScrumboardBoardComponent } from 'libs/web/modules/admin/apps/scrumboard/board/board.component';

export const scrumboardRoutes: Route[] = [
    {
        path     : '',
        component: ScrumboardBoardsComponent,
    },
    {
        path     : ':boardId',
        component: ScrumboardBoardComponent,
    }
];
