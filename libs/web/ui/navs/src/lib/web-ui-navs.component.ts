import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-navs',
  styleUrls: ['./web-ui-navs.component.scss'],
  templateUrl: './web-ui-navs.component.html'
})
export class WebUiNavsComponent {
  @Input() showIcon=false;
  @Input() dark=false;
  @Input() direction:'Horizontal'|'Vertical' = 'Vertical';
  @Input() data: { title: string, icon: string, link: string }[] = [];
}
