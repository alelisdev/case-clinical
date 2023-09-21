import { Component, OnDestroy, OnInit  } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { FormService } from '../../form.service';
import { DataContextService } from '../../context-provider/data-context.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  template: `
    <bar-rating [(rate)]="rating" [max]="'5'" [readOnly] = "readOnly" (rateChange)="onRateChanged($event)">
      <ng-template ratingInactive>
        <ui-la-icon (click)="openDialog(designer)" icon="las star" style="color:#dedfe0"></ui-la-icon>
      </ng-template>
      <ng-template ratingActive>
        <ui-la-icon (click)="openDialog(designer)" icon="las star" style="color:#f4c150"></ui-la-icon>
      </ng-template>
      <ng-template ratingFraction>
        <ui-la-icon (click)="openDialog(designer)" icon="las star" style="color:#f4c150"></ui-la-icon>
      </ng-template>
    </bar-rating>
  `,
  styleUrls:['./style.scss']
})
export class UiFormRatingBarComponent extends FieldType  implements OnInit, OnDestroy {
  formControl!: FormControl;
  rating = 5;
  readOnly = false;

  subscriber;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private service:DataContextService, private formService: FormService) {
    super();
  }

  public get Style() : string {
    return this.to.titleStyle ?? 'ml-2 text-gray-900 dark:text-red-50 lg:ml-0 text-3xl mt-5 mb-8 font-bold tracking-tight leading-none'
  }


  ngOnInit() {
    this.readOnly = this.to.readOnly;
    if(this.to.useRatingBarDatakey) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        try{
          if(_data) {
            let rating = this.formService.getValueForKey(this.to.ratingKey, _data);
            if(rating === null || rating === undefined || rating === 'undefined' || rating === 'null') {
              rating = "";
            }
            if(!isNaN(Number(rating))) {
              this.rating = Math.ceil(Number(rating));
            }
          }
        }catch{
          this.rating = this.to.rating;
        }
      })
    } else {
      this.rating = this.to.rating;
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }

  onRateChanged(event: number) {
    if(this.to.valueChanged && this.to.valueChanged instanceof Function){
      this.to.valueChanged(event, this.form);
    }
  }
}
