import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'ui-singature-pad',
  styleUrls: ['./web-ui-signature-pad.component.scss'],
  template: `
    <signature-pad #signature [options]="signaturePadOptions" (drawStart)="drawStart($event)" (drawEnd)="drawComplete($event)"></signature-pad>
  `,
})
export class WebUiSignaturePadComponent implements OnInit {
  @Input() width = 300;
  @Input() height = 300;
  @Output() drawFinished = new EventEmitter();
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;

  public signaturePadOptions

  constructor() {
    // no-op
  }

  ngOnInit(): void {
    this.signaturePadOptions = {
      canvasWidth: this.width ?? 300,
      canvasHeight: this.height ?? 300,
    }
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete(event: MouseEvent | Touch) {
    this.drawFinished.emit(this.signaturePad.toDataURL());
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }
}
