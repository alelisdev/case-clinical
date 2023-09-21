import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AngMusicPlayerModule } from 'ang-music-player'
import { WebUiMusicWidgetComponent } from './web-ui-music-widget.component'

@NgModule({
  imports: [CommonModule, RouterModule, AngMusicPlayerModule],
  declarations: [WebUiMusicWidgetComponent],
  exports: [WebUiMusicWidgetComponent],
})
export class WebUiMusicWidgetModule {}
