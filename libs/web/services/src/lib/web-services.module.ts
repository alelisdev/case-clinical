import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventIngestService } from './event-ingeste.service'

@NgModule({
  imports: [CommonModule],
  providers: [
    EventIngestService
  ]
})
export class WebServicesModule {}
