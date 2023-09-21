import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { DataContextService } from './data-context.service'
import { BehaviorSubject, debounceTime } from 'rxjs'

@Component({
  selector: 'ui-context-provider',
  template: `
    <ng-content></ng-content>
  `,
  providers: [
    DataContextService
  ]
})

export class UiFormConextProviderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any
  @Input() formName: string

  propsChanged = new BehaviorSubject(null)
  subscriber;

  constructor(private service: DataContextService) {

  }

  ngOnDestroy(): void {
    this.propsChanged.complete();
    this.subscriber?.unsubscribe();
  }

  ngOnInit(): void {
    this.service.setData(this.data);
    this.subscriber = this.propsChanged.pipe(debounceTime(200)).subscribe((data) => {
      if(data) {
        this.service.setData(data)
        this.service.next(data)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.data && changes.data.currentValue !== changes.data.previousValue && changes.data.currentValue.name !== undefined) {
    if(changes.data && changes.data.currentValue !== changes.data.previousValue) {
      // this.propsChanged.next(this.data);
      this.service.setData(this.data)
        this.service.next(this.data)
    }
  }
}
