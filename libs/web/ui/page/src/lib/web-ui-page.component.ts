import { Component, Input, TemplateRef, ViewChild, AfterViewInit, ElementRef } from '@angular/core'
// import { Crumb, ViewMode } from '@case-clinical/web/ui/breadcrumbs'

export interface SubTitleEntry {
  icon?: string
  value?: string
}
@Component({
  selector: 'ui-page',
  templateUrl: './web-ui-page.component.html'
})
export class WebUiPageComponent {
  // BREADCRUMB_VIEW_MODE: typeof ViewMode = ViewMode

  @Input() headerTitle?: string
  @Input() title?: string
  @Input() firmName?: string
  @Input() metaTitleTemplate?: TemplateRef<any>
  @Input() controlsTemplate?: TemplateRef<any>
  // @Input() breadcrumbs?: Crumb[]
  @Input() advertisementBanners?: any

  @ViewChild('pageBody', { static: false }) pageBody: ElementRef;
  @ViewChild('dataBody', { static: false }) dataBody: ElementRef;

  // ngAfterViewInit() {
  // console.log("adsf")
  // this.pageBody.nativeElement.parentElement.classList.add('w-full');
  // this.dataBody.nativeElement.parentElement.classList.add('w-full');
  // this.autoHeightFixer(this.dataBody.nativeElement, this.dataBody.nativeElement, 200)
  // }

  // autoHeightFixer(layerInElement, targetElement, delay = 0) {
  //   if (targetElement) {
  //     setTimeout(() => {
  //       const layerOutElement = this.findTectonicPlate(layerInElement);
  //       if (layerOutElement) {
  //         Array(...layerOutElement.children).forEach((child) => {
  //           if (child.name == 'ng-component') {
  //             child.style.height = '100%';
  //           }
  //         });
  //         const emptyFooterSpacePx = layerOutElement.clientHeight - layerInElement.clientHeight;
  //         const currentActiveGridHeightPx = targetElement.clientHeight;
  //         const formulatedHeight = (currentActiveGridHeightPx + emptyFooterSpacePx) - (((currentActiveGridHeightPx + emptyFooterSpacePx) / 100) * 10)
  //         targetElement.style.height = formulatedHeight.toString() + 'px';
  //       }
  //     }, delay);
  //   }
  // }

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
