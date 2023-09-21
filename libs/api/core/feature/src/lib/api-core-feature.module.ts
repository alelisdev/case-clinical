import { GraphQLIntercomModule } from '@kikstart-playground/graphql-intercom'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { HttpModule } from '@nestjs/axios'
import { join } from 'path'
import { ApiAccountFeatureModule } from '@case-clinical/api/account/feature'
import { ApiAuthFeatureModule } from '@case-clinical/api/auth/feature'
import { ApiRoleFeatureModule } from '@case-clinical/api/role/feature'
import { ApiUserRoleFeatureModule } from '@case-clinical/api/user-role/feature'
import { ApiAppointmentFeatureModule } from '@case-clinical/api/appointment/feature'
import { ApiCalendarFeatureModule } from '@case-clinical/api/calendar/feature'
import { ApiCalendarTypeFeatureModule } from '@case-clinical/api/calendar-type/feature'
import { ApiCalendarWeekdayFeatureModule } from '@case-clinical/api/calendar-weekday/feature'
import { ApiDocumentFeatureModule } from '@case-clinical/api/document/feature'
import { ApiEmailFeatureModule } from '@case-clinical/api/email/feature'
import { ApiSettingFeatureModule } from '@case-clinical/api/setting/feature'
import { ApiUserFeatureModule } from '@case-clinical/api/user/feature'
import { ApiUserCalendarFeatureModule } from '@case-clinical/api/user-calendar/feature'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'
import { ApiCoreFeatureService } from './api-core-feature.service'
import { ApiFormLayoutFeatureModule } from '@case-clinical/api/form-layout/feature'
import { ApiWhereDoesItHurtFeatureModule } from '@case-clinical/api/where-does-it-hurt/feature'
import { ApiWhereDoesItHurtSpecialtyFeatureModule } from '@case-clinical/api/where-does-it-hurt-specialty/feature'
import { ApiSideFeatureModule } from '@case-clinical/api/side/feature'
import { ApiAccidentTypeFeatureModule } from '@case-clinical/api/accident-type/feature'
import { ApiAccountStatusFeatureModule } from '@case-clinical/api/account-status/feature'
import { ApiAdverseInsuranceStatusFeatureModule } from '@case-clinical/api/adverse-insurance-status/feature'
import { ApiAgreementTypeFeatureModule } from '@case-clinical/api/agreement-type/feature'
import { ApiAssignedDocumentFeatureModule } from '@case-clinical/api/assigned-document/feature'
import { ApiAttorneyFeatureModule } from '@case-clinical/api/attorney/feature'
import { ApiAttorneyStatusFeatureModule } from '@case-clinical/api/attorney-status/feature'
import { ApiAttorneyTypeFeatureModule } from '@case-clinical/api/attorney-type/feature'
import { ApiCalculationBasisTypeFeatureModule } from '@case-clinical/api/calculation-basis-type/feature'
import { ApiCaseAccountFeatureModule } from '@case-clinical/api/case-account/feature'
import { ApiCasePreAccidentFeatureModule } from '@case-clinical/api/case-pre-accident/feature'
import { ApiCasePreInjuryFeatureModule } from '@case-clinical/api/case-pre-injury/feature'
import { ApiCasePreProblemFeatureModule } from '@case-clinical/api/case-pre-problem/feature'
import { ApiCasePreProcedureFeatureModule } from '@case-clinical/api/case-pre-procedure/feature'
import { ApiCaseProcedureFeatureModule } from '@case-clinical/api/case-procedure/feature'
import { ApiCaseProgressStatusFeatureModule } from '@case-clinical/api/case-progress-status/feature'
import { ApiCaseStatusFeatureModule } from '@case-clinical/api/case-status/feature'
import { ApiCaseTypeFeatureModule } from '@case-clinical/api/case-type/feature'
import { ApiChatFeatureModule } from '@case-clinical/api/chat/feature'
import { ApiClaimFeatureModule } from '@case-clinical/api/claim/feature'
import { ApiClaimProcedureFeatureModule } from '@case-clinical/api/claim-procedure/feature'
import { ApiClaimStatusFeatureModule } from '@case-clinical/api/claim-status/feature'
import { ApiContractFeatureModule } from '@case-clinical/api/contract/feature'
import { ApiContractedRateFeatureModule } from '@case-clinical/api/contracted-rate/feature'
import { ApiContractedRateKindFeatureModule } from '@case-clinical/api/contracted-rate-kind/feature'
import { ApiContractKindFeatureModule } from '@case-clinical/api/contract-kind/feature'
import { ApiContractTermFeatureModule } from '@case-clinical/api/contract-term/feature'
import { ApiDocumentTypeFeatureModule } from '@case-clinical/api/document-type/feature'
import { ApiEthnicityFeatureModule } from '@case-clinical/api/ethnicity/feature'
import { ApiFacilityFeeScheduleFeatureModule } from '@case-clinical/api/facility-fee-schedule/feature'
import { ApiFeeScheduleFeatureModule } from '@case-clinical/api/fee-schedule/feature'
import { ApiFirmFeatureModule } from '@case-clinical/api/firm/feature'
import { ApiFirmStatusFeatureModule } from '@case-clinical/api/firm-status/feature'
import { ApiGenderFeatureModule } from '@case-clinical/api/gender/feature'
import { ApiHealthInsuranceFeatureModule } from '@case-clinical/api/health-insurance/feature'
import { ApiInsuranceFeatureModule } from '@case-clinical/api/insurance/feature'
import { ApiInsuranceSectorFeatureModule } from '@case-clinical/api/insurance-sector/feature'
import { ApiInsuranceTypeFeatureModule } from '@case-clinical/api/insurance-type/feature'
import { ApiLanguageFeatureModule } from '@case-clinical/api/language/feature'
import { ApiLegalCaseFeatureModule } from '@case-clinical/api/legal-case/feature'
import { ApiLocationFeatureModule } from '@case-clinical/api/location/feature'
import { ApiMessageFeatureModule } from '@case-clinical/api/message/feature'
import { ApiNavigationFeatureModule } from '@case-clinical/api/navigation/feature'
import { ApiNotificationFeatureModule } from '@case-clinical/api/notification/feature'
import { ApiOrganizationFeatureModule } from '@case-clinical/api/organization/feature'
import { ApiPatientFeatureModule } from '@case-clinical/api/patient/feature'
import { ApiPatientStudyFeatureModule } from '@case-clinical/api/patient-study/feature'
import { ApiPatientTreatmentStatusFeatureModule } from '@case-clinical/api/patient-treatment-status/feature'
import { ApiPlaceOfServiceFeatureModule } from '@case-clinical/api/place-of-service/feature'
import { ApiPortfolioFeatureModule } from '@case-clinical/api/portfolio/feature'
import { ApiPrescriptionFeatureModule } from '@case-clinical/api/prescription/feature'
import { ApiProcedureTypeFeatureModule } from '@case-clinical/api/procedure-type/feature'
import { ApiProcedureVendorFeatureModule } from '@case-clinical/api/procedure-vendor/feature'
import { ApiProcessFeatureModule } from '@case-clinical/api/process/feature'
import { ApiReconciliationPeriodTypeFeatureModule } from '@case-clinical/api/reconciliation-period-type/feature'
import { ApiShortcutFeatureModule } from '@case-clinical/api/shortcut/feature'
import { ApiSpecialtyFeatureModule } from '@case-clinical/api/specialty/feature'
import { ApiTemplateFeatureModule } from '@case-clinical/api/template/feature'
import { ApiVendorFeatureModule } from '@case-clinical/api/vendor/feature'
import { ApiVendorTypeFeatureModule } from '@case-clinical/api/vendor-type/feature'
import { ApiWriteOffFeatureModule } from '@case-clinical/api/write-off/feature'
import { ApiWriteOffStatusFeatureModule } from '@case-clinical/api/write-off-status/feature'
import { ApiPriorMedsToDateFeatureModule } from '@case-clinical/api/prior-meds-to-date/feature'
import { ApiPriorMedsToDateStatusFeatureModule } from '@case-clinical/api/prior-meds-to-date-status/feature'

import { ApiRequiredFieldFeatureModule } from '@case-clinical/api/required-field/feature'
import { ApiMedLevelFeatureModule } from '@case-clinical/api/med-level/feature'

import { ApiAzureDataAccessModule } from '../../../data-access/src/azure/services/azure-data-access.module'
import { ApiUserFeaturePermissionFeatureModule } from 'libs/api/user-feature-permission/feature/src'
import { ApiPermissionFeatureModule } from 'libs/api/permission/feature/src'
import { ApiFeatureFeatureModule } from '@case-clinical/api/feature/feature'
import { ApiFeaturePermissionFeatureModule } from '@case-clinical/api/feature-permission/feature'
import { ApiUserFeatureFeatureModule } from '@case-clinical/api/user-feature/feature'

import { ApiAppointmentStatusFeatureModule } from '@case-clinical/api/appointment-status/feature'
import { ApiAuthorizationKindFeatureModule } from '@case-clinical/api/authorization-kind/feature'
import { ApiAuthorizationStatusFeatureModule } from '@case-clinical/api/authorization-status/feature'
import { ApiBankFeatureModule } from '@case-clinical/api/bank/feature'
import { ApiBatchControlFeatureModule } from '@case-clinical/api/batch-control/feature'
import { ApiCaseAccountPaymentFeatureModule } from '@case-clinical/api/case-account-payment/feature'
import { ApiCategoryFeatureModule } from '@case-clinical/api/category/feature'
import { ApiContactFeatureModule } from '@case-clinical/api/contact/feature'
import { ApiCostCategoryFeatureModule } from '@case-clinical/api/cost-category/feature'
import { ApiDiagnosisCodeFeatureModule } from '@case-clinical/api/diagnosis-code/feature'
import { ApiDurableMedicalEquipmentFeatureModule } from '@case-clinical/api/durable-medical-equipment/feature'
import { ApiEquipmentFeatureModule } from '@case-clinical/api/equipment/feature'
import { ApiGuidelineFeatureModule } from '@case-clinical/api/guideline/feature'
import { ApiGuidelineUsedFeatureModule } from '@case-clinical/api/guideline-used/feature'
import { ApiImplantFeatureModule } from '@case-clinical/api/implant/feature'
import { ApiImplantCategoryFeatureModule } from '@case-clinical/api/implant-category/feature'
import { ApiJournalEntryFeatureModule } from '@case-clinical/api/journal-entry/feature'
import { ApiManufacturerFeatureModule } from '@case-clinical/api/manufacturer/feature'
import { ApiPaymentFeatureModule } from '@case-clinical/api/payment/feature'
import { ApiPaymentApplicationMethodFeatureModule } from '@case-clinical/api/payment-application-method/feature'
import { ApiPaymentTypeFeatureModule } from '@case-clinical/api/payment-type/feature'
import { ApiPayorTypeFeatureModule } from '@case-clinical/api/payor-type/feature'
import { ApiPriorAuthDmeFeatureModule } from '@case-clinical/api/prior-auth-dme/feature'
import { ApiPriorAuthGuidelineFeatureModule } from '@case-clinical/api/prior-auth-guideline/feature'
import { ApiPriorAuthorizationDiagnosisCodeFeatureModule } from '@case-clinical/api/prior-authorization-diagnosis-code/feature'
import { ApiPriorAuthorizationEquipmentFeatureModule } from '@case-clinical/api/prior-authorization-equipment/feature'
import { ApiPriorAuthorizationImplantFeatureModule } from '@case-clinical/api/prior-authorization-implant/feature'
import { ApiPriorAuthorizationProcedureCodeFeatureModule } from '@case-clinical/api/prior-authorization-procedure-code/feature'
import { ApiPriorAuthorizationRequestFeatureModule } from '@case-clinical/api/prior-authorization-request/feature'
import { ApiProcedureFeatureModule } from '@case-clinical/api/procedure/feature'
import { ApiProcedureSiteFeatureModule } from '@case-clinical/api/procedure-site/feature'
import { ApiSurgicalPositionFeatureModule } from '@case-clinical/api/surgical-position/feature'
import { ApiVisitKindFeatureModule } from '@case-clinical/api/visit-kind/feature'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiTeamFeatureModule } from '@case-clinical/api/team/feature'
import { ApiTeamUserFeatureModule } from '@case-clinical/api/team-user/feature'
import { ApiTeamRoleFeatureModule } from '@case-clinical/api/team-role/feature'
import { ApiVendorLocationFeatureModule } from '@case-clinical/api/vendor-location/feature'
import { GraphQLError } from 'graphql'
import { ApiStripeFeatureModule } from '@case-clinical/api/stripe/feature'
import { ApiPlanFeatureModule } from '@case-clinical/api/plan/feature'
import { ApiTenantFeatureModule } from '@case-clinical/api/tenant/feature'
import { ApiNovuNotificationFeatureModule } from '@case-clinical/api/novu-notification/feature'
import { ApiRoleFeatureFeatureModule } from '@case-clinical/api/role-feature/feature'
import { ApiRoleFeaturePermissionFeatureModule } from '@case-clinical/api/role-feature-permission/feature'

import { ApiRolePermissionFeatureModule } from '@case-clinical/api/role-permission/feature'
import { ApiCountryFeatureModule } from '@case-clinical/api/country/feature'
import { ApiIntegrationFeatureModule } from '@case-clinical/api/integration/feature'
import { ApiContactTagFeatureModule } from '@case-clinical/api/contact-tag/feature'
import { ApiContactPhoneNumberFeatureModule } from '@case-clinical/api/contact-phone-number/feature'
import { ApiContactEmailFeatureModule } from '@case-clinical/api/contact-email/feature'
import { ApiContactSettingFeatureModule } from '@case-clinical/api/contact-setting/feature'
import { ApiContactKindFeatureModule } from '@case-clinical/api/contact-kind/feature'
import { ApiTranslationFeatureModule } from '@case-clinical/api/translation/feature'

import { ApiAcademyCategoryFeatureModule } from '@case-clinical/api/academy/category/feature'
import { ApiCourseFeatureModule } from '@case-clinical/api/academy/course/feature'
import { ApiStepFeatureModule } from '@case-clinical/api/academy/step/feature'
import { ApiUserCourseProgressFeatureModule } from '@case-clinical/api/academy/user-course-progress/feature'

import { ApiClinicalProviderFeatureModule } from '@case-clinical/api/clinical-provider/feature'
import { ApiClinicalProviderLocationFeatureModule } from '@case-clinical/api/clinical-provider-location/feature'
import { ApiClinicalProviderLocationAvailabilityFeatureModule } from '@case-clinical/api/clinical-provider-location-availability/feature'
import { ApiClinicalProviderSpecialtyFeatureModule } from '@case-clinical/api/clinical-provider-specialty/feature'
import { ApiClinicalProviderTagFeatureModule } from '@case-clinical/api/clinical-provider-tag/feature'
import { ApiFavoriteProviderFeatureModule } from '@case-clinical/api/favorite-provider/feature'
import { ApiMedicalConditionProviderFeatureModule } from '@case-clinical/api/medical-condition-provider/feature'
import { ApiMedicalConditionFeatureModule } from '@case-clinical/api/medical-condition/feature'
import { ApiMedicalRecordFeatureModule } from '@case-clinical/api/medical-record/feature'
import { ApiPchProviderFeatureModule } from '@case-clinical/api/pch-provider/feature'
import { ApiTagFeatureModule } from '@case-clinical/api/tag/feature'
import { ApiHoroscopeFeatureModule } from '@case-clinical/api/horoscope/feature'
import { ApiAwardFeatureModule } from '@case-clinical/api/award/feature'
import { ApiClinicalProviderServiceFeatureModule } from '@case-clinical/api/clinical-provider-service/feature'
import { ApiEducationFeatureModule } from '@case-clinical/api/education/feature'
import { ApiExperienceFeatureModule } from '@case-clinical/api/experience/feature'
import { ApiReviewFeatureModule } from '@case-clinical/api/review/feature'
import { ApiServiceFeatureModule } from '@case-clinical/api/service/feature'
import { ApiBalanceRequestFeatureModule } from '@case-clinical/api/balance-request/feature'

import { ApiBodyPartFeatureModule } from '@case-clinical/api/body-part/feature'
import { ApiBodyPartLeadFeatureModule } from '@case-clinical/api/body-part-lead/feature'
import { ApiLeadFeatureModule } from '@case-clinical/api/lead/feature'
import { ApiLeadActionFeatureModule } from '@case-clinical/api/lead-action/feature'
import { ApiLeadSourceFeatureModule } from '@case-clinical/api/lead-source/feature'
import { ApiLeadStatusFeatureModule } from '@case-clinical/api/lead-status/feature'
import { ApiSeverityFeatureModule } from '@case-clinical/api/severity/feature'
import { ApiInjuryFeatureModule } from '@case-clinical/api/injury/feature'
import { ApiLeadInjuryFeatureModule } from '@case-clinical/api/lead-injury/feature'
import { ApiTreatmentFeatureModule } from '@case-clinical/api/treatment/feature'
import { ApiLeadTreatmentFeatureModule } from '@case-clinical/api/lead-treatment/feature'
import { ApiInvoiceFeatureModule } from '@case-clinical/api/invoice/feature'
import { ApiInvoiceDetailFeatureModule } from '@case-clinical/api/invoice-detail/feature'

import { ApiAuthorizationFeatureModule } from '@case-clinical/api/authorization/feature'
import { ApiAuthorizationCategoryFeatureModule } from '@case-clinical/api/authorization-category/feature'
import { ApiAuthorizationDiagnosisCodeFeatureModule } from '@case-clinical/api/authorization-diagnosis-code/feature'
import { ApiAuthorizationTypeFeatureModule } from '@case-clinical/api/authorization-type/feature'
import { ApiProcedureOrTreatmentRequestFeatureModule } from '@case-clinical/api/procedure-or-treatment-request/feature'
import { ApiProcedureOrTreatmentRequestAuthorizationFeatureModule } from '@case-clinical/api/procedure-or-treatment-request-authorization/feature'
import { ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureModule } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/feature'
import { ApiRecommendedOrderFeatureModule } from '@case-clinical/api/recommended-order/feature'
import { ApiRecommendedOrderAuthorizationFeatureModule } from '@case-clinical/api/recommended-order-authorization/feature'
import { ApiRecommendedOrderDiagnosisCodeFeatureModule } from '@case-clinical/api/recommended-order-diagnosis-code/feature'
import { ApiReferralRequestFeatureModule } from '@case-clinical/api/referral-request/feature'
import { ApiRequestAdditionalVisitFeatureModule } from '@case-clinical/api/request-additional-visit/feature'

import { ApiEligibilityRequestFeatureModule } from '@case-clinical/api/eligibility-request/feature'
import { ApiEligibilityStatusFeatureModule } from '@case-clinical/api/eligibility-status/feature'

import { ApiBoardFeatureModule } from '@case-clinical/api/board/feature'
import { ApiBoardListFeatureModule } from '@case-clinical/api/board-list/feature'
import { ApiBoardLabelFeatureModule } from '@case-clinical/api/board-label/feature'
import { ApiBoardCardFeatureModule } from '@case-clinical/api/board-card/feature'
import { ApiProcedureStatusFeatureModule } from '@case-clinical/api/procedure-status/feature'
import { ApiProcedureVendorStatusFeatureModule } from '@case-clinical/api/procedure-vendor-status/feature' 

import { ApiTaskTagFeatureModule } from '@case-clinical/api/task-tag/feature'
import { ApiTaskItemFeatureModule } from '@case-clinical/api/task-item/feature'
import { ApiMedicalRecordStatusFeatureModule } from '@case-clinical/api/medical-record-status/feature'
import { ApiJournalEntryTemplateFeatureModule } from '@case-clinical/api/journal-entry-template/feature' 

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      introspection: process.env.GRAPHQL_INTROSPECTION === 'true',
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      sortSchema: true,
      // format all graphql error
      formatError: (error: GraphQLError) => {
        if (error.extensions.code === 'BAD_USER_INPUT') {
          return {
            code: 400,
            message: error.message,
          }
        }
        return {
          code: error.extensions?.exception.status || 500,
          message: Array.isArray(error.extensions?.exception?.response?.message)
            ? error.extensions?.exception?.response?.message[0]
            : error.extensions?.exception?.response?.message || error.message || `Internal Server Error: ${error}`,
        }
      },
    }),
    GraphQLIntercomModule.forRoot({ pubSub: new PubSub() }),
    HttpModule,
    ApiCoreDataAccessModule,
    ApiAzureDataAccessModule,
    ApiAccountFeatureModule,
    ApiAuthFeatureModule,
    ApiUserFeatureModule,
    ApiIntegrationFeatureModule,
    ApiContactTagFeatureModule,
    ApiContactPhoneNumberFeatureModule,
    ApiContactEmailFeatureModule,
    ApiContactSettingFeatureModule,
    ApiContactKindFeatureModule,
    ApiAppointmentFeatureModule,
    ApiAccidentTypeFeatureModule,
    ApiAccountStatusFeatureModule,
    ApiAdverseInsuranceStatusFeatureModule,
    ApiAgreementTypeFeatureModule,
    ApiAssignedDocumentFeatureModule,
    ApiAttorneyFeatureModule,
    ApiAttorneyStatusFeatureModule,
    ApiBoardFeatureModule,
    ApiBoardLabelFeatureModule,
    ApiBoardListFeatureModule,
    ApiBoardCardFeatureModule,
    ApiAttorneyTypeFeatureModule,
    ApiPriorMedsToDateFeatureModule,
    ApiPriorMedsToDateStatusFeatureModule,
    ApiCalculationBasisTypeFeatureModule,
    ApiCaseAccountFeatureModule,
    ApiCasePreAccidentFeatureModule,
    ApiCasePreInjuryFeatureModule,
    ApiCasePreProblemFeatureModule,
    ApiCasePreProcedureFeatureModule,
    ApiCaseProcedureFeatureModule,
    ApiCaseProgressStatusFeatureModule,
    ApiCaseStatusFeatureModule,
    ApiCaseTypeFeatureModule,
    ApiChatFeatureModule,
    ApiClaimFeatureModule,
    ApiHoroscopeFeatureModule,
    ApiClaimProcedureFeatureModule,
    ApiClaimStatusFeatureModule,
    ApiContractFeatureModule,
    ApiContractedRateFeatureModule,
    ApiContractedRateKindFeatureModule,
    ApiContractKindFeatureModule,
    ApiTranslationFeatureModule,
    ApiContractTermFeatureModule,
    ApiDocumentFeatureModule,
    ApiDocumentTypeFeatureModule,
    ApiFacilityFeeScheduleFeatureModule,
    ApiFeeScheduleFeatureModule,
    ApiFirmFeatureModule,
    ApiFirmStatusFeatureModule,
    ApiGenderFeatureModule,
    ApiHealthInsuranceFeatureModule,
    ApiInsuranceFeatureModule,
    ApiInsuranceSectorFeatureModule,
    ApiInsuranceTypeFeatureModule,
    ApiLanguageFeatureModule,
    ApiLegalCaseFeatureModule,
    ApiLocationFeatureModule,
    ApiMessageFeatureModule,
    ApiNavigationFeatureModule,
    ApiNotificationFeatureModule,
    ApiOrganizationFeatureModule,
    ApiPatientFeatureModule,
    ApiPatientStudyFeatureModule,
    ApiPatientTreatmentStatusFeatureModule,
    ApiPlaceOfServiceFeatureModule,
    ApiPortfolioFeatureModule,
    ApiPrescriptionFeatureModule,
    ApiProcedureTypeFeatureModule,
    ApiProcedureVendorFeatureModule,
    ApiProcessFeatureModule,
    ApiReconciliationPeriodTypeFeatureModule,
    ApiRoleFeatureModule,
    ApiSettingFeatureModule,
    ApiShortcutFeatureModule,
    ApiAwardFeatureModule,
    ApiClinicalProviderServiceFeatureModule,
    ApiEducationFeatureModule,
    ApiExperienceFeatureModule,
    ApiReviewFeatureModule,
    ApiServiceFeatureModule,
    ApiSpecialtyFeatureModule,
    ApiWhereDoesItHurtFeatureModule,
    ApiWhereDoesItHurtSpecialtyFeatureModule,
    ApiSideFeatureModule,
    ApiTemplateFeatureModule,
    ApiUserRoleFeatureModule,
    ApiVendorFeatureModule,
    ApiVendorTypeFeatureModule,
    ApiWriteOffFeatureModule,
    ApiWriteOffStatusFeatureModule,
    ApiCalendarFeatureModule,
    ApiCalendarTypeFeatureModule,
    ApiCalendarWeekdayFeatureModule,
    ApiEmailFeatureModule,
    ApiUserCalendarFeatureModule,
    ApiRequiredFieldFeatureModule,
    ApiMedLevelFeatureModule,
    ApiTeamFeatureModule,
    ApiTeamUserFeatureModule,
    ApiTeamRoleFeatureModule,
    ApiFeatureFeatureModule,
    ApiUserFeaturePermissionFeatureModule,
    ApiProcedureStatusFeatureModule,
    ApiFeaturePermissionFeatureModule,
    ApiPermissionFeatureModule,
    ApiUserFeatureFeatureModule,
    ApiAppointmentStatusFeatureModule,
    ApiAuthorizationKindFeatureModule,
    ApiAuthorizationStatusFeatureModule,
    ApiBankFeatureModule,
    ApiBatchControlFeatureModule,
    ApiCaseAccountPaymentFeatureModule,
    ApiCategoryFeatureModule,
    ApiClaimFeatureModule,
    ApiContactFeatureModule,
    ApiCostCategoryFeatureModule,
    ApiDiagnosisCodeFeatureModule,
    ApiDurableMedicalEquipmentFeatureModule,
    ApiEquipmentFeatureModule,
    ApiEthnicityFeatureModule,
    ApiGuidelineFeatureModule,
    ApiGuidelineUsedFeatureModule,
    ApiImplantFeatureModule,
    ApiImplantCategoryFeatureModule,
    ApiJournalEntryFeatureModule,
    ApiManufacturerFeatureModule,
    ApiPaymentFeatureModule,
    ApiPaymentApplicationMethodFeatureModule,
    ApiPaymentTypeFeatureModule,
    ApiPayorTypeFeatureModule,
    ApiPriorAuthDmeFeatureModule,
    ApiPriorAuthGuidelineFeatureModule,
    ApiPriorAuthorizationDiagnosisCodeFeatureModule,
    ApiPriorAuthorizationEquipmentFeatureModule,
    ApiPriorAuthorizationImplantFeatureModule,
    ApiPriorAuthorizationProcedureCodeFeatureModule,
    ApiPriorAuthorizationRequestFeatureModule,
    ApiProcedureFeatureModule,
    ApiProcedureSiteFeatureModule,
    ApiSurgicalPositionFeatureModule,
    ApiVisitKindFeatureModule,
    ApiVendorLocationFeatureModule,
    ApiFormLayoutFeatureModule,
    ApiStripeFeatureModule,
    ApiPlanFeatureModule,
    ApiTenantFeatureModule,
    ApiNovuNotificationFeatureModule,

    ApiRoleFeatureFeatureModule,
    ApiRoleFeaturePermissionFeatureModule,
    ApiRolePermissionFeatureModule,
    ApiCountryFeatureModule,

    ApiAcademyCategoryFeatureModule,
    ApiCourseFeatureModule,
    ApiStepFeatureModule,
    ApiUserCourseProgressFeatureModule,
    ApiClinicalProviderFeatureModule,
    ApiClinicalProviderLocationFeatureModule,
    ApiClinicalProviderLocationAvailabilityFeatureModule,
ApiClinicalProviderSpecialtyFeatureModule,
ApiClinicalProviderTagFeatureModule,
ApiFavoriteProviderFeatureModule,
ApiMedicalConditionProviderFeatureModule,
ApiMedicalConditionFeatureModule,
ApiMedicalRecordFeatureModule,
ApiPchProviderFeatureModule,
ApiTagFeatureModule,
ApiBalanceRequestFeatureModule,
ApiBodyPartFeatureModule,
ApiBodyPartLeadFeatureModule,
ApiLeadFeatureModule,
ApiLeadActionFeatureModule,
ApiLeadSourceFeatureModule,
ApiLeadStatusFeatureModule,
ApiSeverityFeatureModule,
ApiInjuryFeatureModule,
ApiLeadInjuryFeatureModule,
ApiTreatmentFeatureModule,
ApiLeadTreatmentFeatureModule,
ApiInvoiceFeatureModule,
ApiInvoiceDetailFeatureModule,
ApiTaskItemFeatureModule,
ApiTaskTagFeatureModule,
ApiMedicalRecordStatusFeatureModule,


ApiAuthorizationFeatureModule,
ApiAuthorizationCategoryFeatureModule,
ApiAuthorizationDiagnosisCodeFeatureModule,
ApiAuthorizationTypeFeatureModule,
ApiProcedureOrTreatmentRequestFeatureModule,
ApiProcedureOrTreatmentRequestAuthorizationFeatureModule,
ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureModule,
ApiRecommendedOrderFeatureModule,
ApiRecommendedOrderAuthorizationFeatureModule,
ApiRecommendedOrderDiagnosisCodeFeatureModule,
ApiReferralRequestFeatureModule,
ApiRequestAdditionalVisitFeatureModule,
ApiEligibilityRequestFeatureModule,
ApiEligibilityStatusFeatureModule,
ApiProcedureVendorStatusFeatureModule,
ApiJournalEntryTemplateFeatureModule

  ],
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver, ApiCoreFeatureService],
  exports: [ApiCoreFeatureService],
})
export class ApiCoreFeatureModule {}
