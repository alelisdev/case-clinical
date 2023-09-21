import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'ui-la-icon',
  styleUrls: [ './web-ui-la-icon.component.scss'],
  template: `
    <la-icon [icon]="icon" [spin]="spin" [size]="size" [border]="border" [pull]="pull" [pulse]="pulse" [title]="title"></la-icon>
  `
})
export class WebUiLaIconComponent {
  @Input() icon: string
  @Input() size: "xs"|"lg"|"sm"|"lx"|"1x"|"2x"|"3x"|"4x"|"5x"|"6x"|"7x"|"8x"|"9x"|"10x" = 'lx';
  @Input() spin = false;
  @Input() pulse = false;
  @Input() border = false;
  @Input() title = ""
  @Input() pull: 'left'|"right"
}
