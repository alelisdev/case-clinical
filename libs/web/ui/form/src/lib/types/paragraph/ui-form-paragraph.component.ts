import { Component, OnDestroy, OnInit } from '@angular/core'
import { UiFormBaseField } from '../base-field-type';

@Component({
  template: `
  <ng-container>
    <p *ngIf="value" [style]="getStyle()" [innerHTML]="value"></p>
    <p *ngIf="!value">No Data</p>
  </ng-container>
  `,
})
export class UiFormParagraphComponent extends UiFormBaseField implements OnInit, OnDestroy {
  text = ""
  subscriber;
  useExpression = false;

  bindKeys = [];
  bindValues = []

  public get value() : string {
    const _value = this.useExpression ? this.to.html : this.text;
    return _value;
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.useExpression = this.to.useExpression;

    if (!this.useExpression && this.to.html) {

      const re = /\{ *([a-z_/.A-Z]+) *\}/g;
      let m;

      do {
        m = re.exec(this.to.html);
        if (m) {
          this.bindKeys.push(m[1]);
          this.bindValues.push(undefined);
        }
      } while (m);

      if (this.bindKeys.length === 0) {
        this.text = this.to.html;
      } else {
        this.subscriber = this.service.getDataStream().subscribe(() => {
          let shouldRefresh = false;
          for (let i = 0; i < this.bindKeys.length; i++) {
            const bindKey = this.bindKeys[i];
            const prevBindValue = this.bindValues[i];
            const newValue = this.service.getValue(bindKey, true);
            if (prevBindValue !== newValue) {
              this.bindValues[i] = newValue;
              shouldRefresh = true;
            }
          }
          if(shouldRefresh) {
            this.text = this.service.parseStatement(this.to.html);
            if (this.text === null || this.text === undefined || this.text === 'undefined' || this.text === 'null') {
              this.text = "";
            }
          }
        })
      }
    }
  }

  getStyle(): string {
    let style = ''
    if (this.to.allowEllipse) {
      style = `overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp: ${this.to.ellipseCount};white-space:pre-wrap`
    }
    return style
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriber?.unsubscribe();
  }
}
