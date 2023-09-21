import { Component, OnDestroy, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { DataContextService } from '../../context-provider/data-context.service';

@Component({
  template: `
    <ui-circle-progress
      [radius] = "to.radius ?? 50"
      [stroke] = "to.stroke ?? 10"
      [percent]="percent"
      [title]="title"
      [outerStrokeColor] = "to.outerStrokeColor"
      [innerStrokeColor] = "to.innerStrokeColor"
      [imageSrc] = "to.imageSrc ?? 'assets/icons/icon-01.png'"
      [imageWidth] = "to.imageWidth ?? 30"
      [imageHeight] = "to.imageHeight ?? 38"
    ></ui-circle-progress>
  `,
})
export class UiFormCircleProgressComponent extends FieldType implements OnInit, OnDestroy {
  percent = 0;
  title = "";
  subscriber

  constructor(private service: DataContextService) {
    super();
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  ngOnInit() {
    this.subscriber = this.service.getDataStream().subscribe((data) => {
      if(this.to.title) {
        this.title = this.service.parseStatement(this.to.title);
      }
      if(this.to.dataKey) {
        const percentStr = this.service.parseStatement(this.to.dataKey);
        if(!isNaN(Number(percentStr))) {
          this.percent = Number(percentStr);
        }
      }
    });
    if(!this.to.dataKey) {
      this.percent = this.to.percent;
    }
  }
}
