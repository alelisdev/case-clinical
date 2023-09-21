import { AfterViewInit, Component, ErrorHandler, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import { LightgalleryComponent } from 'lightgallery/angular/13';

@Component({
  template: `
  <div className='w-full h-full'>
    <lightgallery *ngIf="show" [settings]="settings" [onBeforeSlide]="onBeforeSlide">
      <a
        data-lg-size="480-475-480, 800-791-800, 1406-1390"
        class="gallery-item"
        [attr.data-pinterest-text]="to.pinterest_text"
        [attr.data-tweet-text]="to.tweet_text"
        class="gallery-item"
        [attr.data-responsive]="to.responsive"
        [attr.data-src]="to.data_src"
        [attr.data-sub-html]="to.data_sub_html">
        <img [style]="'height: ' + to.height + 'px'" class="img-responsive object-cover" [src]="to.preview_src" />
      </a>
    </lightgallery>
  </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class UiFormLinkComponent extends FieldType implements OnDestroy, ErrorHandler, AfterViewInit, OnInit {
  @ViewChild(LightgalleryComponent) lightGalleryComponent: LightgalleryComponent
  formControl!: FormControl
  show = true;

  settings = {
    counter: false,
    plugins: [lgZoom],
  };

  handleError(error: any): void {
    console.log(error)
  }

  ngOnInit(): void {
    console.log('KKKK')

    setTimeout(() => { console.log('aldskflasjdf'); this.show = true; }, 300)
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  }

  ngAfterViewInit(): void {
    console.log('Df')
  }

  ngOnDestroy(): void {
    console.log('onDestroy')
  }
}
