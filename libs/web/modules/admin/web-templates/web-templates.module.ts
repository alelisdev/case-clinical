import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebTemplatesComponent } from './web-templates.component';
import { WebUiFormModule } from './../../../ui/form/src/lib/web-ui-form.module';
import { WebTemplatesStore } from './web-templates.store';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3cPFfcRGTdbgdFra8MaM5x2lXd7wHGeg',
      libraries: ['places'],
    }),
    CommonModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    RouterModule.forChild([{ path: '', component: WebTemplatesComponent }]),
  ],
  declarations: [WebTemplatesComponent],
  providers: [
    WebTemplatesStore
  ]
})
export class WebTemplatesModule { }
