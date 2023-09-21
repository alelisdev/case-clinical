import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { UiFormBaseWrapper } from '../base-field-wrapper'
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core'
import { MenuPositionX, MenuPositionY } from '@angular/material/menu'
import { NgxMaterialPopoverComponent } from 'ngx-material-popover'
import { UiFormBaseField } from '../../types/base-field-type'

@Component({
  selector: 'ui-tooltip',
  styleUrls: ['./style.scss'],
  template: `
    <ngx-material-popover
      [popoverContent]="popoverContent"
      [xPosition]="xPosition"
      [popoverOnHover]="true"
      [popoverCloseOnMouseOutside]="true"
      [yPosition]="yPosition"
      #popover="ngxMaterialPopover"
      mode="hover"
    >
      <formly-field [field]="field.fieldGroup[0]"></formly-field>
    </ngx-material-popover>
    <ng-template #popoverContent>
      <formly-field [field]="field.fieldGroup[1]"></formly-field>
    </ng-template>
  `,
})
export class UiFormToolTipComponent extends UiFormBaseField implements OnInit, OnDestroy {
  subscriber
  bindKeys = []
  bindValues = []
  text = ''
  @ViewChild('popover', { static: true })
  readonly popover!: NgxMaterialPopoverComponent
  xPosition: MenuPositionX = 'after'
  yPosition: MenuPositionY = 'below'

  ngOnInit(): void {
    super.ngOnInit();

    const re = /\{ *([a-z_/.A-Z]+) *\}/g
    let m

    do {
      m = re.exec(this.to.content)
      if (m) {
        this.bindKeys.push(m[1])
        this.bindValues.push(undefined)
      }
    } while (m)

    if (this.bindKeys.length === 0) {
      this.text = this.to.content
    } else {
      this.subscriber = this.service.getDataStream().subscribe(() => {
        let shouldRefresh = false
        for (let i = 0; i < this.bindKeys.length; i++) {
          const bindKey = this.bindKeys[i]
          const prevBindValue = this.bindValues[i]
          const newValue = this.service.getValue(bindKey, true)
          if (prevBindValue !== newValue) {
            this.bindValues[i] = newValue
            shouldRefresh = true
          }
        }
        if (shouldRefresh) {
          this.text = this.service.parseStatement(this.to.content)
          if (this.text === null || this.text === undefined || this.text === 'undefined' || this.text === 'null') {
            this.text = ''
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }

  public get value(): string {
    const _value = this.text
    return _value
  }
}
