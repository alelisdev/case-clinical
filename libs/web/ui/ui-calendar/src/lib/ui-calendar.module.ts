import { NgModule } from '@angular/core';
import { BaseCalModule } from './base-cal/base-cal.module';
import { NgxMaterialPopoverModule } from 'ngx-material-popover'

@NgModule({
  declarations: [
  ],
  imports: [
    BaseCalModule,
    NgxMaterialPopoverModule,
  ],
  providers: [],
  exports: [
    BaseCalModule
  ]
})
export class UiCalendarModule { }
