//import { WebFormsUiUserCourseProgressModule } from './user-course-progress/ui'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { WebFormsUiAccidentTypeModule } from './accident-type/ui'
import { WebFormsUiAccountStatusModule } from './account-status/ui'
import { WebFormsUiAdverseInsuranceStatusModule } from './adverse-insurance-status/ui'
import { WebFormsUiAgreementTypeModule } from './agreement-type/ui'
import { WebFormsUiAppointmentModule } from './appointment/ui'
import { WebFormsUiAppointmentStatusModule } from './appointment-status/ui'
import { WebFormsUiAssignedDocumentModule } from './assigned-document/ui'
import { WebFormsUiAttorneyModule } from './attorney/ui'
import { WebFormsUiAttorneyStatusModule } from './attorney-status/ui'
import { WebFormsUiAttorneyTypeModule } from './attorney-type/ui'
import { WebFormsUiAuthorizationModule } from './authorization/ui'
import { WebFormsUiAuthorizationCategoryModule } from './authorization-category/ui'
import { WebFormsUiAuthorizationDiagnosisCodeModule } from './authorization-diagnosis-code/ui'
import { WebFormsUiAuthorizationKindModule } from './authorization-kind/ui'
import { WebFormsUiAuthorizationStatusModule } from './authorization-status/ui'
import { WebFormsUiAuthorizationTypeModule } from './authorization-type/ui'
import { WebFormsUiBalanceRequestModule } from './balance-request/ui'
import { WebFormsUiBankModule } from './bank/ui'
import { WebFormsUiBatchControlModule } from './batch-control/ui'
import { WebFormsUiBodyPartLeadModule } from './body-part-lead/ui/web-forms-ui-body-part-lead.module'
import { WebFormsUiBodyPartModule } from './body-part/ui/web-forms-ui-body-part.module'
import { WebFormsUiCalculationBasisTypeModule } from './calculation-basis-type/ui'
import { WebFormsUiCaseAccountModule } from './case-account/ui'
import { WebFormsUiCaseAccountPaymentModule } from './case-account-payment/ui'
import { WebFormsUiCasePreAccidentModule } from './case-pre-accident/ui'
import { WebFormsUiCasePreInjuryModule } from './case-pre-injury/ui'
import { WebFormsUiCasePreProblemModule } from './case-pre-problem/ui'
import { WebFormsUiCasePreProcedureModule } from './case-pre-procedure/ui'
import { WebFormsUiCaseProcedureModule } from './case-procedure/ui'
import { WebFormsUiCaseProgressStatusModule } from './case-progress-status/ui'
import { WebFormsUiCaseStatusModule } from './case-status/ui'
import { WebFormsUiCaseTypeModule } from './case-type/ui'
import { WebFormsUiCategoryModule } from './category/ui'
import { WebFormsUiClaimModule } from './claim/ui'
import { WebFormsUiClaimProcedureModule } from './claim-procedure/ui'
import { WebFormsUiClaimStatusModule } from './claim-status/ui'
import { WebFormsUiClinicalProviderLocationAvailabilityModule } from './clinical-provider-location-availability/ui'
import { WebFormsUiClinicalProviderLocationModule } from './clinical-provider-location/ui'
import { WebFormsUiClinicalProviderModule } from './clinical-provider/ui'
import { WebFormsUiClinicalProviderSpecialtyModule } from './clinical-provider-specialty/ui'
import { WebFormsUiClinicalProviderTagModule } from './clinical-provider-tag/ui'
import { WebFormsUiContactEmailModule } from './contact-email/ui'
import { WebFormsUiContactKindModule } from './contact-kind/ui'
import { WebFormsUiContactModule } from './contact/ui'
import { WebFormsUiContactPhoneNumberModule } from './contact-phone-number/ui'
import { WebFormsUiContactSettingModule } from './contact-setting/ui/web-forms-ui-contact-setting.module'
import { WebFormsUiContactTagModule } from './contact-tag/ui'
import { WebFormsUiContractedRateKindModule } from './contracted-rate-kind/ui'
import { WebFormsUiContractedRateModule } from './contracted-rate/ui'
import { WebFormsUiContractKindModule } from './contract-kind/ui'
import { WebFormsUiContractModule } from './contract/ui'
import { WebFormsUiContractTermModule } from './contract-term/ui'
import { WebFormsUiCostCategoryModule } from './cost-category/ui'
import { WebFormsUiDiagnosisCodeModule } from './diagnosis-code/ui'
import { WebFormsUiDocumentModule } from './document/ui/web-forms-ui-document.module'
import { WebFormsUiDocumentTypeModule } from './document-type/ui'
import { WebFormsUiDurableMedicalEquipmentModule } from './durable-medical-equipment/ui'
import { WebFormsUiEquipmentModule } from './equipment/ui'
import { WebFormsUiEthnicityModule } from './ethnicity/ui'
import { WebFormsUiFacilityFeeScheduleModule } from './facility-fee-schedule/ui'
import { WebFormsUiFavoriteProviderModule } from './favorite-provider/ui'
import { WebFormsUiFeeScheduleModule } from './fee-schedule/ui'
import { WebFormsUiFirmModule } from './firm/ui'
import { WebFormsUiFirmStatusModule } from './firm-status/ui'
import { WebFormsUiGenderModule } from './gender/ui'
import { WebFormsUiGuidelineModule } from './guideline/ui'
import { WebFormsUiGuidelineUsedModule } from './guideline-used/ui'
import { WebFormsUiHealthInsuranceModule } from './health-insurance/ui'
import { WebFormsUiImplantCategoryModule } from './implant-category/ui'
import { WebFormsUiImplantModule } from './implant/ui'
import { WebFormsUiInjuryModule } from './injury/ui/web-forms-ui-injury.module'
import { WebFormsUiInsuranceModule } from './insurance/ui'
import { WebFormsUiInsuranceSectorModule } from './insurance-sector/ui'
import { WebFormsUiInsuranceTypeModule } from './insurance-type/ui'
import { WebFormsUiIntegrationModule } from './integration/ui'
import { WebFormsUiInvoiceDetailModule } from './invoice-detail/ui'
import { WebFormsUiInvoiceModule } from './invoice/ui'
import { WebFormsUiJournalEntryModule } from './journal-entry/ui'
import { WebFormsUiLanguageModule } from './language/ui'
import { WebFormsUiLeadActionModule } from './lead-action/ui/web-forms-ui-lead-action.module'
import { WebFormsUiLeadInjuryModule } from './lead-injury/ui/web-forms-ui-lead-injury.module'
import { WebFormsUiLeadModule } from './lead/ui/web-forms-ui-lead.module'
import { WebFormsUiLeadSourceModule } from './lead-source/ui/web-forms-ui-lead-source.module'
import { WebFormsUiLeadStatusModule } from './lead-status/ui/web-forms-ui-lead-status.module'
import { WebFormsUiLegalCaseModule } from './legal-case/ui'
import { WebFormsUiLocationModule } from './location/ui'
import { WebFormsUiManufacturerModule } from './manufacturer/ui'
import { WebFormsUiMedicalConditionProviderModule } from './medical-condition-provider/ui'
import { WebFormsUiMedicalRecordModule } from './medical-record/ui'
import { WebFormsUiMedicalRecordStatusModule } from './medical-record-status/ui/web-forms-ui-medical-record-status.module'
import { WebFormsUiMedLevelModule } from './med-level/ui'
import { WebFormsUiOrganizationModule } from './organization/ui'
import { WebFormsUiPatientModule } from './patient/ui'
import { WebFormsUiPatientStudyModule } from './patient-study/ui'
import { WebFormsUiPatientTreatmentStatusModule } from './patient-treatment-status/ui'
import { WebFormsUiPaymentApplicationMethodModule } from './payment-application-method/ui'
import { WebFormsUiPaymentModule } from './payment/ui'
import { WebFormsUiPaymentTypeModule } from './payment-type/ui'
import { WebFormsUiPayorTypeModule } from './payor-type/ui'
import { WebFormsUiPchProviderModule } from './pch-provider/ui'
import { WebFormsUiPlaceOfServiceModule } from './place-of-service/ui'
import { WebFormsUiPortfolioModule } from './portfolio/ui'
import { WebFormsUiPrescriptionModule } from './prescription/ui'
import { WebFormsUiPriorAuthDmeModule } from './prior-auth-dme/ui'
import { WebFormsUiPriorAuthGuidelineModule } from './prior-auth-guideline/ui'
import { WebFormsUiPriorAuthorizationDiagnosisCodeModule } from './prior-authorization-diagnosis-code/ui'
import { WebFormsUiPriorAuthorizationEquipmentModule } from './prior-authorization-equipment/ui'
import { WebFormsUiPriorAuthorizationImplantModule } from './prior-authorization-implant/ui'
import { WebFormsUiPriorAuthorizationProcedureCodeModule } from './prior-authorization-procedure-code/ui'
import { WebFormsUiPriorAuthorizationRequestModule } from './prior-authorization-request/ui'
import { WebFormsUiPriorMedsToDateModule } from './prior-meds-to-date/ui'
import { WebFormsUiPriorMedsToDateStatusModule } from './prior-meds-to-date-status/ui'
import { WebFormsUiProcedureModule } from './procedure/ui'
import { WebFormsUiProcedureOrTreatmentRequestAuthorizationModule } from './procedure-or-treatment-request-authorization/ui'
import { WebFormsUiProcedureSiteModule } from './procedure-site/ui'
import { WebFormsUiProcedureStatusModule } from './procedure-status/ui'
import { WebFormsUiProcedureTypeModule } from './procedure-type/ui'
import { WebFormsUiProcedureVendorModule } from './procedure-vendor/ui'
import { WebFormsUiProcedureVendorStatusModule } from './procedure-vendor-status/ui'
import { WebFormsUiProcessModule } from './process/ui'
import { WebFormsUiRecommendedOrderModule } from './recommended-order/ui'
import { WebFormsUiRecommendedOrderAuthorizationModule } from './recommended-order-authorization/ui'
import { WebFormsUiReconciliationPeriodTypeModule } from './reconciliation-period-type/ui'
import { WebFormsUiRequiredFieldModule } from './required-field/ui'
import { WebFormsUiReviewModule } from './review/ui'
import { WebFormsUiRoleModule } from './role/ui'
import { WebFormsUiServiceModule } from './service/ui'
import { WebFormsUiSettingModule } from './setting/ui'
import { WebFormsUiSeverityModule } from './severity/ui/web-forms-ui-severity.module'
import { WebFormsUiSpecialtyModule } from './specialty/ui'
import { WebFormsUiSurgicalPositionModule } from './surgical-position/ui'
import { WebFormsUiTagModule } from './tag/ui'
import { WebFormsUiTeamModule } from './team/ui'
import { WebFormsUiTemplateModule } from './template/ui'
import { WebFormsUiUserModule } from './concrete/user/ui'
import { WebFormsUiUserRoleModule } from './user-role/ui'
import { WebFormsUiVendorLocationModule } from './vendor-location/ui'
import { WebFormsUiVendorModule } from './vendor/ui'
import { WebFormsUiVendorTypeModule } from './vendor-type/ui'
import { WebFormsUiVisitKindModule } from './visit-kind/ui'
import { WebFormsUiWriteOffModule } from './write-off/ui'
import { WebFormsUiWriteOffStatusModule } from './write-off-status/ui'
import { WebUiToastModule } from './ui/toast/src'

@NgModule({
  imports: [
    //WebFormsUiUserCourseProgressModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebFormsUiAuthorizationModule,
    WebFormsUiAccidentTypeModule,
    WebFormsUiAccountStatusModule,
    WebFormsUiAdverseInsuranceStatusModule,
    WebFormsUiAgreementTypeModule,
    WebFormsUiAppointmentModule,
    WebFormsUiAppointmentStatusModule,
    WebFormsUiAssignedDocumentModule,
    WebFormsUiAttorneyModule,
    WebFormsUiAttorneyStatusModule,
    WebFormsUiAttorneyTypeModule,
    WebFormsUiAuthorizationCategoryModule,
    WebFormsUiAuthorizationDiagnosisCodeModule,
    WebFormsUiAuthorizationKindModule,
    WebFormsUiAuthorizationStatusModule,
    WebFormsUiAuthorizationTypeModule,
    WebFormsUiBalanceRequestModule,
    WebFormsUiBankModule,
    WebFormsUiBatchControlModule,
    WebFormsUiBodyPartLeadModule,
    WebFormsUiBodyPartModule,
    WebFormsUiCalculationBasisTypeModule,
    WebFormsUiCaseAccountModule,
    WebFormsUiCaseAccountPaymentModule,
    WebFormsUiCasePreAccidentModule,
    WebFormsUiCasePreInjuryModule,
    WebFormsUiCasePreProblemModule,
    WebFormsUiCasePreProcedureModule,
    WebFormsUiCaseProcedureModule,
    WebFormsUiCaseProgressStatusModule,
    WebFormsUiCaseStatusModule,
    WebFormsUiCaseTypeModule,
    WebFormsUiCategoryModule,
    WebFormsUiClaimModule,
    WebFormsUiClaimProcedureModule,
    WebFormsUiClaimStatusModule,
    WebFormsUiClinicalProviderLocationAvailabilityModule,
    WebFormsUiClinicalProviderLocationModule,
    WebFormsUiClinicalProviderModule,
    WebFormsUiClinicalProviderSpecialtyModule,
    WebFormsUiClinicalProviderTagModule,
    WebFormsUiContactEmailModule,
    WebFormsUiContactKindModule,
    WebFormsUiContactModule,
    WebFormsUiContactPhoneNumberModule,
    WebFormsUiContactSettingModule,
    WebFormsUiContactTagModule,
    WebFormsUiContractedRateKindModule,
    WebFormsUiContractedRateModule,
    WebFormsUiContractKindModule,
    WebFormsUiContractModule,
    WebFormsUiContractTermModule,
    WebFormsUiCostCategoryModule,
    WebFormsUiDiagnosisCodeModule,
    WebFormsUiDocumentModule,
    WebFormsUiDocumentTypeModule,
    WebFormsUiDurableMedicalEquipmentModule,
    WebFormsUiEquipmentModule,
    WebFormsUiEthnicityModule,
    WebFormsUiFacilityFeeScheduleModule,
    WebFormsUiFavoriteProviderModule,
    WebFormsUiFeeScheduleModule,
    WebFormsUiFirmModule,
    WebFormsUiFirmStatusModule,
    WebFormsUiGenderModule,
    WebFormsUiGuidelineModule,
    WebFormsUiGuidelineUsedModule,
    WebFormsUiHealthInsuranceModule,
    WebFormsUiImplantCategoryModule,
    WebFormsUiImplantModule,
    WebFormsUiInsuranceModule,
    WebFormsUiInsuranceSectorModule,
    WebFormsUiInsuranceTypeModule,
    WebFormsUiIntegrationModule,
    WebFormsUiInvoiceDetailModule,
    WebFormsUiInvoiceModule,
    WebFormsUiJournalEntryModule,
    WebFormsUiLanguageModule,
    WebFormsUiLeadActionModule,
    WebFormsUiLeadModule,
    WebFormsUiLeadSourceModule,
    WebFormsUiLeadStatusModule,
    WebFormsUiLegalCaseModule,
    WebFormsUiLocationModule,
    WebFormsUiManufacturerModule,
    WebFormsUiMedicalConditionProviderModule,
    WebFormsUiMedicalRecordModule,
    WebFormsUiMedicalRecordStatusModule,
    WebFormsUiMedLevelModule,
    WebFormsUiOrganizationModule,
    WebFormsUiPatientModule,
    WebFormsUiPatientStudyModule,
    WebFormsUiPatientTreatmentStatusModule,
    WebFormsUiPaymentApplicationMethodModule,
    WebFormsUiPaymentModule,
    WebFormsUiPaymentTypeModule,
    WebFormsUiPayorTypeModule,
    WebFormsUiPchProviderModule,
    WebFormsUiPlaceOfServiceModule,
    WebFormsUiPortfolioModule,
    WebFormsUiPrescriptionModule,
    WebFormsUiPriorAuthDmeModule,
    WebFormsUiPriorAuthGuidelineModule,
    WebFormsUiPriorAuthorizationDiagnosisCodeModule,
    WebFormsUiPriorAuthorizationEquipmentModule,
    WebFormsUiPriorAuthorizationImplantModule,
    WebFormsUiPriorAuthorizationProcedureCodeModule,
    WebFormsUiRecommendedOrderAuthorizationModule,
    WebFormsUiPriorAuthorizationRequestModule,
    WebFormsUiPriorMedsToDateModule,
    WebFormsUiPriorMedsToDateStatusModule,
    WebFormsUiProcedureModule,
    WebFormsUiProcedureOrTreatmentRequestAuthorizationModule,
    WebFormsUiProcedureSiteModule,
    WebFormsUiProcedureStatusModule,
    WebFormsUiProcedureTypeModule,
    WebFormsUiProcedureVendorModule,
    WebFormsUiProcedureVendorStatusModule,
    WebFormsUiProcessModule,
    WebFormsUiRecommendedOrderModule,
    WebFormsUiReconciliationPeriodTypeModule,
    WebFormsUiRequiredFieldModule,
    WebFormsUiReviewModule,
    WebFormsUiRoleModule,
    WebFormsUiServiceModule,
    WebFormsUiSettingModule,
    WebFormsUiSeverityModule,
    WebFormsUiSpecialtyModule,
    WebFormsUiSurgicalPositionModule,
    WebFormsUiTagModule,
    WebFormsUiTemplateModule,
    WebFormsUiUserModule,
    WebFormsUiUserRoleModule,
    WebFormsUiVendorLocationModule,
    WebFormsUiVendorModule,
    WebFormsUiVendorTypeModule,
    WebFormsUiVisitKindModule,
    WebFormsUiWriteOffModule,
    WebFormsUiWriteOffStatusModule,
    WebUiToastModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
})
export class UiFormsSharedModule { }


