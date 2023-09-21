import { FieldWrapper } from '@ngx-formly/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataContextService } from '../../context-provider/data-context.service';
import { FormService } from '../../form.service';

@Component({
  selector: 'ui-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent extends FieldWrapper implements OnInit, OnDestroy {

  title: string;
  subscriber?: any;
  expanded?: boolean

  constructor(
    private formService: FormService,
    private contextService: DataContextService
  ) {
    super()
  }

  ngOnInit() {
    const _title = this.to.title;
    const closed = this.to.closed;
    if(closed) this.expanded = false;
    else this.expanded = true;

    if(_title?.includes('{') && _title?.includes('}')) {
      this.subscriber = this.contextService.getDataStream().subscribe((data) => {
        if(data) {
          this.title = this.contextService.parseStatement(_title);
        }
      });
    } else {
      this.title = _title;
    }
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
