import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'BarChart_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="BarChart_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class BarChartComponent implements OnInit {

  formData = {
    data: {
      labels: [
        1900, 1991, 1992, 1993, 1994, 1995, 1996
      ],
      series: [
        {
          name: "Marine Sprite",
          data: [10, 34, 2, 2, 34, 12, 50]
        }
      ]
    },
    data2: {
      labels: [
        1997, 1998, 1999, 2000, 2001, 2002, 2003
      ],
      series: [
        {
          name: "Marine Sprite",
          data: [44, 5, 4, 37, 2, 43, 21]
        }
      ]
    },
    data3: {
      labels: [
        2004, 2005, 2006, 2007, 2008, 2009, 2010
      ],
      series: [
        {
          name: "React",
          data: [44, 5, 41, 3, 22, 3, 21]
        },
        {
          name: "Angular",
          data: [4, 5, 4, 13, 12, 13, 11]
        },
        {
          name: "Vue",
          data: [4, 5, 1, 3, 2, 3, 2]
        },
      ]
    }
  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
