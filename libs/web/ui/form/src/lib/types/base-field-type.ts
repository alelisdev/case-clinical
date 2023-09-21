/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { DataContextService } from '../context-provider/data-context.service';
import { ElementRef, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core'
import { FieldType } from '@ngx-formly/core';
import { FormService } from '../form.service';
import { TailwindService } from '@case-clinical/web/ui/formly-designer';
import { transpile } from 'typescript';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';

@Component({
  template: `

  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class UiFormBaseField extends FieldType implements OnInit, OnDestroy {
  private unsubscriber;

  private customHideExpression
  private styleExpression?: (contextData: any) => string;
  private classExpression?: (data: any) => string;
  private originalClassname: string;

  constructor(
    public apiService: WebCoreDataAccessService,
    public cd: ChangeDetectorRef,
    public service: DataContextService,
    public formService: FormService,
    public tailwindService: TailwindService,
    public cdr: ChangeDetectorRef,
    public elementRef: ElementRef
  ) {
    super()

  }

  ngOnDestroy(): void {
    this.unsubscriber?.unsubscribe();
  }

  ngOnInit(): void {
    const _customHideExpression = this.field['customHideExpression'];

    if(this.field.templateOptions.classExpression) {
      this.classExpression = this.field.templateOptions.classExpression;
    }

    if(this.field.templateOptions.styleExpression) {
      this.styleExpression = this.field.templateOptions.styleExpression;
    }


    if (_customHideExpression) {
      const customHideExpression = this.evaluate(_customHideExpression);
      if (customHideExpression instanceof Function) {
        this.customHideExpression = customHideExpression;
      }
    }

    if (this.customHideExpression || this.styleExpression || this.classExpression) {
      this.unsubscriber = this.service.getDataStream().subscribe((contextData) => {
        if (contextData) {
          const parentFormFieldElement = this.elementRef.nativeElement.parentNode;
          try {
            const shouldHide = this.customHideExpression(contextData);
            if(shouldHide) {
              parentFormFieldElement?.classList.add('hidden');
            } else {
              parentFormFieldElement?.classList.remove('hidden');
            }
          // eslint-disable-next-line no-empty
          } catch (e) {
          }

          if(this.styleExpression) {
            const dynamicStyle: string = this.styleExpression(contextData);
            this.dynamicStyleChanged(dynamicStyle);
          }

          if(this.classExpression) {
            const dynamicClasses: string = this.classExpression(contextData);
            this.dynamicClassChanged(dynamicClasses);
          }
        }
      })
    }
  }

  dynamicStyleChanged(style: string) {
    const parentFormFieldElement = this.elementRef.nativeElement.parentNode;
    parentFormFieldElement.style = style;
  }

  dynamicClassChanged(classNames: string) {
    const parentFormFieldElement = this.elementRef.nativeElement.parentNode;
    parentFormFieldElement.className = this.field.className + ' ' + classNames;
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
