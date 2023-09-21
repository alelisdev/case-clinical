import { AddressPickerComponent } from './components/address.picker.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { CardComponent } from './components/card.component';
import { CollapseComponent } from './components/collapse.component';
import { ColorPickerComponent } from './components/color.picker.component';
import { CommonModule } from '@angular/common';
import { EnumerationComponent } from './components/enumeration.component';
import { ExampleToolboxComponent } from './toolbox.component';
import { FilterBarComponent } from './components/filter.bar.component';
import { FormBuilderExampleComponent } from './form-builder-example.component';
import { FormlyModule } from '@ngx-formly/core';
import { GridComponent } from './components/grid.component';
import { GridLayoutComponent } from './components/grid.layout.component';
import { GroupComponent } from './components/group.component';
import { HeadingComponent } from './components/heading.component';
import { JsonEditorExampleComponent } from './components/json.editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { ParagraphComponent } from './components/paragraph.component';
import { RepeatComponent } from './components/repeat.component';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper.component';
import { TabsComponent } from './components/tabs.component';
import { TypeaheadComponent } from './components/typeahead.component';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { TitleComponent } from './components/title.component';
import { LinkComponent } from './components/link.component';
import { DividerComponent } from './components/divider.example';
import { DescriptionListComponent } from './components/description.list.component';
import { EmbedComponent } from './components/embed.component';
import { LabelComponent } from './components/label.component';
import { PictureComponent } from './components/picture.component';
import { BooleanComponent } from './components/boolean.component';
import { DateComponent } from './components/date.component';
import { DateTimeComponent } from './components/datetime.component';
import { DropdownComponent } from './components/drodown.component';
import { InputComponent } from './components/input.component';
import { IntegerComponent } from './components/integer.component';
import { MaskedInputComponent } from './components/masked.input.component';
import { MultiSelectComponent } from './components/multiselect.componen';
import { NumberComponent } from './components/number.component';
import { PasswordComponent } from './components/password.component';
import { TextAreaComponent } from './components/textarea.component';
import { CurrencyComponent } from './components/currency.component';
import { EmailComponent } from './components/email.component';
import { MarkdownComponent } from './components/markdown.component';
import { RichTextComponent } from './components/richtext.component';
import { SelectFormComponent } from './components/selectform.component';
import { UrlComponent } from './components/url.component';
import { RouterComponent } from './router.component';
import { VerticalComponent } from './components/vertical.component';
import { OverviewComponent } from './components/overview.component';
import { AngularChartComponent } from './components/angular.chart.component';
import { UtilitySharedModule, UiFormsSharedModule } from '@case-clinical/web/shared/ui'
import { ClassBuilderComponent } from './components/class.builder.component';
import { PieChartComponent } from './components/pie-chart.component';
import { BarChartComponent } from './components/bar-chart.component';
import { HorizontalComponent } from './components/horizontal.component';
import { LaIconComponent } from './components/la-icon.component';
import { CarouselComponent } from './components/carousel.component';
import { TableComponent } from './components/table.component';
import { GoogleMapComponent } from './components/googlemap.component';
import { AnatomicalModelComponent } from './components/anatomical-model.component';
import { MusicComponent } from './components/music.component';
import { SvgViewComponent } from './components/svg-view.component';
import { WebUiFormlyFormSwitchModule } from '@case-clinical/web/ui/formly-form-switch';
import { KanbanComponent } from './components/kanban.component';
import { AgGridComponent } from './components/ag-grid.component';
import { TimeLineStepperComponent } from './components/time-line-stepper.component';


@NgModule({
  imports: [
    AgGridModule.withComponents({}),
    CommonModule,
    FormlyModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule.forChild([{ path: '', component: FormBuilderExampleComponent }]),
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    WebUiFormlyFormSwitchModule,
    UiFormsSharedModule,
  ],
  declarations: [
    AgGridComponent,
    TableComponent,
    LaIconComponent,
    PieChartComponent,
    TimeLineStepperComponent,
    KanbanComponent,
    AddressPickerComponent,
    ClassBuilderComponent,
    AngularChartComponent,
    SvgViewComponent,
    BooleanComponent,
    CardComponent,
    MusicComponent,
    AnatomicalModelComponent,
    HorizontalComponent,
    BarChartComponent,
    CollapseComponent,
    ColorPickerComponent,
    CurrencyComponent,
    DateComponent,
    CarouselComponent,
    DateTimeComponent,
    DescriptionListComponent,
    DividerComponent,
    DropdownComponent,
    EmailComponent,
    EmbedComponent,
    EnumerationComponent,
    ExampleToolboxComponent,
    FilterBarComponent,
    FormBuilderExampleComponent,
    GridComponent,
    GoogleMapComponent,
    GridLayoutComponent,
    GroupComponent,
    HeadingComponent,
    InputComponent,
    IntegerComponent,
    JsonEditorExampleComponent,
    LabelComponent,
    LinkComponent,
    MarkdownComponent,
    MaskedInputComponent,
    MultiSelectComponent,
    NumberComponent,
    OverviewComponent,
    ParagraphComponent,
    PasswordComponent,
    PictureComponent,
    RepeatComponent,
    RichTextComponent,
    RouterComponent,
    SelectFormComponent,
    StepperComponent,
    TabsComponent,
    TextAreaComponent,
    TitleComponent,
    TypeaheadComponent,
    UrlComponent,
    VerticalComponent,
  ]
})
export class JsonFormBuilderExampleModule { }
