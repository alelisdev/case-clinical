import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core'
import { DataContextService } from '../../context-provider/data-context.service';
import { UiFormBaseWrapper } from '../base-field-wrapper';
import { Subject, takeUntil } from 'rxjs';

export declare interface ModalController {
  open(model?: any): void;
  close(): void;
}

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends UiFormBaseWrapper implements OnInit, ModalController, AfterViewInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('dlg') dlgTpl!: TemplateRef<any>;
  fields: FormlyFieldConfig[] = []
  dlgForm = new FormGroup({})
  formModel: any = {}
  dlgOptions: FormlyFormOptions = {}

  ref: any

  data: any;
  constructor(service: DataContextService, private readonly dialog: DialogService, private builder: FormlyFormBuilder, elementRef: ElementRef) {
    super(service, elementRef);

  }

  ngAfterViewInit(): void {
    if (this.to.modalCreated && this.to.modalCreated instanceof Function) this.to.modalCreated(this);
  }

  open(directModel=undefined): void {
    this.dlgForm?.reset();
    if(directModel) {
      this.formModel = directModel;
    } else if (this.to.modelKey) {
      const model = this.service.getValue(this.to.modelKey);
      if(model) this.formModel = model;
    }

    this.ref = this.dialog.open(this.dlgTpl, {
      data: {
        value: {}
      },
      height: 'auto',
      width: 'auto',
    })

  }

  close(): void {
    this.ref?.close();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
      if (_data) {
        this.data = _data;
        this.dlgOptions = {
          ...this.dlgOptions,
          formState: this.data
        }

      }
    })

    if (this.field.fieldGroup?.length > 1) {
      this.fields = [this.field.fieldGroup[1]]
    }
    this.builder.buildForm(this.dlgForm, this.fields, this.formModel, this.options)
  }

  submit() {
    if (this.to.submit) {
      this.to.submit({ ...this.formModel, ...this.dlgForm.value });
    }
  this.dlgForm.reset()
   this.dialog.closeAll();
  }

  openDialog(tpl: TemplateRef<any>, { value, height, width }: { value?: any; height: number; width: number }) {
    this.dlgForm.reset()
    this.ref = this.dialog.open(tpl, {
      data: {
        value: value
      },
      height: height || 'auto',
      width: width || '50%',
    });

    this.ref.afterClosed$.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

}
