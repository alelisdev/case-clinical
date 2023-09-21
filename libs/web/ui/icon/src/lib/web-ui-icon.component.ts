import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { UiIcon } from './enums/ui-icon.enum'

@Component({
  styleUrls: ['./web-ui-icon.component.scss'],
  selector: 'ui-icon',
  templateUrl: './web-ui-icon.component.html',
})
export class WebUiIconComponent {
  UiIcon: typeof UiIcon = UiIcon
  @Input() icon!: UiIcon | string
}
