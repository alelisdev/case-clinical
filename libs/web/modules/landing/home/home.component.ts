import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'landing-home',
    // templateUrl  : './home.component.html',
    template: `
    <ui-formly-json-form
      class="w-full h-full"
      formName="get_started"
      [showSubmitButton]="false"
      [formData]="formData"
    ></ui-formly-json-form>
    `,
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
  formData = {}
    /**
     * Constructor
     */
    constructor()
    {
    }
}
