import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { WebCircleProgressComponent } from './web-circle-progress.component';

@NgModule({
  imports: [
    CommonModule,
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [
    WebCircleProgressComponent
  ],
  exports: [
    WebCircleProgressComponent
  ],
})
export class WebCircleProgresModule {

}
