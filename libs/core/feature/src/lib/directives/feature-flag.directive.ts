import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { WebAuthStore } from "@case-clinical/web/auth/data-access";
import { map, take } from "rxjs";

@Directive({
    selector: '[featureFlag]'
  })
  export class FeatureFlagDirective {
    @Input() featureFlag: string | string[];

    constructor(
      private vcr: ViewContainerRef,
      private tpl: TemplateRef<any>,
      private userQuery: WebAuthStore
    ) {
    }

    ngOnInit() {
      this.userQuery.hasFlags(this.featureFlag).pipe(
        map((hasFlags) => {
          if (hasFlags) {
            this.vcr.createEmbeddedView(this.tpl);
          }
        }),
        take(1)
      ).subscribe()
    }
  }
