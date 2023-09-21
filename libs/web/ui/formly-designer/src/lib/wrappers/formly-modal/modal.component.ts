import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { DialogService } from '@ngneat/dialog';
import { FieldType, FormlyFormBuilder } from '@ngx-formly/core'

export declare interface FormlyModalController {
  open(model: any, formState: any, store: any): void;
  close(): void;
  update(model: any, formState: any): void;
}

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],

})
export class FormlyModalComponent extends FieldType implements OnInit, FormlyModalController, AfterViewInit {
  @ViewChild('dlg') dlgTpl!: TemplateRef<any>;
  ref: any
  formName: string
  dlgModel
  store
  dlgFormData
  showSubmitButton

  constructor(private readonly dialog: DialogService, private builder: FormlyFormBuilder) {
    super();
  }

  ngOnInit(): void {
    if(this.to.formName) this.formName = this.to.formName;
    this.showSubmitButton = !this.to.hideSave;
  }

  ngAfterViewInit(): void {
    if (this.to.modalCreated && this.to.modalCreated instanceof Function) this.to.modalCreated(this);
  }

  open(model: any, formState: any, store: any): void {
    this.dlgModel = {};
    this.dlgFormData = formState;

    this.store = store
    this.ref = this.dialog.open(this.dlgTpl, {
      data: {
        value: {}
      },
      closeButton: false,
      height: 'auto',
      width: 'auto',
    })

    setTimeout(() => this.dlgModel = model, 300);
  }

  update(model: any, formState: any): void {
    this.dlgModel = {
      ...this.dlgModel,
      ...model,
    };
  }

  close(): void {
    this.ref?.close();
  }

  openDialog(tpl: TemplateRef<any>, { value, height, width }: { value?: any; height: number; width: number }) {
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

  submit(model) {
    if(this.to.submit && this.to.submit instanceof Function) this.to.submit(model);
  }
}
