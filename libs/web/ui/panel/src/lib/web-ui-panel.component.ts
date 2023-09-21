import { Component, Input, TemplateRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core'

@Component({
  selector: 'ui-panel',
  template: `
  <div class="h-full w-full " #panelBody>
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow md:rounded-lg w-full h-full flex flex-col">
      <ng-container *ngIf="headerTemplate" [ngClass]="!disableHeaderPadding && 'px-4 py-5 sm:px-6'">
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </ng-container>

      <div [ngClass]="!disableBodyPadding && 'px-4 py-5 sm:p-6'" class="overflow-auto w-full h-full" #dataBody>
        <ng-content></ng-content>
      </div>

      <ng-container *ngIf="footerTemplate" [ngClass]="!disableFooterPadding && 'px-4 py-4 sm:px-6'">
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </ng-container>
    </div>
  </div>
  `,
})
export class WebUiPanelComponent implements AfterViewInit {
  @Input() headerTemplate: TemplateRef<any>
  @Input() footerTemplate: TemplateRef<any>
  @Input() disableHeaderPadding: boolean
  @Input() disableBodyPadding: boolean
  @Input() disableFooterPadding: boolean

  @ViewChild('panelBody', { static: false }) panelBody: ElementRef;
  @ViewChild('dataBody', { static: false }) dataBody: ElementRef;

  ngAfterViewInit() {
    this.panelBody.nativeElement.parentElement.classList.add('w-full');
    this.autoHeightFixer(this.panelBody.nativeElement, this.panelBody.nativeElement.querySelector('ag-grid-angular'), 500)
  }

  autoHeightFixer(layerInElement, targetElement, delay = 0) {
    if (targetElement) {
      setTimeout(() => {
        const layerOutElement = this.findTectonicPlate(layerInElement);
        if (layerOutElement) {
          Array(...layerOutElement.children).forEach((child) => {
            if (child.name == 'ng-component') {
              child.style.height = '100%';
            }
          });
          const emptyFooterSpacePx = layerOutElement.clientHeight - layerInElement.clientHeight;
          const currentActiveGridHeightPx = targetElement.clientHeight;
          targetElement.style.height = (currentActiveGridHeightPx + emptyFooterSpacePx).toString() + 'px';
        }
      }, delay);
    }
  }

  findTectonicPlate(sourceElement, limit = 1000) {
    let upperTectonicPlate = sourceElement;
    let flag = true;
    while (flag && limit > 0) {
      limit--;
      if (sourceElement.clientHeight != upperTectonicPlate.clientHeight) {
        flag = false;
        return upperTectonicPlate;
      } else {
        upperTectonicPlate = upperTectonicPlate.parentElement;
        if (upperTectonicPlate) {
          flag = true;
        } else {
          flag = false;
          return false;
        }
      }
    }
  }
}
