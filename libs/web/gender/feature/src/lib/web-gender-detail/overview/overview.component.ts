

import { Component,ElementRef,OnDestroy, OnInit, ViewChild,Renderer2 } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="gender_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
          (formIsReady)="this.onResize()"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebGenderFeatureStore],
})
export class WebGenderOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('overviewHeaderContent') overviewHeaderContent: ElementRef
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebGenderFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.store.loadGenderEffect(this.route.params.pipe(pluck('genderId')))
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['../../../'], {relativeTo: this.route});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteGenderEffect()
    }
  }

  
  patientAdded($event){
    console.log('from the overview in Gender, added: ',$event)
  }

  onResize() {
    const body = document.body,
    html = document.documentElement;
    let windowHeight = 960;
    windowHeight = Math.min( body.scrollHeight, body.offsetHeight, html.clientHeight, html.offsetHeight );

    const targetHeight = Math.max(windowHeight - this.overviewHeaderContent.nativeElement.offsetTop - 90, 500);
    this.renderer.setStyle(this.overviewHeaderContent.nativeElement, "height", `${targetHeight}px`);
  }

}

