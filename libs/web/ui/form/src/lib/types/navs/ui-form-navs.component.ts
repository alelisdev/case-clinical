import { Component, OnInit } from '@angular/core'
import { UiFormBaseField } from '../base-field-type'

@Component({
  styleUrls: ['./ui-form-navs.component.scss'],
  templateUrl: './ui-form-navs.component.html'
})
export class UiFormNavsComponent extends UiFormBaseField implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }
}
