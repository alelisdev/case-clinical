import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-alert',
  template: `
    <div
      *ngIf="show"
      class="{{ __class() }} rounded-md {{ __bg_color() }} {{
        accent_border ? 'border-l-4 border-' + _filter_color() + '-400' : ''
      }} p-4"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <ui-icon *ngIf="icon_show" size="lg" icon="{{ icon }}" class="h-5 w-5 {{ _svg_text_color() }}"></ui-icon>
        </div>
        <div class="ml-3">
          <h3 *ngIf="subject" class="text-sm font-medium {{ _subject_text_color() }}">{{ __subject() }}</h3>
          <div class="{{ subject !== undefined ? 'mt-2' : '' }}text-sm {{ _message_text_color() }}">
            <p [innerHTML]="__message()"></p>
            <ul *ngIf="list" class="list-disc pl-5 space-y-1">
              <li *ngFor="let value of list; index as i">
                {{ value }}
              </li>
            </ul>
            <div *ngIf="actionLink" class="mt-4">
              <div class="-mx-2 -my-1.5 flex">
                <button
                  *ngFor="let action of actionLink; index as i"
                  (click)="action.click_event !== undefined ? action.click_event(__child()) : false"
                  type="button"
                  class="bg-{{ _filter_color() }}-50 px-2 py-1.5 rounded-md text-sm font-medium text-{{
                    _filter_color()
                  }}-800 hover:bg-{{
                    _filter_color()
                  }}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-{{
                    _filter_color()
                  }}-50 focus:ring-{{ _filter_color() }}-600"
                >
                  {{ action.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-auto pl-3" *ngIf="dismiss">
          <div class="-mx-1.5 -my-1.5">
            <button
              type="button"
              (click)="destroy()"
              class="inline-flex bg-{{ _filter_color() }}-50 rounded-md p-1.5 text-{{ _filter_color() }}-500 hover:bg-{{
                _filter_color()
              }}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-{{
                _filter_color()
              }}-50 focus:ring-{{ _filter_color() }}-600"
            >
              <span class="sr-only">Dismiss</span>
              <ui-icon icon="dismiss" size="lg" class="h-5 w-5"></ui-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class WebUiAlertComponent {
  @Input() show?: boolean
  @Input() class?: string
  @Input() subject?: string
  @Input() message?: string
  @Input() list?: string[]
  @Input() actionLink?: Object[]
  @Input() type?: string
  @Input() bg_color?: string
  @Input() dismiss?: boolean
  @Input() icon_show?: boolean
  @Input() icon?: string
  @Input() accent_border?: boolean

  constructor() {}

  ngOnInit() {
    this.show = this.show === undefined ? true : false
    this.dismiss = this.dismiss === undefined ? false : true
    this.icon_show = this.icon_show === undefined ? false : true
  }
  __class() {
    return this.class
  }
  __action_link() {
    if (this.actionLink !== undefined && this.actionLink !== null) {
      return this.actionLink
    }
    return []
  }

  __child() {
    return this
  }
  __bg_color() {
    if (!this.bg_color.includes('bg')) {
      switch (this.bg_color) {
        case 'warning':
          return 'bg-yellow-50'
        case 'success':
          return 'bg-green-50'
        case 'danger':
          return 'bg-red-50'
        case 'info':
          return 'bg-blue-50'
      }
    }
    return this.bg_color
  }

  __subject() {
    return this.subject
  }

  __message() {
    this._filter_color()
    return this.message
  }

  _subject_text_color() {
    return 'text-' + this._filter_color() + '-800'
  }

  _message_text_color() {
    return 'text-' + this._filter_color() + '-700'
  }

  _svg_text_color() {
    return 'text-' + this._filter_color() + '-400'
  }

  _filter_color() {
    const bg_color = this.__bg_color()
    if (bg_color !== undefined && bg_color !== '') {
      if (bg_color.includes('bg-')) {
        return bg_color.substring(bg_color.indexOf('-') + 1, bg_color.indexOf('-', bg_color.indexOf('-') + 1))
      }
    }
    return false
  }

  destroy() {
    this.show = false
  }
}
