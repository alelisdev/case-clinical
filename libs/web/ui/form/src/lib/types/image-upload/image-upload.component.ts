import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { FieldType } from '@ngx-formly/core'
import { from, Observable, of, tap } from 'rxjs'

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'formly-field-image',
  template: `
    <ng-container>
      <div
        (click)="fileInput.value=null; fileInput.click()"
        class="flex items-center mx-auto justify-center w-40 h-40 rounded-full overflow-hidden text-4xl cursor-pointer uppercase bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
      >

        <ng-container *ngIf="fileData; else elseTemplate">
          <img [src]="fileData" class="object-cover w-full h-full" alt="tenant_logo" >
        </ng-container>
        <ng-template #elseTemplate>
          <img *ngIf="avatar" [src]="avatar" class="object-cover w-full h-full" alt="tenant_logo" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style="width: 80px"
          >
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
          </svg>

        </ng-template>
      </div>
      <input
        #fileInput
        style="display:hidden"
        type="file"
        class="hidden"
        webUiFormFieldFile
        [formlyAttributes]="field"
        [multiple]="to.multiple"
        (change)="fileChanged($event)"
      />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class FormlyFieldImage extends FieldType implements OnInit {
  formControl!: FormControl

  fileData = null;
  avatar = null;

  constructor(private ref: ChangeDetectorRef, private domSanitizer: DomSanitizer) {
    super()
  }


  ngOnInit() {
    this.formControl.valueChanges.subscribe((changes) => {
      if (typeof (changes) === 'string') {
        this.avatar = changes
      } else {
        this.avatar = null;
      }
      this.fileData = null;
      this.ref.detectChanges()
    })
  }

  fileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader()

        const file = event.target.files[0]

        if (!file.type.startsWith('image')) {
          break;
        }

        const document: DocumentInput = {
          name: file.name,
          extension: file.type,
        }

        reader.onload = (event: any) => {
          if (this.to && this.to.onChange) {
            this.to?.onChange(document)
          }

          this.formControl.markAsDirty()
          this.formControl.setValue(file,)
          this.formControl.updateValueAndValidity()
          this.fileData = event.target.result
          this.ref.markForCheck()
          this.ref.detectChanges()
        }
        //Trigger the onload event above with the readAs method
        reader.readAsDataURL(event.target.files[i])
      }
    }
  }
}
