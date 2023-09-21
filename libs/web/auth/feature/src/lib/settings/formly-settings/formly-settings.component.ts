import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormlySettingsStore } from '@case-clinical/core/formly-setting';
import { FormService } from '@case-clinical/web/ui/form';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'formly-settings',
  templateUrl: './formly-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlySettingsComponent implements OnInit {
  vm$ = this.store.vm$
  formlySetting$ = this.store.formlySetting$;

  constructor(public formService: FormService, public store: FormlySettingsStore) { }

  ngOnInit(): void {
    this.store.loadFormlySettingsEffect();
  }
}
