/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { Document } from '@case-clinical/api/document/data-access'
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormService } from '../../form.service';
import { DataContextService } from '../../context-provider/data-context.service';
import { WebUiFilePreviewComponent } from 'libs/web/ui/file-preview/web-ui-file-preview.component';

@Component({
  selector: 'ui-form-file-previewer',
  template: `
      <ui-file-preview #filePreview [mode]="to.modeOptions"></ui-file-preview>
  `,
})
export class UiFormFilePreview extends FieldType implements OnInit, OnDestroy {
  @ViewChild('filePreview') filePreviewComponent !: WebUiFilePreviewComponent;

  subscriber;

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private formService: FormService,
    private contextService: DataContextService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    const documentKey = this.to.documentKey;
    const source = this.formService.getValueForKey(documentKey, this.formState);
    if(source instanceof Observable) {
      source.pipe(takeUntil(this._unsubscribeAll)).subscribe(document => {
        if(document) {
          this.openDocument(document);
        }
      })
    } else {
      this.formControl.valueChanges.subscribe(value => {
        this.openDocument(value);
      })
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.subscriber?.unsubscribe();
  }

  openDocument(file: Document) {
    this.filePreviewComponent?.document.next(file);
  }
}
