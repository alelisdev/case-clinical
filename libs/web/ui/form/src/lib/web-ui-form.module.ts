/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WebUiButtonModule } from './../../../button/src/lib/web-ui-button.module';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CardComponent } from './wrappers/card/card.component'
import { CollapseComponent } from './wrappers/collapse/collapse.component';
import { CommonModule } from '@angular/common'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';
import { FormlyFieldTabsComponent } from './wrappers/tab/tabs.component'
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core'
import { FormService } from './form.service'
import { GroupComponent } from './wrappers/group/group.component'
import { FlexBoxComponent } from './wrappers/flexbox/flexbox.component'
import { LocationPickerModule } from './types/location-picker/location-picker.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { registerTranslateExtension } from './translation.extension'
import { SectionComponent } from './wrappers/section/section.component'
import { StepperComponent } from './wrappers/stepper/stepper.component'
import { UiFormFilePreviewModule } from './types/file-preview/file-preview.module'
import { TranslocoService } from '@ngneat/transloco'
import { UiColorPickerModule } from './types/color-picker/color-picker.module';
import { UiFormContactModule } from './types/contact/ui-form-contact.module';
import { UiFormAddonsModule } from './wrappers/addons/ui-form-addons.module'
import { UiFormAgChartModule } from './types/ag-chart/ui-form-ag-chart.module';
import { UiFormChartModule } from './types/chart/ui-form-chart.module';
import { UiFormWeatherModule } from './types/weather/ui-form-weather.module'
import { UiFormCheckboxModule } from './types/checkbox/ui-form-checkbox.module'
import { UiFormClassesModule } from './types/tailwind-classes/ui-form-classes.module';
import { UiFormCodeModule } from './types/code/ui-form-code.module';
import { UiFormDateModule } from './types/date/ui-form-date.module';
import { UiFormDescriptionListModule } from './types/description-list/ui-form-description-list.module'
import { UiFormDescriptionWrapperModule } from './wrappers/description-wrapper/ui-form-description-wrapper.module'
import { UiFormDividerModule } from './types/divider/ui-form-divider.module'
import { UiFormDropdownModule } from './types/dropdown/ui-form-dropdown.module'
import { UiFormEmbedModule } from './types/embed/ui-form-embed.module';
import { UiFormEnumerationModule } from './types/enum/ui-form-enumeration.module';
import { UiFormHoroscopeModule } from './types/horoscope/ui-form-horoscope.module'
import { UiFormFieldModule } from './wrappers/form-field/ui-form-field.module'
import { UiFormFilterContainerModule } from './types/filter-container/ui-form-filter-container.module';
import { UiFormGridModule } from './types/grid/ui-form-grid.module'
import { UiFormHeadingModule } from './types/heading/ui-form-heading.module'
import { UiFormInputModule } from './types/input/ui-form-input.module'
import { UiFormLabelModule } from './types/label/ui-form-label.module'
import { UiFormLinkModule } from './types/link/ui-form-link.module';
import { UiFormlyFieldFileModule } from './types/file-upload/file-upload.module'
import { UiFormlyFieldFileNewModule } from './types/file-upload-new/file-upload.module'
import { UiFormlyFieldFileViewerModule } from './types/file-viewer/file-viewer.module'
import { UiFormlyFieldImageModule } from './types/image-upload/image-upload.module'
import { UiFormlyFieldRichTextModule } from './types/richtext/rich-text.module';
import { UiFormMarkdownModule } from './types/markdown/ui-form-markdown.module'
import { UiFormMaskedInputModule } from './types/masked-input/ui-form-masked-input.module';
import { UiFormMulticheckboxModule } from './types/multicheckbox/ui-form-multicheckbox.module'
import { UiFormOverviewModule } from './types/overview/ui-form-overview.module';
import { UiFormPhoneInputModule } from './types/phone/ui-form-phone.module';
import { UiFormRadioModule } from './types/radio/ui-form-radio.module'
import { UiFormToggleModule } from './types/toggle/ui-form-toggle.module';
import { UiFormRangeSliderModule } from './types/range/ui-form-range-slider.module';
import { UiFormRepeatModule } from './wrappers/repeat/ui-form-repeat.module'
import { UiFormSelectModule } from './types/select/ui-form-select.module'
import { UiFormSelectSearchModule } from './types/multi-select/ui-form-multi-select.module';
import { UiFormTextareaModule } from './types/textarea/ui-form-textarea.module'
import { UiFormTitleModule } from './types/title/ui-form-title.module'
import { UiFormTypeaheadModule } from './types/typeahead/ui-form-typeahead.module'
import { UiFormValidatorsModule } from './validators/ui-form-validators.module'
import { UiJsonEditorModule } from './types/json-editor/json-editor.module';
import { UiFormMusicWidgetModule } from './types/music-widget/ui-form-music-widget.module';
import { WebUiFormComponent } from './web-ui-form.component'
import { WebUiIconModule } from '@case-clinical/web/ui/icon';
import { UiFormSimpleTypeaheadModule } from './types/simple-typeahead/ui-form-simple-typeahead.module';
import { UiFormContainerModule } from './wrappers/container/ui-form-container.module';
import { UiContextProviderModule } from './wrappers/context-provider/ui-context-provider.module';
import { UiFormRowModule } from './wrappers/horizontal/ui-form-row.module';
import { UiFormParagraphModule } from './types/paragraph/ui-form-paragraph.module';
import { RouterComponent } from './wrappers/router/router.component';
import { UiFormButtonModule } from './wrappers/button/ui-form-button.module';
import { UiFormToolTipModule } from './wrappers/tooltip/ui-form-tooltip.module';
import { UiFormImageModule } from './types/image/ui-form-image.module';
import { UiFormGridContainerModule } from './wrappers/grid-container/ui-form-grid-container.module';
import { UiFormColModule } from './wrappers/vertical/ui-form-column.module';
import { OverviewHeaderComponent } from './wrappers/overview-header/overview.header.component';
import { UtilitySharedModule } from 'libs/web/utility-shared.module';
import { UiFormLaIconModule } from './types/la-icon/ui-form-icon.module';
import { UiRatingBarModule } from './types/rating-bar/ui-form-ratingBar.module';
import { GoogleMapBuilderModule } from './wrappers/googlemap/googlemapbuilder.module';
import { UiFormCircleProgressModule } from './types/circle-progress/ui-form-circle-progress.module';
import { UiFormTableModule } from './wrappers/table/ui-form-table.module';
import { UiFormTableRowModule } from './wrappers/table-row/ui-form-table-row.module';
import { UiFormNavbarModule } from './wrappers/navbar/ui-form-navbar.module';
import { UiFormNavsModule } from './types/navs/ui-form-navs.module';
import { UiFormCalendarModule } from './wrappers/calendar/ui-form-calendar.module';
import { UiFormCarouselModule } from './wrappers/carousel/ui-form-carousel.module';
import { UiFormSignaturePadModule } from './types/signature-pad/ui-form-signature-pad.module';
import { ModalComponent } from './wrappers/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { WebUiPaginationModule } from './types/pagination/web-ui-pagination.module';
import { CenterComponent } from './wrappers/center/center.component';
import { UiTimeLineStepperModule } from './wrappers/timelineStepper/timeline-stepper.module';
import { UiFormAgGridComponentModule } from './wrappers/ag-grid/ui-form-ag-grid.module';
import { UiFitHeightModule } from './wrappers/fit-height/ui-fit-height.module';
import { UiFormSplitModule } from './wrappers/split/ui-form-split.module';
import { UiFormSvgViewModule } from './types/svg-view/ui-form-svg-view.module';
import { WebUiWhereDoesItHurtModelModule } from './types/where-does-it-hurt/where-does-it-hurt-model.module';
import { WebUiFormlyFormSwitchModule } from '@case-clinical/web/ui/formly-form-switch';
import { UiFormTableOfContentsModule } from './wrappers/table-of-contents/ui-form-table-of-contents.module';
import { WebUiLaIconModule } from '@case-clinical/web/ui/la-icon';
import { UiFormDropdownButtonModule } from './wrappers/dropdown-button/ui-form-dropdown-button.module';
import { UiFormGaugeModule } from './types/gauge/ui-form-gauge.module';
import { UiFormRingCentralModule } from './types/ring-central-widget/ui-form-ring-central.module';

@NgModule({
  declarations: [
    CardComponent,
    CollapseComponent,
    FormlyFieldTabsComponent,
    GroupComponent,
    FlexBoxComponent,
    SectionComponent,
    StepperComponent,
    ModalComponent,
    WebUiFormComponent,
    RouterComponent,
    CenterComponent,
    OverviewHeaderComponent,
  ],
  exports: [WebUiFormComponent],
  imports: [
    MatButtonModule,
    UiFormRingCentralModule,
    WebUiFormlyFormSwitchModule,
    UiFormTableOfContentsModule,
    FormlyModule.forRoot({
      wrappers: [
        {
          name: 'card',
          component: CardComponent,
        },
        {
          name: 'center',
          component: CenterComponent,
        },
        {
          name: 'modal',
          component: ModalComponent,
        },
        {
          name: 'collapse',
          component: CollapseComponent,
        },
        {
          name: 'group',
          component: GroupComponent,
        },
        {
          name: 'flexbox',
          component: FlexBoxComponent,
        },
        {
          name: 'section',
          component: SectionComponent,
        },
        {
          name: 'overview-header',
          component: OverviewHeaderComponent,
        },
        {
          name: 'tab',
          component: GroupComponent,
        },
        {
          name: 'step',
          component: GroupComponent,
        },
        {
          name: 'table-column',
          component: GroupComponent,
        },
        {
          name: 'ag-grid-column',
          component: GroupComponent,
        },
        {
          name: 'tabs',
          component: FormlyFieldTabsComponent,
        },
        {
          name: 'stepper',
          component: StepperComponent,
        },
        {
          name: 'filter-bar',
          component: GroupComponent,
        },
        {
          name: 'filter-content',
          component: GroupComponent,
        },
        {
          name: 'router',
          component: RouterComponent,
        }
      ],
    }),
    CommonModule,
    DocumentViewerModule,
    GoogleMapBuilderModule,
    LocationPickerModule,
    MatExpansionModule,
    MatIconModule,
    WebUiLaIconModule,
    MatMenuModule,
    MatSelectModule,
    UiFormGaugeModule,
    MatStepperModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule,
    UiColorPickerModule,
    UiContextProviderModule,
    UiFormAddonsModule,
    UiFitHeightModule,
    UiFormAgChartModule,
    UiFormAgGridComponentModule,
    UiFormDropdownButtonModule,
    UiFormButtonModule,
    UiFormCalendarModule,
    UiFormCarouselModule,
    UiFormChartModule,
    UiFormCheckboxModule,
    UiFormCircleProgressModule,
    UiFormClassesModule,
    UiFormCodeModule,
    UiFormColModule,
    UiFormContactModule,
    UiFormContainerModule,
    UiFormDateModule,
    UiFormDescriptionListModule,
    UiFormDividerModule,
    UiFormDropdownModule,
    UiFormEmbedModule,
    UiFormEnumerationModule,
    UiFormFieldModule,
    UiFormFilePreviewModule,
    UiFormFilterContainerModule,
    UiFormGridContainerModule,
    UiFormDescriptionWrapperModule,
    UiFormGridModule,
    UiFormHeadingModule,
    UiFormHoroscopeModule,
    UiFormImageModule,
    UiFormInputModule,
    UiFormLabelModule,
    UiFormLaIconModule,
    UiFormLinkModule,
    UiFormlyFieldFileModule,
    UiFormlyFieldFileNewModule,
    UiFormlyFieldFileViewerModule,
    UiFormlyFieldImageModule,
    UiFormlyFieldRichTextModule,
    UiFormMarkdownModule,
    UiFormMaskedInputModule,
    UiFormMulticheckboxModule,
    UiFormMusicWidgetModule,
    UiFormNavbarModule,
    UiFormNavsModule,
    UiFormOverviewModule,
    UiFormParagraphModule,
    UiFormPhoneInputModule,
    UiFormRadioModule,
    UiFormRangeSliderModule,
    UiFormRepeatModule,
    UiFormRowModule,
    UiFormSelectModule,
    UiFormSelectSearchModule,
    UiFormSignaturePadModule,
    UiFormSimpleTypeaheadModule,
    UiFormSplitModule,
    UiFormSvgViewModule,
    UiFormTableModule,
    UiFormTableRowModule,
    UiFormTextareaModule,
    UiFormTitleModule,
    UiFormToggleModule,
    UiFormToolTipModule,
    UiFormTypeaheadModule,
    UiFormValidatorsModule,
    UiFormWeatherModule,
    UiJsonEditorModule,
    UiRatingBarModule,
    UiTimeLineStepperModule,
    UtilitySharedModule,
    WebUiButtonModule,
    WebUiIconModule,
    WebUiPaginationModule,
    WebUiWhereDoesItHurtModelModule,
  ],
  providers: [
    FormService,
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslocoService]
    }
  ]
})
export class WebUiFormModule { }
