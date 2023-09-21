import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-avatar',
  template: `
    <ng-container [ngSwitch]="mode">
      <span *ngSwitchCase="'img'" class="{{ __badge_enable() ? 'inline-block relative' : '' }}">
        <img
          *ngIf="!__badge_enable()"
          class="inline-block {{ __size() }} {{ __radius() }}"
          src="{{ payload }}"
          alt=""
        />
        <img *ngIf="__badge_enable()" class="{{ __size() }} {{ __radius() }}" src="{{ payload }}" alt="" />
        <span
          *ngIf="__badge_enable()"
          class="absolute block {{ __badge_size() }} rounded-full ring-2 ring-white {{
            __badge_position() + __badge_color()
          }}"
        ></span>
      </span>
      <span
        *ngSwitchCase="'icon'"
        class="inline-block {{ __size() }} {{ __radius() }} overflow-hidden bg-gray-100 {{
          __badge_enable() ? 'inline-block relative' : ''
        }}"
      >
        <ui-icon
          *ngIf="!__badge_enable()"
          [icon]="payload"
          size="lg"
          class="text-lg inline-block h-full w-full text-gray-300"
        ></ui-icon>
        <ui-icon
          *ngIf="__badge_enable()"
          [icon]="payload"
          size="lg"
          class="text-lg h-full w-full text-gray-300"
        ></ui-icon>
        <span
          *ngIf="__badge_enable()"
          class="absolute block {{ __badge_size() }} rounded-full ring-2 ring-white {{
            __badge_position() + __badge_color()
          }}"
        ></span>
      </span>
      <span
        *ngSwitchCase="'text'"
        class="inline-flex {{ __badge_enable() ? 'inline-block relative' : '' }} items-center justify-center {{
          __size()
        }} {{ __radius() }} bg-gray-500"
      >
        <span *ngIf="!__badge_enable()" class="inline-block text-xs font-medium leading-none text-white">{{
          payload
        }}</span>
        <span *ngIf="__badge_enable()" class="text-xs font-medium leading-none text-white">{{ payload }}</span>
        <span
          *ngIf="__badge_enable()"
          class="absolute block {{ __badge_size() }} rounded-full ring-2 ring-white {{
            __badge_position() + __badge_color()
          }}"
        ></span>
      </span>
    </ng-container>
  `,
})
export class WebUiAvatarComponent {
  @Input() show?: boolean
  @Input() mode: 'img' | 'icon' | 'text'
  @Input() payload?: string
  @Input() radius?: string
  @Input() size?: number
  @Input() badge?: any

  ngOnInit() {}

  __radius() {
    return this.radius !== undefined ? (this.radius === 'circle' ? 'rounded-full' : 'rounded-md') : 'rounded-full'
  }

  __size() {
    return this.size !== undefined ? 'h-' + this.size.toString() + ' ' + 'w-' + this.size.toString() : 'h-10 w-10'
  }

  __badge_size() {
    if (this.badge !== undefined) {
      let size = (parseInt(this.size.toString()) / 4).toFixed(1)
      return 'h-' + size + ' w-' + size
    }
    return ''
  }

  __badge_position() {
    if (this.badge !== undefined) {
      if (this.badge.position !== undefined) {
        let positions = this.badge.position.toString().split('-')
        return ' ' + positions[0] + '-0' + ' ' + positions[1] + '-0 '
      }
    }
    return ' top-0 right-0 '
  }

  __badge_color() {
    if (this.badge !== undefined) {
      if (this.badge.color !== undefined) {
        let color = this.badge.color.toString()
        return 'bg-' + color + '-300'
      }
    }
    return ' bg-gray-300 '
  }

  __badge_enable() {
    if (this.badge !== undefined) {
      return true
    }
    return false
  }
}
