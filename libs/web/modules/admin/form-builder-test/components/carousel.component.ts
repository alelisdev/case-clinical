import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Carousel_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Carousel_example"
      [showSubmitButton]="false"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class CarouselComponent implements OnInit {

  formData = {
    users: [
      {
        url: 'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png'
      },
      {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-sapling.png'
      },
      {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-seed.png'
      },
      {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png'
      },
      {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-tree.png'
      },
      {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-ultimate.png'
      },
    ]
  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
