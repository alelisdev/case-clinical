import { Component, Input } from '@angular/core'
@Component({
  selector: 'ui-carousel',
  template: `
    <div>
      <div class="overflow-auto relative flex-no-wrap flex">
        <ng-container *ngFor="let item of items; let i = index">
          <div
            *ngIf="active == i"
            class="w-{{ width }} flex-shrink-0 h-{{ height }} bg-{{
              bgColor
            }}-700 text-white flex items-center justify-center rounded-{{ corners }}"
          >
            <img [src]="item.path" class="w-{{ width }} h-{{ height }} rounded-{{ corners }}" />
          </div>
        </ng-container>
      </div>
      <div class="p-4 flex items-center justify-center flex-1 bg-{{ bgColor }}-700 bg-opacity-75">
        <button class="outline-none focus:outline-none rounded-full mx-4 text-white" (click)="goToLeftCarousel()">
          <
        </button>
        <ng-container *ngFor="let item of items; let i = index">
          <span
            class="bg-white w-3 h-3 block mx-1 bg-opacity-25 shadow rounded-full"
            [ngClass]="{ 'bg-opacity-100': active === i }"
          ></span>
        </ng-container>
        <button class="outline-none focus:outline-none rounded-full mx-4 text-white" (click)="goToRightCarousel()">
          >
        </button>
      </div>
    </div>
  `,
})
export class WebUiCarouselComponent {
  @Input() bgColor?: string
  @Input() height?: string
  @Input() width?: string
  @Input() corners?: string
  @Input() items: Images[]

  active: number = 0

  interval: any

  ngOnInit(): void {
    console.log(this.items)

    this.setTimeInterval()
  }

  activeCarousel(act?: number) {
    this.active = act
  }

  setTimeInterval() {
    this.interval = setInterval(() => {
      if (this.items.length - 1 != this.active) {
        this.active++
        this.activeCarousel(this.active)
      } else {
        this.activeCarousel(0)
      }
    }, 2000)
  }

  goToLeftCarousel() {
    this.active--
    clearInterval(this.interval)
    this.active < 0 ? (this.active = this.items.length - 1) : ''
    this.setTimeInterval()
  }

  goToRightCarousel() {
    clearInterval(this.interval)
    this.active != this.items.length - 1 ? this.active++ : (this.active = 0)
    this.setTimeInterval()
  }
}

interface Images {
  img?: string
}
