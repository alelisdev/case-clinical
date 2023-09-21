import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyDesignerService } from '@case-clinical/web/ui/formly-designer';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ui-json-form-preview',
  templateUrl: './json-form-preview.component.html',
  styleUrls: ['./json-form-preview.component.css']
})
export class JsonFormPreviewComponent implements OnInit, OnDestroy {

  form: any = new FormGroup({})
  formConfig = []
  fields = []
  contextData = { }
  modelData = { }
  customLayouts = {}
  schema = ""
  subscriber;

  constructor(private formlyDesignerService: FormlyDesignerService) { }

  @HostListener('window:message',['$event'])
  onMessage(e)
  {
    if (e.origin!=window.origin)
    {
      return false;
    }
    const { previewData, data } = e.data
    console.log(data);
    if(previewData) {
      const { schema, customLayouts, testData, modelData } = data;
      if(testData)
        this.contextData = testData;

      if(modelData) {
        this.modelData = modelData;
        this.contextData = {
          ...this.contextData,
          ...this.modelData,
        }
      }

      if(customLayouts)
        this.customLayouts = customLayouts;

      if(schema) {
        this.formConfig = JSON.parse(schema);
        this.schema = schema;
      }
      else
        this.formConfig = JSON.parse(this.schema);

      if(this.formConfig) {
        const _fields = this.formlyDesignerService.initializeFieldConfigs(this.formConfig, this.customLayouts)
        this.fields = _fields;
      } else {
        this.fields = [];
      }
    }
  }

  ngOnInit() {
    window.parent.postMessage({ from:"preview", status: "available" }, window.origin);
    this.subscriber = this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      for(const key in value) {
        if(value[key] === null || value[key] === undefined) delete value[key];
      }
      window.parent.postMessage({ from: 'preview', status: "modelChanged", model: value }, window.origin);
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
