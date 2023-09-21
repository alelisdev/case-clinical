import {CalendarWeekViewComponent} from 'angular-calendar';
import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef, OnInit, ChangeDetectorRef, Input,OnChanges, SimpleChanges
  } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
    selector: 'my-calendar-week-view',
    templateUrl:'./customWeekView.component.html',
    styleUrls:['./customWeekview.component.scss']
})

export class CustomWeekView extends CalendarWeekViewComponent implements OnInit,OnChanges{
    @Input() weekViewRef?: TemplateRef<any>
    @Input() refresh:Subject<void>
    ngOnInit(): void {
        this.refresh.subscribe(()=>{
            this.refreshAll();
            this.cdr.detectChanges();

        });
    }
}
