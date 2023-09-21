import { WebUiLaIconModule } from './../../../la-icon/src/lib/web-ui-la-icon.module';
import { UtilitySharedModule } from './../../../../utility-shared.module';
import { WebServicesModule } from './../../../../services/src/lib/web-services.module';
import { UiFormConextProviderModule } from './../../../form/src/lib/context-provider/ui-form-context-provider.module';
import { TailwindService } from './services/tailwind.service';
import { AgGridModule } from '@ag-grid-community/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BtnDeleteCellRenderer } from './cell-renderers/delete-cell-renderer';
import { BtnEditCellRenderer } from './cell-renderers/edit-cell-renderer';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core'
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router'
import { UiCallbackExpressionComponent } from './types/web-ui-callback-expression.component';
import { UiExpressionComponent } from './types/web-ui-form-expression.component';
import { UiValidationComponent } from './types/web-ui-form-validation.component';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { WebUiFormFieldEditComponent } from './form-designer/web-ui-form-field-edit';
import { WebUiFormlyConfigComponent } from './form-designer/form-config.component';
import { WebUiFormlyDesignerComponent } from './form-designer/web-ui-formly-designer.component'
import { WebUiFormlyJsonFormComponent } from './web-ui-formly-json-form.component';
import { WebUiFormlyToolboxComponent } from './form-designer/toolbox.component';
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { PreviewEditComponent } from './preview-edit/preview-edit.component'
import { WebUiFieldsTreeComponent } from './preview-edit/fields-tree.component'
import { FormlyDesignerService } from './services/formly-designer.service';
import { FieldPropertiesComponent } from './preview-edit/field-properties.component';
import { WebUiRouterKeysEditComponent } from './form-designer/router-keys-edit.component'
import { WebUiSubmitActionEditComponent } from './form-designer/submit-action-edit.component'
import { ConfigImortComponent } from './preview-edit/config.import.component';
import { WebTemplateDesignerComponent } from './web-template-designer/web-template-designer.component';
import { WebUiTemplateSelectorComponent } from './web-template-designer/web-template-selector';
import { BtnCopyCellRenderer } from './cell-renderers/copy-cell-renderer';
import { AngularSplitModule } from 'angular-split';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormlyDesigerStore } from './formly-designer.store';
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'
import { FormlyModalComponent } from './wrappers/formly-modal/modal.component';
import { ChildFormCreateComponent } from './child-form-create.component';
import { WebUiFormlyFormSwitchModule } from '@case-clinical/web/ui/formly-form-switch';
import { UiFormKanbanComponent } from './wrappers/kanban/ui-form-kanban.component';
import { KanbanCardModalComponent } from './wrappers/kanban/ui-form-card-modal.component';

// import { NgxResizableModule } from '@3dgenomes/ngx-resizable';

const mask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    BtnDeleteCellRenderer,
    BtnEditCellRenderer,
    BtnCopyCellRenderer,
    ConfigImortComponent,
    ChildFormCreateComponent,
    FormlyModalComponent,
    UiCallbackExpressionComponent,
    UiExpressionComponent,
    UiValidationComponent,
    WebUiFormFieldEditComponent,
    WebUiFormlyConfigComponent,
    WebUiFormlyDesignerComponent,
    WebUiFormlyJsonFormComponent,
    WebUiFormlyToolboxComponent,
    WebUiRouterKeysEditComponent,
    WebUiFieldsTreeComponent,
    FieldPropertiesComponent,
    PreviewEditComponent,
    WebUiSubmitActionEditComponent,
    WebTemplateDesignerComponent,
    WebUiTemplateSelectorComponent,
    UiFormKanbanComponent,
    KanbanCardModalComponent,
  ],
  exports: [
    WebUiFormFieldEditComponent,
    WebUiFormlyDesignerComponent,
    WebUiFormlyJsonFormComponent,
  ],
  imports: [
      AgGridModule.withComponents({}),
      CommonModule,
      FormsModule,
      HttpClientModule,
      // NgxResizableModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      DocumentViewerModule,
      UtilitySharedModule,
      MatSelectModule,
      WebUiFormlyFormSwitchModule,
      NgSelectModule,
      NgxMaskModule.forRoot(mask),
      ReactiveFormsModule,
      RouterModule,
      WebUiButtonModule,
      WebUiLaIconModule,
      WebUiCodeModule,
      MatDividerModule,
      WebUiIconModule,
      UiFormConextProviderModule,
      MatMenuModule,
      MatIconModule,
      WebServicesModule,
      AngularSplitModule,
      DragDropModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'validation',
          component: UiValidationComponent,
        },
        {
          name: 'expression',
          component: UiExpressionComponent,
        },
        {
          name: 'callback-expression',
          component: UiCallbackExpressionComponent,
        },
        {
          name: 'formly-modal',
          component: FormlyModalComponent,
        },
      ],
      wrappers: [
        {
          name: 'kanban',
          component: UiFormKanbanComponent,
        },
      ],
    }),
  ],
  providers: [
    FormlyDesignerService,
    TailwindService,
    FormlyDesigerStore,
  ]
})
export class WebUiFormlyDesignerModule {}
