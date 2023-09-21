import { AgmCoreModule } from '@agm/core'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiLocationMapComponent } from './ui-location-map/ui-location-map.component'

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3cPFfcRGTdbgdFra8MaM5x2lXd7wHGeg',
      libraries: ['places'],
    }),
  ],
  declarations: [
    UiLocationMapComponent
  ],
  exports: [
    UiLocationMapComponent
  ]
})
export class WebUiMapModule {}
