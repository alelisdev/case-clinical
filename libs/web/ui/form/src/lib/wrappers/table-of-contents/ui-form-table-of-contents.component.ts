import { Component, OnInit } from '@angular/core'
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  templateUrl: './ui-form-table-of-contents.component.html',
  styleUrls: ['./ui-form-table-of-contents.component.scss']
})
export class UiFormTablefContentsComponent extends UiFormBaseField implements OnInit {
  currentSection = 'section1';

  ngOnInit(): void {
    super.ngOnInit();

  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  log(data: any) {
    // console.log(data);
  }

  scrollTo(index: number) {
    document.querySelector('#' + `section${index}`)
    .scrollIntoView({ behavior: "smooth" });
    // .scrollIntoView();
  }

  getClass(index: number) {
    if(this.currentSection === `section${index}`) return 'bg-primary py-4 text-lg font-semibold text-white w-full px-3 border-l-2 border-primary';
    else return "py-4 text-lg w-full px-3 border-l-2 border-gray-200 hover:bg-primary font-semibold hover:text-white hover:border-primary";
  }
}
