import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FieldType } from '@ngx-formly/core'

@Component({
  styleUrls: ['./styles.scss'],
  template: `<div class="dark:bg-gray-800 rounded-lg h-full">
            <ang-music-player width='100%' [audioList]="data"></ang-music-player>
            </div>
          `,
})
export class UiFormMusicWidgetComponent extends FieldType implements OnInit{
  audioList = [
    {
      url: "https://quicksounds.com/uploads/tracks/999256607_2146286014_2055097373.mp3",
      title: "Smaple 1",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    }
  ];
  data = [];

  ngOnInit(): void {
    if(this.to.items && this.to.items.length > 0) {
      this.data = this.to.items;
    }else{
      this.data=this.audioList;
    }
  }

}

