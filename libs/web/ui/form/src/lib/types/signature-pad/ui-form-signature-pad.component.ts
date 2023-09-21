import { AfterViewInit, Component, ErrorHandler, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <ui-singature-pad [width]="to.width" [height]="to.height" (drawFinished)="drawFinished($event)"></ui-singature-pad>
  `,
  encapsulation: ViewEncapsulation.None
})
export class UiFormSignaturePadComponent extends FieldType implements OnDestroy, ErrorHandler, AfterViewInit, OnInit {

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('init')
  }

  drawFinished(data) {
    this.formControl.setValue({
      name: 'signature.png',
      extension: 'image/png',
      attachment: data,
    });
  }

  handleError(error: any): void {
    // throw new Error('Method not implemented.');
    console.log('handleError')
  }

  ngAfterViewInit(): void {
    console.log('Df')
  }

  ngOnDestroy(): void {
    console.log('onDestroy')
  }
}
