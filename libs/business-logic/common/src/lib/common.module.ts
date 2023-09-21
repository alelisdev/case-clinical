import { DigitOnlyDirective } from './directives/digit-only.directive';
import { NgModule } from '@angular/core';
import { TrimValueAccessorDirective } from './directives/trim-value-accessor';
import { CommonModule as NgCommonModule } from '@angular/common';

const MODULES = [
  DigitOnlyDirective,
  TrimValueAccessorDirective,
];

@NgModule({
  imports: [NgCommonModule],
  declarations: [...MODULES],
  exports: [...MODULES],
})
export class CommonModule { }
