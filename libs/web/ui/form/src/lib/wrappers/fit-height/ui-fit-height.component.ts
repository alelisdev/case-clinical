import { Component, ElementRef, Renderer2, AfterViewChecked, ViewChild, AfterViewInit, HostListener } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  template: `
   <div class="w-full overflow-auto" #fitHeightContent>
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class UiFitHeightComponent extends FieldWrapper implements AfterViewChecked, AfterViewInit {
  @ViewChild('fitHeightContent') fitHeightContent: ElementRef

  constructor(
    private renderer: Renderer2
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.setHeight();
  }

  ngAfterViewChecked() {
    this.setHeight();
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.setHeight();
  }

  setHeight() {
    const rect = this.fitHeightContent.nativeElement.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;

    const newTop = rect.top + scrollTop;
    const marginBottom = this.to.distanceFromBottom ?? 10;

    const targetHeight = window.innerHeight - newTop - marginBottom;
    console.log({ targetHeight })
    this.renderer.setStyle(this.fitHeightContent.nativeElement, "height", `${targetHeight}px`);
  }
}
