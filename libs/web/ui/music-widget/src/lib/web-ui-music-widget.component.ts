import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-music-widget',
  template: `
    <div class="dark:bg-gray-800  mb-3 md:mb-6 rounded-lg">
      <ang-music-player [audioList]="audioList"></ang-music-player>
    </div>
  `,
})
export class WebUiMusicWidgetComponent {
  @Input() audioList: Audiolist[]

  play() {
    console.log('play')
  }
}

type Audiolist = {
  url: string
  title?: string
  cover?: string
}
