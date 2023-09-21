import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-renderer',
  template: `
    <input type="checkbox" [checked]="params.value" [disabled]="true" />
  `,
})
export class CheckboxRenderer {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
