import { TailwindService } from './../../../../../formly-designer/src/lib/services/tailwind.service';
import { DataContextService } from './../../context-provider/data-context.service';
import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  template: `
    <div class='w-full' [ngClass]="innerClass" [style]="style">
      <div class="container">
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `,
})
export class UiFormContainerComponent extends FieldWrapper implements OnInit {
  style = ""
  innerClass = "";
  outerClass = "";

  constructor(private contextService: DataContextService, private tailwindService: TailwindService) {
    super()
  }

  ngOnInit(): void {
    const className = this.field.className;
    const { innerClass, outerClass } = this.tailwindService.splitClassName(className);
    this.innerClass = innerClass;
    this.outerClass = outerClass;

    this.field.className = this.outerClass;
    this.style = this.to.backgroundImage && this.to.backgroundImage.image ? `background: linear-gradient( 0deg,rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}),rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}) ),url(${this.contextService.parseStatement(this.to.backgroundImage.image)}) ${this.to.backgroundImage.position ?? 'center'}/${this.to.backgroundImage.size ?? 'cover'}; background-repeat: none;` : ""
  }
}
