import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  ViewChild,
  ViewEncapsulation,
  OnInit
} from '@angular/core'
import { SwiperComponent } from 'swiper/angular'
import { Router,ActivatedRoute } from '@angular/router';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper'
import { BehaviorSubject } from 'rxjs'
import Swiper from 'swiper/types/swiper-class'

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom, Autoplay, Thumbs, Controller])

@Component({
  styleUrls: ['./web-ui-carousel-pro.scss'],
  selector: 'ui-carousel-pro',
  template: `<div class="carousel-pro">
    <div>
      <div class="flex justify-center">
        <div *ngIf="carouselType === 'minSwipeDistance'" style="width: 405px !important; height : 140px">
          <ng-container>
            <swiper
              #swiperVirtualRefs
              [loop]="this.loop"
              [slidesPerView]="this.slidePerView"
              [spaceBetween]="this.spaceBetween"
              [virtual]="this.virtual"
              [centeredSlides]="this.centeredSlides"
              [navigation]="this.navigation"
              [autoplay]="this.delay"
              [pagination]="this.pagination"
              [grabCursor]="this.grabCursor"
              [slidesPerGroup]="this.slidesPerGroup"
            >
              <ng-template swiperSlide *ngFor="let carousel of images; index as i">
                <img
                  class="w-full object-cover rounded-lg block border border-black-500 shadow"
                  src="{{ carousel.path }}"
                />
              </ng-template>
            </swiper>
          </ng-container>
        </div>
      </div>
      <ng-container *ngIf="carouselType === 'avatar'">
        <div class="h-72 button-right">
          <swiper
            #swiperVirtualRefs
            [loop]="this.loop"
            [slidesPerView]="this.slidePerView"
            [spaceBetween]="this.spaceBetween"
            [virtual]="this.virtual"
            [centeredSlides]="this.centeredSlides"
            [navigation]="this.navigation"
            [autoplay]="this.delay"
            [pagination]="this.pagination"
            [grabCursor]="this.grabCursor"
            [slidesPerGroup]="this.slidesPerGroup"
            [breakpoints]="this.breakpoints"
          >
            <ng-template swiperSlide *ngFor="let carousel of images; index as i">
              <div class="zoom img-wrap flex flex-col text-center rounded-3xl bg-white text-white">
                <div class="flex-1 flex flex-col mt-6">
                  <img class="flex-shrink-0 mx-auto  mr-auto ml-auto block mt-3" src="{{ carousel.path }}" alt="" />
                </div>
                <div>
                  <div class="px-5">
                    <h3 class="mt-3 text-sm font-medium text-black">{{ carousel.name }}</h3>
                    <dl class="flex-grow flex flex-col justify-between text-gray-500">
                      <dt class="sr-only">Title</dt>
                      <dd class="swiper-text text-sm py-1">{{ carousel.title }}</dd>
                      <dt class="sr-only">Role</dt>
                      <dd class="swiper-text items-center text-sm flex justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {{ carousel.location }}
                      </dd>
                      <dd class="swiper-button text-xs mb-5 mt-5 font-bold">
                        <a class="rounded-xl px-8 py-2 cursor-pointer" (click)="viewProfile(carousel.id)">View Profile</a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </ng-template>
          </swiper>
        </div>
      </ng-container>
    </div>
  </div>`,

  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WebUiCarouselProComponent implements OnInit {
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent
  @Input() images?: any
  @Input() imagesForSlider?: any
  @Input() bulletNumbers?: boolean = true
  @Input() loop?: boolean = true
  @Input() slidePerView?: number | string = 1
  @Input() spaceBetween?: number | string = 50
  @Input() virtual?: boolean = true
  @Input() centeredSlides?: boolean = true
  @Input() grabCursor?: boolean = true
  @Input() slidesPerGroup?: number = 1
  @Input() carouselType?: string = 'minSwipeDistance'
  @Input() breakpoints?: any

  public delay?: any = 2000

  show: boolean
  thumbs: any
  slides$ = new BehaviorSubject<string[]>([''])

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone,private route: ActivatedRoute,private router: Router) {}

  // getSlides() {
  //   this.slides$.next(Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`))
  // }

  ngOnInit(): void {
    console.log("Images : ", this.images);
  }
  isAuto: any = true

  toggleAuto(val) {
    val == 'start' ? (this.isAuto = { delay: this.delay }) : (this.isAuto = false)
    console.log(this.isAuto)
  }

  extenalBulltes() {
    let arr = []
    // return arr.fill(this.images.length / this.slidePerView)
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  }

  thumbsSwiper: any
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper
  }
  controlledSwiper: any
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper
  }

  indexNumber = 0
  exampleConfig = { slidesPerView: 3 }
  slidesPerView: number = 4
  pagination: any = false

  changeIndex(i) {
    this.indexNumber = i
  }

  slides2 = ['slide 1', 'slide 2', 'slide 3']

  replaceSlides() {
    this.slides2 = ['foo', 'bar']
  }

  togglePagination() {
    if (!this.pagination) {
      this.pagination = { type: 'fraction' }
    } else {
      this.pagination = false
    }
  }

  navigation = false

  toggleNavigation() {
    this.navigation = !this.navigation
  }

  scrollbar: any = { draggable: true }

  toggleScrollbar() {
    if (!this.scrollbar) {
      this.scrollbar = { draggable: true }
    } else {
      this.scrollbar = { draggable: true }
    }
  }

  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`)
  virtualSlides = Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)

  log(log: string) {
    // console.log(string);
  }

  slidesEx = ['first', 'second']

  onSlideChange(swiper: any) {
    if (swiper.isEnd) {
      // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
      this.ngZone.run(() => {
        this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`]
      })
      console.log(this.slidesEx)
    }
  }
  paginationBtn = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    },
  }

  viewProfile(id) {
    this.router.navigate(['/queues/providers/'+id]);
  }
}
