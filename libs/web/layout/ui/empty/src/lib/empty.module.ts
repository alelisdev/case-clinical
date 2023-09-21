import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FuseLoadingBarModule } from 'libs/web/@fuse/components/loading-bar/loading-bar.module'
import { SharedModule } from 'libs/shared/shared.module'
import { EmptyLayoutComponent } from './empty.component'
import { QuickChatModule } from '@fuse/services/quick-chat';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [EmptyLayoutComponent],
    imports: [RouterModule, MatIconModule, FuseLoadingBarModule,  QuickChatModule, SharedModule],
    exports: [EmptyLayoutComponent],
})
export class EmptyLayoutModule {}
