// https://www.npmjs.com/package/ng-circle-progress
// https://bootsoon.github.io/ng-circle-progress/

import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-circle-progress',
  styleUrls: ['./web-circle-progress.component.scss'],
  template: `
    <circle-progress
      [percent]="percent"
      [radius]="radius"
      [space]="-stroke"
      [outerStrokeWidth]="stroke"
      [innerStrokeWidth]="stroke"
      [showInnerStroke]="true"
      [outerStrokeColor]="outerStrokeColor"
      [innerStrokeColor]="innerStrokeColor"
      [animation]="true"
      [clockwise]="false"
      [backgroundPadding]="-15"
      [backgroundColor]="'#eeeeee'"
      [showTitle]="true"
      [showUnits]="false"
      [showSubtitle]="false"
      [title]="title"
      [animationDuration]="300"
    ></circle-progress>
  `
})
export class WebCircleProgressComponent {
  @Input() radius = 50;
  @Input() percent = 5;
  @Input() stroke = 10;
  @Input() title: string;
  @Input() outerStrokeColor = "#78C000";
  @Input() innerStrokeColor = "#C7E596";
  @Input() imageSrc = "assets/icons/icon-01.png";
  @Input() imageWidth = 30;
  @Input() imageHeight = 38;
}
