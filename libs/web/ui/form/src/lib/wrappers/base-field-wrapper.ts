import { FieldWrapper } from '@ngx-formly/core';
import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core'
import { DataContextService } from '../context-provider/data-context.service';
import { transpile } from 'typescript';

@Component({
  template: `

  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class UiFormBaseWrapper extends FieldWrapper implements OnInit, OnDestroy {

  private customHideExpression
  private unsubscriber;

  constructor(public service: DataContextService, public elementRef: ElementRef) {
    super()
  }

  ngOnDestroy(): void {
    this.unsubscriber?.unsubscribe();
  }

  ngOnInit(): void {
    const _customHideExpression = this.field['customHideExpression'];
    if(_customHideExpression) {
      const customHideExpression = this.evaluate(_customHideExpression);
      if(customHideExpression instanceof Function) {
        this.customHideExpression = customHideExpression;
      }
    }

    if(this.customHideExpression) {
      this.unsubscriber = this.service.getDataStream().subscribe((contextData) => {
        if(contextData) {
          try {
            const shouldHide = this.customHideExpression(contextData);
            const parentFormFieldElement = this.elementRef.nativeElement.parentNode;
            if(shouldHide) {
              parentFormFieldElement?.classList.add('hidden');
            } else {
              parentFormFieldElement?.classList.remove('hidden');
            }
          } catch (e) {
            console.error(e);
          }
        }
      })
    }
  }

  evaluate(statement: string) {
    try {
      const mediumResult = transpile(statement);
      const evaluatedResult = eval(mediumResult);
      return evaluatedResult;
    } catch (e) {
      return null;
    }
  }
}
