import { Component, Input, OnChanges } from '@angular/core'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface Segment {
  key: string
  value: any
  type: undefined | string
  description: string
  expanded: boolean
}

@Component({
  selector: 'ui-json',
  template: `
    <div class="relative">
      <!--      <ui-json [json]="json" [expanded]="expanded" [depth]="depth"></ui-json>-->

      <section class="ui-json">
        <section *ngFor="let segment of segments" [ngClass]="['segment', 'segment-type-' + segment.type]">
          <section
            (click)="toggle(segment)"
            [ngClass]="{
              'segment-main': true,
              expandable: isExpandable(segment),
              expanded: segment.expanded
            }"
          >
            <div *ngIf="isExpandable(segment)" class="toggler"></div>
            <span class="segment-key">{{ segment.key }}</span>
            <span class="segment-separator">: </span>
            <span *ngIf="!segment.expanded || !isExpandable(segment)" class="segment-value">{{
              segment.description
            }}</span>
          </section>
          <section *ngIf="segment.expanded && isExpandable(segment)" class="children">
            <ui-json
              [copyButton]="false"
              [json]="segment.value"
              [expanded]="expanded"
              [depth]="depth"
              [_currentDepth]="_currentDepth"
            ></ui-json>
          </section>
        </section>
      </section>

      <div
        *ngIf="copyButton"
        class="absolute top-0 right-0 w-5 h-5 opacity-50 hover:opacity-100 flex justify-center items-center"
      >
        <button [cdkCopyToClipboard]="json | json" (cdkCopyToClipboardCopied)="copyDone($event)">
          <ui-icon icon="clipboard"></ui-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./web-ui-json.component.scss'],
})
export class WebUiJsonComponent implements OnChanges {
  @Input() copyButton = true
  @Input() json: any
  @Input() expanded = true
  @Input() depth = -1

  @Input() _currentDepth = -1

  segments: Segment[] = []

  constructor(private readonly toast: WebUiToastService) {}

  ngOnChanges() {
    this.segments = []

    // remove cycles
    this.json = this.decycle(this.json)

    this._currentDepth++

    if (typeof this.json === 'object') {
      Object.keys(this.json).forEach((key) => {
        this.segments.push(this.parseKeyValue(key, this.json[key]))
      })
    } else {
      this.segments.push(this.parseKeyValue(`(${typeof this.json})`, this.json))
    }
  }

  isExpandable(segment: Segment) {
    return segment.type === 'object' || segment.type === 'array'
  }

  toggle(segment: Segment) {
    if (this.isExpandable(segment)) {
      segment.expanded = !segment.expanded
    }
  }

  private parseKeyValue(key: any, value: any): Segment {
    const segment: Segment = {
      key: key,
      value: value,
      type: undefined,
      description: '' + value,
      expanded: this.isExpanded(),
    }

    switch (typeof segment.value) {
      case 'number': {
        segment.type = 'number'
        break
      }
      case 'boolean': {
        segment.type = 'boolean'
        break
      }
      case 'function': {
        segment.type = 'function'
        break
      }
      case 'string': {
        segment.type = 'string'
        segment.description = '"' + segment.value + '"'
        break
      }
      case 'undefined': {
        segment.type = 'undefined'
        segment.description = 'undefined'
        break
      }
      case 'object': {
        // yea, null is object
        if (segment.value === null) {
          segment.type = 'null'
          segment.description = 'null'
        } else if (Array.isArray(segment.value)) {
          segment.type = 'array'
          segment.description = 'Array[' + segment.value.length + '] ' + JSON.stringify(segment.value)
        } else if (segment.value instanceof Date) {
          segment.type = 'date'
        } else {
          segment.type = 'object'
          segment.description = 'Object ' + JSON.stringify(segment.value)
        }
        break
      }
    }

    return segment
  }

  private isExpanded(): boolean {
    return this.expanded && !(this.depth > -1 && this._currentDepth >= this.depth)
  }

  // https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
  private decycle(object: any) {
    const objects = new WeakMap()
    return (function derez(value, path) {
      let old_path
      let nu: any

      if (
        typeof value === 'object' &&
        value !== null &&
        !(value instanceof Boolean) &&
        !(value instanceof Date) &&
        !(value instanceof Number) &&
        !(value instanceof RegExp) &&
        !(value instanceof String)
      ) {
        old_path = objects.get(value)
        if (old_path !== undefined) {
          return { $ref: old_path }
        }
        objects.set(value, path)

        if (Array.isArray(value)) {
          nu = []
          value.forEach(function (element, i) {
            nu[i] = derez(element, path + '[' + i + ']')
          })
        } else {
          nu = {}
          Object.keys(value).forEach(function (name) {
            nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']')
          })
        }
        return nu
      }
      return value
    })(object, '$')
  }

  copyDone(done: boolean) {
    if (done) {
      this.toast.success(`Copied to clipboard`, { duration: 3000 })
    } else {
      this.toast.error(`Error copying json to clipboard`)
    }
  }
}
