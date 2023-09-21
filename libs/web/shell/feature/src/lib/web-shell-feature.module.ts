
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtraOptions,PreloadAllModules, Route, RouterModule, Routes } from '@angular/router'
import { IsAdminGuard,IsLoggedInGuard, WebAuthDataAccessModule } from '@case-clinical/web/auth/data-access'
import { LayoutComponent } from 'libs/web/layout/feature/web-layout/src/lib/layout.component'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MarkdownModule } from 'ngx-markdown'
import { FuseModule } from '@fuse/fuse.module'
import { FuseConfigModule } from '@fuse/services/config/config.module'
import { FuseMockApiModule } from '@fuse/lib/mock-api'
import { CoreModule } from '@case-clinical/core'
import { appConfig } from '@case-clinical/core/config'
import { LayoutModule } from '@case-clinical/web-layout'
import { AuthGuard } from '@case-clinical/core/auth'
import { mockApiServices } from 'libs/web/mock-api';
import { InitialDataResolver } from '@case-clinical/web/core/data-access'
import { WebAuthFeatureModule } from '@case-clinical/web/auth/feature'
// import { AuthGuard } from 'libs/core/auth/src/lib/guards/auth.guard'


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  // Redirect empty path to '/dashboards/project'
  {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},
  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

  // Landing routes
  {
      path: '',
      component  : LayoutComponent,
      data: {
          layout: 'empty'
      },
      children   : [
          {path: 'home', loadChildren: () => import('libs/web/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
          {path: 'esign', loadChildren: () => import('libs/web/modules/signature/signature.module').then(m => m.SignatureModule)},

          {path: 'form-builder-example', loadChildren: () => import('libs/web/modules/admin/form-builder-test/form-builder-example.module').then(m => m.JsonFormBuilderExampleModule)},
          {path: 'web-templates', loadChildren: () => import('libs/web/modules/admin/web-templates/web-templates.module').then(m => m.WebTemplatesModule)},
          {path: 'preview/:config', loadChildren: () => import('@case-clinical/web/ui/formly-designer-preview').then(m => m.JsonFormPreviewModule)},
          {path: 'fuse-dashboard', loadChildren: () => import('@case-clinical/web/modules').then(m => m.FuseDashboardModule)},
      ]
  },

  // Admin routes
  {
      path: '',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component  : LayoutComponent,
      resolve    : {
          initialData: InitialDataResolver,
      },
      children: [
        {
          path: 'settings', loadChildren: () => import('@case-clinical/web/auth/feature').then(m => m.SettingsModule)
        },
        // Dashboards
        {
          path: 'dashboards', children: [
            { path: 'project', loadChildren: () => import('@case-clinical/web/modules').then(m => m.ProjectModule) },
            { path: 'analytics', loadChildren: () => import('@case-clinical/web/modules').then(m => m.AnalyticsModule) },
            { path: 'finance', loadChildren: () => import('@case-clinical/web/modules').then(m => m.FinanceModule) },
            { path: 'crypto', loadChildren: () => import('@case-clinical/web/modules').then(m => m.CryptoModule) },
            { path: 'underwriting', loadChildren: () => import('@case-clinical/web/modules').then(m => m.UnderwritingDashboardModule) },
            { path: 'mis', loadChildren: () => import('@case-clinical/web/modules').then(m => m.MisDashboardModule) },
            { path: 'attorney', loadChildren: () => import('@case-clinical/web/dashboard/feature').then(m => m.WebDashboardFeatureModule) },
            { path: 'cube-dashboard', loadChildren: () => import('@case-clinical/web/modules').then(m => m.CubeDashboardModule) },
          ]
        },

          // Apps
          {path: 'apps', children: [
            {path: 'calendar', loadChildren: () => import('libs/web/full-calendar/feature/src').then(m => m.WebFullCalendarFeatureModule)},
              {path: 'academy', loadChildren: () => import('libs/web/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule)},
              // {path: 'chat', loadChildren: () => import('libs/web/modules/admin/apps/chat/chat.module').then(m => m.ChatModule)},
              {path: 'chat', loadChildren: () => import('@case-clinical/web/chat/feature').then(m => m.ChatModule)},
              {path: 'contacts', loadChildren: () => import('libs/web/modules/admin/apps/contacts/contacts.module').then(m => m.ContactsModule)},
              {path: 'ecommerce', loadChildren: () => import('libs/web/modules/admin/apps/ecommerce/ecommerce.module').then(m => m.ECommerceModule)},
              {path: 'file-manager', loadChildren: () => import('libs/web/modules/admin/apps/file-manager/file-manager.module').then(m => m.FileManagerModule)},
              {path: 'help-center', loadChildren: () => import('libs/web/modules/admin/apps/help-center/help-center.module').then(m => m.HelpCenterModule)},
              // {path: 'mailbox', loadChildren: () => import('libs/web/modules/admin/apps/mailbox/mailbox.module').then(m => m.MailboxModule)},
              {path: 'mailbox', loadChildren: () => import('@case-clinical/web/mailbox/feature').then(m => m.MailboxModule)},
              {path: 'notes', loadChildren: () => import('libs/web/modules/admin/apps/notes/notes.module').then(m => m.NotesModule)},
              {path: 'scrumboard', loadChildren: () => import('libs/web/modules/admin/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule)},
              {path: 'tasks', loadChildren: () => import('libs/web/modules/admin/apps/tasks/tasks.module').then(m => m.TasksModule)},
          ]},

          {path: 'queues', children: [
            {path: 'awards', loadChildren: () => import('@case-clinical/web/award/feature').then(m => m.WebAwardFeatureModule)},
            {path: 'clinical-provider-services', loadChildren: () => import('@case-clinical/web/clinical-provider-service/feature').then(m => m.WebClinicalProviderServiceFeatureModule)},
            {path: 'educations', loadChildren: () => import('@case-clinical/web/education/feature').then(m => m.WebEducationFeatureModule)},
            {path: 'experiences', loadChildren: () => import('@case-clinical/web/experience/feature').then(m => m.WebExperienceFeatureModule)},
            {path: 'reviews', loadChildren: () => import('@case-clinical/web/review/feature').then(m => m.WebReviewFeatureModule)},
            {path: 'services', loadChildren: () => import('@case-clinical/web/service/feature').then(m => m.WebServiceFeatureModule)},
            {path: 'specialties', loadChildren: () => import('@case-clinical/web/specialty/feature').then(m => m.WebSpecialtyFeatureModule)},
            {path: 'accident-types', loadChildren: () => import('@case-clinical/web/accident-type/feature').then(m => m.WebAccidentTypeFeatureModule)},
            {path: 'account-statuses', loadChildren: () => import('@case-clinical/web/account-status/feature').then(m => m.WebAccountStatusFeatureModule)},
            {path: 'adverse-insurance-statuses', loadChildren: () => import('@case-clinical/web/adverse-insurance-status/feature').then(m => m.WebAdverseInsuranceStatusFeatureModule)},
            {path: 'agreement-types', loadChildren: () => import('@case-clinical/web/agreement-type/feature').then(m => m.WebAgreementTypeFeatureModule)},
            {path: 'appointments', loadChildren: () => import('@case-clinical/web/appointment/feature').then(m => m.WebAppointmentFeatureModule)},
            {path: 'appointment-statuses', loadChildren: () => import('@case-clinical/web/appointment-status/feature').then(m => m.WebAppointmentStatusFeatureModule)},
            {path: 'assigned-documents', loadChildren: () => import('@case-clinical/web/assigned-document/feature').then(m => m.WebAssignedDocumentFeatureModule)},
            {path: 'attorneys', loadChildren: () => import('@case-clinical/web/attorney/feature').then(m => m.WebAttorneyFeatureModule)},
            {path: 'attorney-statuses', loadChildren: () => import('@case-clinical/web/attorney-status/feature').then(m => m.WebAttorneyStatusFeatureModule)},
            {path: 'attorney-types', loadChildren: () => import('@case-clinical/web/attorney-type/feature').then(m => m.WebAttorneyTypeFeatureModule)},
            {path: 'authorization-kinds', loadChildren: () => import('@case-clinical/web/authorization-kind/feature').then(m => m.WebAuthorizationKindFeatureModule)},
            {path: 'authorization-statuses', loadChildren: () => import('@case-clinical/web/authorization-status/feature').then(m => m.WebAuthorizationStatusFeatureModule)},
            {path: 'banks', loadChildren: () => import('@case-clinical/web/bank/feature').then(m => m.WebBankFeatureModule)},
            {path: 'batch-controls', loadChildren: () => import('@case-clinical/web/batch-control/feature').then(m => m.WebBatchControlFeatureModule)},
            {path: 'calculation-basis-types', loadChildren: () => import('@case-clinical/web/calculation-basis-type/feature').then(m => m.WebCalculationBasisTypeFeatureModule)},
            {path: 'case-accounts', loadChildren: () => import('@case-clinical/web/case-account/feature').then(m => m.WebCaseAccountFeatureModule)},
            {path: 'case-account-payments', loadChildren: () => import('@case-clinical/web/case-account-payment/feature').then(m => m.WebCaseAccountPaymentFeatureModule)},
            {path: 'case-pre-accidents', loadChildren: () => import('@case-clinical/web/case-pre-accident/feature').then(m => m.WebCasePreAccidentFeatureModule)},
            {path: 'case-pre-injuries', loadChildren: () => import('@case-clinical/web/case-pre-injury/feature').then(m => m.WebCasePreInjuryFeatureModule)},
            {path: 'case-pre-problems', loadChildren: () => import('@case-clinical/web/case-pre-problem/feature').then(m => m.WebCasePreProblemFeatureModule)},
            {path: 'case-pre-procedures', loadChildren: () => import('@case-clinical/web/case-pre-procedure/feature').then(m => m.WebCasePreProcedureFeatureModule)},
            {path: 'case-procedures', loadChildren: () => import('@case-clinical/web/case-procedure/feature').then(m => m.WebCaseProcedureFeatureModule)},
            {path: 'case-progress-statuses', loadChildren: () => import('@case-clinical/web/case-progress-status/feature').then(m => m.WebCaseProgressStatusFeatureModule)},
            {path: 'case-statuses', loadChildren: () => import('@case-clinical/web/case-status/feature').then(m => m.WebCaseStatusFeatureModule)},
            {path: 'case-types', loadChildren: () => import('@case-clinical/web/case-type/feature').then(m => m.WebCaseTypeFeatureModule)},
            {path: 'categories', loadChildren: () => import('@case-clinical/web/category/feature').then(m => m.WebCategoryFeatureModule)},
            {path: 'claims', loadChildren: () => import('@case-clinical/web/claim/feature').then(m => m.WebClaimFeatureModule)},
            {path: 'claim-procedures', loadChildren: () => import('@case-clinical/web/claim-procedure/feature').then(m => m.WebClaimProcedureFeatureModule)},
            {path: 'claim-statuses', loadChildren: () => import('@case-clinical/web/claim-status/feature').then(m => m.WebClaimStatusFeatureModule)},
            {path: 'clinical-providers', loadChildren: () => import('@case-clinical/web/clinical-provider/feature').then(m => m.WebClinicalProviderFeatureModule)},
            {path: 'clinical-provider-locations', loadChildren: () => import('@case-clinical/web/clinical-provider-location/feature').then(m => m.WebClinicalProviderLocationFeatureModule)},
            {path: 'clinical-provider-location-availabilities', loadChildren: () => import('@case-clinical/web/clinical-provider-location-availability/feature').then(m => m.WebClinicalProviderLocationAvailabilityFeatureModule)},
            {path: 'clinical-provider-specialties', loadChildren: () => import('@case-clinical/web/clinical-provider-specialty/feature').then(m => m.WebClinicalProviderSpecialtyFeatureModule)},
            {path: 'clinical-provider-tags', loadChildren: () => import('@case-clinical/web/clinical-provider-tag/feature').then(m => m.WebClinicalProviderTagFeatureModule)},
            {path: 'contacts', loadChildren: () => import('@case-clinical/web/contact/feature').then(m => m.WebContactFeatureModule)},
            {path: 'contact-emails', loadChildren: () => import('@case-clinical/web/contact-email/feature').then(m => m.WebContactEmailFeatureModule)},
            {path: 'contact-kinds', loadChildren: () => import('@case-clinical/web/contact-kind/feature').then(m => m.WebContactKindFeatureModule)},
            {path: 'contact-phone-numbers', loadChildren: () => import('@case-clinical/web/contact-phone-number/feature').then(m => m.WebContactPhoneNumberFeatureModule)},
            {path: 'contact-settings', loadChildren: () => import('@case-clinical/web/contact-setting/feature').then(m => m.WebContactSettingFeatureModule)},
            {path: 'contact-tags', loadChildren: () => import('@case-clinical/web/contact-tag/feature').then(m => m.WebContactTagFeatureModule)},
            {path: 'contracts', loadChildren: () => import('@case-clinical/web/contract/feature').then(m => m.WebContractFeatureModule)},
            {path: 'contracted-rates', loadChildren: () => import('@case-clinical/web/contracted-rate/feature').then(m => m.WebContractedRateFeatureModule)},
            {path: 'contracted-rate-kinds', loadChildren: () => import('@case-clinical/web/contracted-rate-kind/feature').then(m => m.WebContractedRateKindFeatureModule)},
            {path: 'contract-kinds', loadChildren: () => import('@case-clinical/web/contract-kind/feature').then(m => m.WebContractKindFeatureModule)},
            {path: 'contract-terms', loadChildren: () => import('@case-clinical/web/contract-term/feature').then(m => m.WebContractTermFeatureModule)},
            {path: 'cost-categories', loadChildren: () => import('@case-clinical/web/cost-category/feature').then(m => m.WebCostCategoryFeatureModule)},
            {path: 'countries', loadChildren: () => import('@case-clinical/web/country/feature').then(m => m.WebCountryFeatureModule)},
            {path: 'diagnosis-codes', loadChildren: () => import('@case-clinical/web/diagnosis-code/feature').then(m => m.WebDiagnosisCodeFeatureModule)},
            {path: 'documents', loadChildren: () => import('@case-clinical/web/document/feature').then(m => m.WebDocumentFeatureModule)},
            {path: 'document-types', loadChildren: () => import('@case-clinical/web/document-type/feature').then(m => m.WebDocumentTypeFeatureModule)},
            {path: 'durable-medical-equipments', loadChildren: () => import('@case-clinical/web/durable-medical-equipment/feature').then(m => m.WebDurableMedicalEquipmentFeatureModule)},
            {path: 'equipment', loadChildren: () => import('@case-clinical/web/equipment/feature').then(m => m.WebEquipmentFeatureModule)},
            {path: 'ethnicities', loadChildren: () => import('@case-clinical/web/ethnicity/feature').then(m => m.WebEthnicityFeatureModule)},
            {path: 'facility-fee-schedules', loadChildren: () => import('@case-clinical/web/facility-fee-schedule/feature').then(m => m.WebFacilityFeeScheduleFeatureModule)},
            {path: 'favorite-providers', loadChildren: () => import('@case-clinical/web/favorite-provider/feature').then(m => m.WebFavoriteProviderFeatureModule)},
            {path: 'fee-schedules', loadChildren: () => import('@case-clinical/web/fee-schedule/feature').then(m => m.WebFeeScheduleFeatureModule)},
            {path: 'firms', loadChildren: () => import('@case-clinical/web/firm/feature').then(m => m.WebFirmFeatureModule)},
            {path: 'firm-statuses', loadChildren: () => import('@case-clinical/web/firm-status/feature').then(m => m.WebFirmStatusFeatureModule)},
            {path: 'genders', loadChildren: () => import('@case-clinical/web/gender/feature').then(m => m.WebGenderFeatureModule)},
            {path: 'guidelines', loadChildren: () => import('@case-clinical/web/guideline/feature').then(m => m.WebGuidelineFeatureModule)},
            {path: 'guideline-useds', loadChildren: () => import('@case-clinical/web/guideline-used/feature').then(m => m.WebGuidelineUsedFeatureModule)},
            {path: 'health-insurances', loadChildren: () => import('@case-clinical/web/health-insurance/feature').then(m => m.WebHealthInsuranceFeatureModule)},
            {path: 'implants', loadChildren: () => import('@case-clinical/web/implant/feature').then(m => m.WebImplantFeatureModule)},
            {path: 'implant-categories', loadChildren: () => import('@case-clinical/web/implant-category/feature').then(m => m.WebImplantCategoryFeatureModule)},
            {path: 'insurances', loadChildren: () => import('@case-clinical/web/insurance/feature').then(m => m.WebInsuranceFeatureModule)},
            {path: 'insurance-sectors', loadChildren: () => import('@case-clinical/web/insurance-sector/feature').then(m => m.WebInsuranceSectorFeatureModule)},
            {path: 'insurance-types', loadChildren: () => import('@case-clinical/web/insurance-type/feature').then(m => m.WebInsuranceTypeFeatureModule)},
            {path: 'integrations', loadChildren: () => import('@case-clinical/web/integration/feature').then(m => m.WebIntegrationFeatureModule)},
            {path: 'invoices', loadChildren: () => import('@case-clinical/web/invoice/feature').then(m => m.WebInvoiceFeatureModule)},
            {path: 'journal-entries', loadChildren: () => import('@case-clinical/web/journal-entry/feature').then(m => m.WebJournalEntryFeatureModule)},
            {path: 'journal-entry-templates', loadChildren: () => import('@case-clinical/web/journal-entry-template/feature').then(m => m.WebJournalEntryTemplateFeatureModule)},
            {path: 'languages', loadChildren: () => import('@case-clinical/web/language/feature').then(m => m.WebLanguageFeatureModule)},
            {path: 'legal-cases', loadChildren: () => import('@case-clinical/web/legal-case/feature').then(m => m.WebLegalCaseFeatureModule)},
            {path: 'locations', loadChildren: () => import('@case-clinical/web/location/feature').then(m => m.WebLocationFeatureModule)},
            {path: 'manufacturers', loadChildren: () => import('@case-clinical/web/manufacturer/feature').then(m => m.WebManufacturerFeatureModule)},
            {path: 'medical-conditions', loadChildren: () => import('@case-clinical/web/medical-condition/feature').then(m => m.WebMedicalConditionFeatureModule)},
            {path: 'medical-condition-providers', loadChildren: () => import('@case-clinical/web/medical-condition-provider/feature').then(m => m.WebMedicalConditionProviderFeatureModule)},
            {path: 'medical-records', loadChildren: () => import('@case-clinical/web/medical-record/feature').then(m => m.WebMedicalRecordFeatureModule)},
            {path: 'med-levels', loadChildren: () => import('@case-clinical/web/med-level/feature').then(m => m.WebMedLevelFeatureModule)},
            {path: 'messages', loadChildren: () => import('@case-clinical/web/message/feature').then(m => m.WebMessageFeatureModule)},
            {path: 'navigations', loadChildren: () => import('@case-clinical/web/navigation/feature').then(m => m.WebNavigationFeatureModule)},
            {path: 'notifications', loadChildren: () => import('@case-clinical/web/notification/feature').then(m => m.WebNotificationFeatureModule)},
            {path: 'organizations', loadChildren: () => import('@case-clinical/web/organization/feature').then(m => m.WebOrganizationFeatureModule)},
            {path: 'patients', loadChildren: () => import('@case-clinical/web/patient/feature').then(m => m.WebPatientFeatureModule)},
            {path: 'patient-studies', loadChildren: () => import('@case-clinical/web/patient-study/feature').then(m => m.WebPatientStudyFeatureModule)},
            {path: 'patient-treatment-statuses', loadChildren: () => import('@case-clinical/web/patient-treatment-status/feature').then(m => m.WebPatientTreatmentStatusFeatureModule)},
            {path: 'payments', loadChildren: () => import('@case-clinical/web/payment/feature').then(m => m.WebPaymentFeatureModule)},
            {path: 'payment-application-methods', loadChildren: () => import('@case-clinical/web/payment-application-method/feature').then(m => m.WebPaymentApplicationMethodFeatureModule)},
            {path: 'payment-types', loadChildren: () => import('@case-clinical/web/payment-type/feature').then(m => m.WebPaymentTypeFeatureModule)},
            {path: 'payor-types', loadChildren: () => import('@case-clinical/web/payor-type/feature').then(m => m.WebPayorTypeFeatureModule)},
            {path: 'pch-providers', loadChildren: () => import('@case-clinical/web/pch-provider/feature').then(m => m.WebPchProviderFeatureModule)},
            {path: 'place-of-services', loadChildren: () => import('@case-clinical/web/place-of-service/feature').then(m => m.WebPlaceOfServiceFeatureModule)},
            {path: 'portfolios', loadChildren: () => import('@case-clinical/web/portfolio/feature').then(m => m.WebPortfolioFeatureModule)},
            {path: 'prescriptions', loadChildren: () => import('@case-clinical/web/prescription/feature').then(m => m.WebPrescriptionFeatureModule)},
            {path: 'prior-auth-dmes', loadChildren: () => import('@case-clinical/web/prior-auth-dme/feature').then(m => m.WebPriorAuthDmeFeatureModule)},
            {path: 'prior-auth-guidelines', loadChildren: () => import('@case-clinical/web/prior-auth-guideline/feature').then(m => m.WebPriorAuthGuidelineFeatureModule)},
            {path: 'prior-authorization-diagnosis-codes', loadChildren: () => import('@case-clinical/web/prior-authorization-diagnosis-code/feature').then(m => m.WebPriorAuthorizationDiagnosisCodeFeatureModule)},
            {path: 'prior-authorization-equipments', loadChildren: () => import('@case-clinical/web/prior-authorization-equipment/feature').then(m => m.WebPriorAuthorizationEquipmentFeatureModule)},
            {path: 'prior-authorization-implants', loadChildren: () => import('@case-clinical/web/prior-authorization-implant/feature').then(m => m.WebPriorAuthorizationImplantFeatureModule)},
            {path: 'prior-authorization-procedure-codes', loadChildren: () => import('@case-clinical/web/prior-authorization-procedure-code/feature').then(m => m.WebPriorAuthorizationProcedureCodeFeatureModule)},
            {path: 'prior-authorization-requests', loadChildren: () => import('@case-clinical/web/prior-authorization-request/feature').then(m => m.WebPriorAuthorizationRequestFeatureModule)},
            {path: 'prior-meds-to-dates', loadChildren: () => import('@case-clinical/web/prior-meds-to-date/feature').then(m => m.WebPriorMedsToDateFeatureModule)},
            {path: 'prior-meds-to-date-statuses', loadChildren: () => import('@case-clinical/web/prior-meds-to-date-status/feature').then(m => m.WebPriorMedsToDateStatusFeatureModule)},
            {path: 'procedures', loadChildren: () => import('@case-clinical/web/procedure/feature').then(m => m.WebProcedureFeatureModule)},
            {path: 'procedure-sites', loadChildren: () => import('@case-clinical/web/procedure-site/feature').then(m => m.WebProcedureSiteFeatureModule)},
            {path: 'procedure-types', loadChildren: () => import('@case-clinical/web/procedure-type/feature').then(m => m.WebProcedureTypeFeatureModule)},
            {path: 'procedure-vendors', loadChildren: () => import('@case-clinical/web/procedure-vendor/feature').then(m => m.WebProcedureVendorFeatureModule)},
            {path: 'processes', loadChildren: () => import('@case-clinical/web/process/feature').then(m => m.WebProcessFeatureModule)},
            {path: 'vendor-locations', loadChildren: () => import('@case-clinical/web/vendor-location/feature').then(m => m.WebVendorLocationFeatureModule)},
            {path: 'reconciliation-period-types', loadChildren: () => import('@case-clinical/web/reconciliation-period-type/feature').then(m => m.WebReconciliationPeriodTypeFeatureModule)},
            {path: 'required-fields', loadChildren: () => import('@case-clinical/web/required-field/feature').then(m => m.WebRequiredFieldFeatureModule)},
            {path: 'roles', loadChildren: () => import('@case-clinical/web/role/feature').then(m => m.WebRoleFeatureModule)},
            {path: 'role-permissions', loadChildren: () => import('@case-clinical/web/role-permission/feature').then(m => m.WebRolePermissionFeatureModule)},
            {path: 'settings', loadChildren: () => import('@case-clinical/web/setting/feature').then(m => m.WebSettingFeatureModule)},
            {path: 'shortcuts', loadChildren: () => import('@case-clinical/web/shortcut/feature').then(m => m.WebShortcutFeatureModule)},
            {path: 'surgical-positions', loadChildren: () => import('@case-clinical/web/surgical-position/feature').then(m => m.WebSurgicalPositionFeatureModule)},
            {path: 'tags', loadChildren: () => import('@case-clinical/web/tag/feature').then(m => m.WebTagFeatureModule)},
            {path: 'teams', loadChildren: () => import('@case-clinical/web/team/feature').then(m => m.WebTeamFeatureModule)},
            {path: 'team-roles', loadChildren: () => import('@case-clinical/web/team-role/feature').then(m => m.WebTeamRoleFeatureModule)},
            {path: 'team-users', loadChildren: () => import('@case-clinical/web/team-user/feature').then(m => m.WebTeamUserFeatureModule)},
            {path: 'templates', loadChildren: () => import('@case-clinical/web/template/feature').then(m => m.WebTemplateFeatureModule)},
            {path: 'users', loadChildren: () => import('@case-clinical/web/user/feature').then(m => m.WebUserFeatureModule)},
            {path: 'user-roles', loadChildren: () => import('@case-clinical/web/user-role/feature').then(m => m.WebUserRoleFeatureModule)},
            {path: 'vendors', loadChildren: () => import('@case-clinical/web/vendor/feature').then(m => m.WebVendorFeatureModule)},
            {path: 'vendor-types', loadChildren: () => import('@case-clinical/web/vendor-type/feature').then(m => m.WebVendorTypeFeatureModule)},
            {path: 'visit-kinds', loadChildren: () => import('@case-clinical/web/visit-kind/feature').then(m => m.WebVisitKindFeatureModule)},
            {path: 'write-offs', loadChildren: () => import('@case-clinical/web/write-off/feature').then(m => m.WebWriteOffFeatureModule)},
            {path: 'write-off-statuses', loadChildren: () => import('@case-clinical/web/write-off-status/feature').then(m => m.WebWriteOffStatusFeatureModule)},
            {path: 'leads', loadChildren: () => import('@case-clinical/web/lead/feature').then(m => m.WebLeadFeatureModule)},
            {path: 'body-part-leads', loadChildren: () => import('@case-clinical/web/body-part-lead/feature').then(m => m.WebBodyPartLeadFeatureModule)},
            {path: 'body-parts', loadChildren: () => import('@case-clinical/web/body-part/feature').then(m => m.WebBodyPartFeatureModule)},
            {path: 'lead-actions', loadChildren: () => import('@case-clinical/web/lead-action/feature').then(m => m.WebLeadActionFeatureModule)},
            {path: 'lead-statuses', loadChildren: () => import('@case-clinical/web/lead-status/feature').then(m => m.WebLeadStatusFeatureModule)},
            {path: 'lead-sources', loadChildren: () => import('@case-clinical/web/lead-source/feature').then(m => m.WebLeadSourceFeatureModule)},
            {path: 'severities', loadChildren: () => import('@case-clinical/web/severity/feature').then(m => m.WebSeverityFeatureModule)},
            {path: 'invoices', loadChildren: () => import('@case-clinical/web/invoice/feature').then(m => m.WebInvoiceFeatureModule)},
            {path: 'authorizations', loadChildren: () => import('@case-clinical/web/authorization/feature').then(m => m.WebAuthorizationFeatureModule)},
            {path: 'authorization-categories', loadChildren: () => import('@case-clinical/web/authorization-category/feature').then(m => m.WebAuthorizationCategoryFeatureModule)},
            {path: 'authorization-diagnosis-codes', loadChildren: () => import('@case-clinical/web/authorization-diagnosis-code/feature').then(m => m.WebAuthorizationDiagnosisCodeFeatureModule)},
            {path: 'authorization-types', loadChildren: () => import('@case-clinical/web/authorization-type/feature').then(m => m.WebAuthorizationTypeFeatureModule)},
            {path: 'procedure-or-treatment-requests', loadChildren: () => import('@case-clinical/web/procedure-or-treatment-request/feature').then(m => m.WebProcedureOrTreatmentRequestFeatureModule)},
            {path: 'procedure-or-treatment-request-authorizations', loadChildren: () => import('@case-clinical/web/procedure-or-treatment-request-authorization/feature').then(m => m.WebProcedureOrTreatmentRequestAuthorizationFeatureModule)},
            {path: 'procedure-or-treatment-request-diagnosis-codes', loadChildren: () => import('@case-clinical/web/procedure-or-treatment-request-diagnosis-code/feature').then(m => m.WebProcedureOrTreatmentRequestDiagnosisCodeFeatureModule)},
            {path: 'recommended-orders', loadChildren: () => import('@case-clinical/web/recommended-order/feature').then(m => m.WebRecommendedOrderFeatureModule)},
            {path: 'recommended-order-authorizations', loadChildren: () => import('@case-clinical/web/recommended-order-authorization/feature').then(m => m.WebRecommendedOrderAuthorizationFeatureModule)},
            {path: 'recommended-order-diagnosis-codes', loadChildren: () => import('@case-clinical/web/recommended-order-diagnosis-code/feature').then(m => m.WebRecommendedOrderDiagnosisCodeFeatureModule)},
            {path: 'referral-requests', loadChildren: () => import('@case-clinical/web/referral-request/feature').then(m => m.WebReferralRequestFeatureModule)},
            {path: 'request-additional-visits', loadChildren: () => import('@case-clinical/web/request-additional-visit/feature').then(m => m.WebRequestAdditionalVisitFeatureModule)},
            {path: 'procedure-vendor-statuses', loadChildren: () => import('@case-clinical/web/procedure-vendor-status/feature').then(m => m.WebProcedureVendorStatusFeatureModule)},
            {path: 'procedure-statuses', loadChildren: () => import('@case-clinical/web/procedure-status/feature').then(m => m.WebProcedureStatusFeatureModule)},
            {path: 'task-items', loadChildren: () => import('@case-clinical/web/task-item/feature').then(m => m.WebTaskItemFeatureModule)},
            {path: 'task-tags', loadChildren: () => import('@case-clinical/web/task-tag/feature').then(m => m.WebTaskTagFeatureModule)} 
            ]},
      ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: 'always',
      useHash: false,
      //enableTracing: true,
      //preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
    WebAuthDataAccessModule,
    WebAuthFeatureModule

  ],
})
export class WebShellFeatureModule {}
