import { Component } from '@angular/core'

@Component({
  selector: 'ui-group-button',
  template: `
    <div class="inline-flex">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Prev</button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Next</button>
    </div>
  `,
})
export class WebUiGroupButtonComponent {}
