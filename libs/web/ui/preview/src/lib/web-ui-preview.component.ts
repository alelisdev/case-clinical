import { Component, ElementRef, Input, ViewChild } from '@angular/core'
@Component({
  selector: 'ui-preview',
  template: `
    <nav aria-label="Progress" class="bg-indigo-600 p-4 rounded-md">
      <ol class="space-y-4 md:flex md:space-y-0 md:space-x-8">
        <li class="md:flex-1" (click)="code_toggle = false">
          <!-- Completed Step -->
          <a
            class="group pl-4 py-2 flex flex-col border-l-4 {{
              code_toggle ? 'border-white' : 'border-black'
            }} hover:border-black md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
          >
            <span class="text-xs text-white font-semibold tracking-wide uppercase">Preview</span>
            <span class="text-sm font-medium"></span>
          </a>
        </li>

        <li class="md:flex-1" (click)="code_toggle = true">
          <!-- Upcoming Step -->
          <a
            class="group pl-4 py-2 flex flex-col border-l-4 {{
              code_toggle ? 'border-black' : 'border-white'
            }} hover:border-black md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
          >
            <span class="text-xs text-white font-semibold tracking-wide uppercase">Code</span>
            <span class="text-sm font-medium"></span>
          </a>
        </li>
      </ol>
    </nav>
    <div class="{{ code_toggle ? 'bg-black' : 'bg-white' }} rounded-md">
      <div class="mt-2 p-4">
        <div *ngIf="!code_toggle" #child_dom ngModel>
          <!-- PREVIEW COMPONENT -->
          <ng-content></ng-content>
        </div>
        <div *ngIf="code_toggle">
          <!-- COMPONENT CODE -->
          <ui-code [copyButton]="true" [code]="code" [language]="lang"></ui-code>
        </div>
      </div>
    </div>
  `,
})
export class WebUiPreviewComponent {
  @Input() code?: string
  @Input() lang?: string
  @Input() component_preview?: string

  @ViewChild('child_dom') child_dom: ElementRef

  ngAfterViewChecked() {
    //console.log('this',this.component_preview)
  }

  ngAfterViewInit() {
    this.render_html_code()
  }

  ngOnInit() {
    this.lang = this.lang !== undefined ? this.lang : 'html'
    //console.warn(this);
  }

  render_html_code() {
    //console.log({object : this.child_dom});

    let vars = {
      component: this.child_dom.nativeElement.firstChild,
      attributes: () => {
        return vars.component.attributes
      },
      extract_name: (attribute) => {
        if (attribute.name.includes('ng-reflect-')) {
          return attribute.name.split('-')[2]
        } else {
          return attribute.name
        }
      },
      is_ng: (name) => {
        return name.includes('ng-reflect-') ? true : false
      },
      tag_name: () => {
        return vars.component.localName
      },
      start_tag: () => {
        return '<' + vars.tag_name() + '>'
      },
      end_tag: () => {
        return '</' + vars.tag_name() + '>'
      },
      is_exist: (name) => {
        for (const value of vars.attributes()) {
          if (value.name === name) {
            return true
          }
        }
      },
      html: '',
      inject: () => {
        return vars.start_tag().toString().slice(0, -1) + vars.html + ' >' + vars.end_tag().toString()
      },
    }

    for (const value of vars.attributes()) {
      if (vars.is_ng(value.name)) {
        if (!vars.is_exist(vars.extract_name(value))) {
          vars.html += ' ' + '[' + vars.extract_name(value) + ']'
        } else {
          vars.html += ' ' + vars.extract_name(value)
        }
        if (value.value.includes('[object Object]')) {
          //console.log({JSON : JSON.parse(value.value)});
        }
        vars.html += '=' + '"' + value.textContent + '"' + ' '
      }
    }
    this.code = vars.inject()
  }

  code_toggle = false
}
