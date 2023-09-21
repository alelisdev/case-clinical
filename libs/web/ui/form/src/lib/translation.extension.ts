import { TranslocoService } from '@ngneat/transloco';
import { FormlyExtension, FormlyField, FormlyFieldConfig } from '@ngx-formly/core';

export class TranslateExtension implements FormlyExtension {

  constructor(public transloco: TranslocoService) {
  }

  translateLabel(field: FormlyFieldConfig) {
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': this.transloco.selectTranslate<string>(
        `${field.templateOptions?.label ?? ''}`
      )
    }
  }

  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {
    };

    if (!to?.label) {
      return;
    }

    to._translated = true;
    this.translateLabel(field);
  }

  postPopulate(field: FormlyFieldConfig): void {
      // Save original className for vertical, grid, flexbox, horizontal, because the className for these wrappers changes when displaying ui
      if(field.wrappers?.includes('vertical') || field.wrappers?.includes('horizontal') || field.wrappers?.includes('flexbox')) {
        field.templateOptions.className = field.className;
      }

      switch(field.type) {
        case 'horizontal':
        case 'vertical':
        case 'grid-container':
        case 'flexbox':
          field.templateOptions.className = field.className;
          break;
        default:
          break;
      }
  }
}

export function registerTranslateExtension(translate: TranslocoService) {
  return {
    extensions: [
      {
        name: 'translate-extension',
        extension: new TranslateExtension(translate)
      }
    ]
  };
}
