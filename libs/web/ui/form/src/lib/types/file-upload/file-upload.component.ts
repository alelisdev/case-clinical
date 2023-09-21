import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core'
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
  selector: 'formly-field-file',
  template: `
    <ng-container *ngIf="this.document$ | async as file">
      <ng-container *ngIf="file?.name === null">
        <input
          type="file"
          webUiFormFieldFile
          [formlyAttributes]="field"
          [multiple]="to.multiple"
          (change)="fileChanged($event)"
        />
      </ng-container>
      <ng-container *ngIf="file && file?.name !== null">
        <div class="flex flex-row">
          <a
            webUiFormFieldFile
            ngDefaultControl
            class="text-blue-500 no-underline hover:underline truncate"
            [download]="file?.name"
            [formControl]="formControl"
            [formlyAttributes]="field"
            (click)="this.to.clickedLink && this.to.clickedLink()"
            >{{ file?.name }}
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="transparent"
            viewBox="0 0 24 24"
            stroke="currentColor"
            (click)="delete($event)"
            style="fill:transparent"
          >
            <path
              class="text-red-500 w-5 h-5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldFile extends FieldType implements OnInit, AfterViewInit {
  @Output() clickedLink = new EventEmitter<any>()

  document$: Observable<DocumentInput> = of({ name: null })

  fileName = ''
  url = ''
  viewDocument = ''

  constructor(private ref: ChangeDetectorRef, private domSanitizer: DomSanitizer) {
    super()
  }

  ngOnInit() {
    this.formControl.valueChanges.subscribe((changes) => this.formControlValueChanged(changes))


    if (this.formControl.value && this.formControl.value.name) {

      this.formControlValueChanged(this.formControl.value)
    }
  }


  ngAfterViewInit(){
    if(this.to.document$){
      this.document$ = from(this.to.document$)
      this.document$.pipe(tap((d) => console.log))

      this.ref.markForCheck()
    }
  }

  formControlValueChanged(event) {
    if (event?.name) {
      this.document$ = of({ name: event?.name, attachment: event.attachment })
    }
    this.ref.markForCheck()
  }

  delete($event) {
    this.to.delete && this.to.delete($event);this.document$ = of({ name: null })
  }

  fileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader()

        var file = event.target.files[0]

        var document: DocumentInput = {
          name: file.name,
          extension: file.type,
        }

        reader.onload = (event: any) => {
          document.attachment = event.target.result

          this.document$ = of(document)

          if(this.to && this.to.onChange){
            this.to.onChange && this.to.onChange(document)
          }

          this.formControl.markAsDirty()
          this.formControl.patchValue(document)
          this.formControl.updateValueAndValidity()

          console.log(this.formControl)

          this.ref.markForCheck()
          this.ref.detectChanges()
        }
        //Trigger the onload event above with the readAs method
        reader.readAsDataURL(event.target.files[i])
      }
    }
  }
}
