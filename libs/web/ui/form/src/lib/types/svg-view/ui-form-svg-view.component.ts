/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectorRef, Component, ElementRef, OnInit, OnDestroy } from '@angular/core'
import { UiFormBaseField } from '../base-field-type';
import { DataContextService } from '../../context-provider/data-context.service';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { FormService } from '../../form.service';
import { TailwindService } from '@case-clinical/web/ui/formly-designer';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'ui-svg-viewer',
  styleUrls: ['./ui-form-svg-view.scss'],
  template: `
    <div class='w-full h-full' [innerHTML]="svgText"></div>
  `,
})
export class UiFormSvgViewComponent extends UiFormBaseField implements OnInit, OnDestroy {
  svgText: any = "";
  subscriber;

  bindKeys = [];
  bindValues = []

  constructor(private domSanitizer: DomSanitizer,  apiService: WebCoreDataAccessService, cd: ChangeDetectorRef, service: DataContextService, formService: FormService, tailwindService: TailwindService, public cdr: ChangeDetectorRef, elementRef: ElementRef) {
    super(apiService, cd, service, formService, tailwindService, cdr, elementRef)
  }

  ngOnInit(): void {
    super.ngOnInit();

    if(this.to.svgText) {
      // Extract binding values from svg template
      const re = /\{ *([a-z_/.A-Z]+) *\}/g;
      let m;

      do {
          m = re.exec(this.to.svgText);
          if (m) {
            this.bindKeys.push(m[1]);
            this.bindValues.push(undefined);
          }
      } while (m);

      // If does not requre data binding, then does not listen context data change
      if(this.bindKeys.length === 0) {
        this.svgText = this.domSanitizer.bypassSecurityTrustHtml(this.to.svgText);
      } else {
        this.svgText = this.domSanitizer.bypassSecurityTrustHtml(this.service.parseStatement(this.to.svgText));

        this.subscriber = this.service.getDataStream().subscribe(() => {
          // Check if needed to refresh ui from context change  // Form ui optimization
          let shouldRefresh = false;
          for(let i = 0; i < this.bindKeys.length; i++) {
            const bindKey = this.bindKeys[i];
            const prevBindValue = this.bindValues[i];
            const newValue = this.service.getValue(bindKey);
            if(prevBindValue !== newValue) {
              this.bindValues[i] = newValue;
              shouldRefresh = true;
            }
          }
          if(shouldRefresh) {
            console.log('am going to parse svg t  ext now');
            const _svgText = this.service.parseStatement(this.to.svgText);
            this.svgText = this.domSanitizer.bypassSecurityTrustHtml(_svgText);
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriber?.unsubscribe();
  }
}
