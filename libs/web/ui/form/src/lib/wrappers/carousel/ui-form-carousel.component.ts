import { Component, OnDestroy, OnInit } from '@angular/core'
import { UiFormBaseField } from '../../types/base-field-type';
import { EffectCards, EffectCoverflow, EffectFlip, SwiperOptions } from 'swiper';
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCube,
  EffectFade,
  Zoom,
  Autoplay,
} from 'swiper';

@Component({
  templateUrl: './ui-form-carousel.component.html',
  styleUrls: ['./style.scss'],
})
export class UiFormCarouselComponent extends UiFormBaseField implements OnInit, OnDestroy {

  private subscriber1;
  manualArrangement = false;
  carouselItem;
  data;

  breakpoints = {
    all: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1440,
  }

  defaultBreakpoint = {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
  }

  config: SwiperOptions = {

  };

  ngOnInit(): void {
    SwiperCore.use([
      Navigation,
      Pagination,
      EffectCube,
      EffectFlip,
      EffectFade,
      EffectCards,
      EffectCoverflow,
      Zoom,
      Autoplay,
      // EffectCreative,
    ])

    this.config = {
      slidesPerView: 1,
      spaceBetween: 50,
      navigation: this.to.showNavigation,
      pagination: {
        clickable: true,
      },
      scrollbar: { draggable: true },
      zoom: {
        maxRatio: 1.5,
        minRatio: 1
      },
    }

    if (this.to.effect) {
      this.config['effect'] = this.to.effect;
    }

    if (this.to.breakpoints) {
      const _breakPoints = {
      }
      for (const key in this.to.breakpoints) {
        const value = this.to.breakpoints[key];
        _breakPoints[this.breakpoints[key]] = value;
      }
      this.config['breakpoints'] = _breakPoints;
    }

    if (this.to.paginationType) {
      this.config.pagination['type'] = this.to.paginationType;
    }

    if (this.to.direction) {
      this.config['direction'] = this.to.direction;
    }

    if (this.to.grid) {
      this.config['grid'] = {
        rows: this.to.gridRows
      }
    }

    if (this.to.autoplay) {
      this.config['autoplay'] = {
        delay: 3000,
        disableOnInteraction: false,
      };
    }

    const dataKey = this.to.dataKey;
    if (dataKey) {
      if (this.field.fieldGroup.length > 0) {
        this.carouselItem = this.field.fieldGroup[0];
      }
      this.subscriber1 = this.service.getDataStream().subscribe(_data => {
        if (_data) {
          this.data = this.formService.getValueForKey(dataKey, _data);
        }
      })
    } else {
      this.manualArrangement = true;
    }
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriber1?.unsubscribe();
  }
}
