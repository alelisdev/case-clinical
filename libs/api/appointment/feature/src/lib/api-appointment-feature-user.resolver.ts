
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAppointmentInput,
  UserListAppointmentInput,
  UserUpdateAppointmentInput,
  UserUpdateAppointmentsInput,
  ApiAppointmentDataAccessUserService,
  Appointment,
} from '@case-clinical/api/appointment/data-access'
import { ApiClaimDataAccessUserService } from '@case-clinical/api/claim/data-access'

import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { UserListLocationInput, Location } from '@case-clinical/api/location/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListAppointmentStatusInput, AppointmentStatus } from '@case-clinical/api/appointment-status/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'
import { UserListMedicalRecordStatusInput, MedicalRecordStatus } from '@case-clinical/api/medical-record-status/data-access'

import * as fs from 'fs';

import { Sensible } from "@speakeasy-sdks/sensible";
import { ExtractDataJsonResponse } from "@speakeasy-sdks/sensible/dist/sdk/models/operations";
import { EncodedPdf, Environment, ExtractionStatus, ValidationSeverity } from "@speakeasy-sdks/sensible/dist/sdk/models/shared";
import { UserCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access'
import { UserCreateClaimInput } from '@case-clinical/api/claim/data-access'


const sdk = new Sensible({
  security: {
    bearerAuth: "Bearer 0971ebf82598e87b188c6cad5eb829837791bc3520f8e76b1ad2d17e7fb775e2ad6b976b9aa5784b7461e31aab2053805def0b04cd5e6ad361f6e29c0f4c22b9",
  },
});


@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAppointmentFeatureUserResolver {
  constructor(private readonly service: ApiAppointmentDataAccessUserService,
              private readonly claimService: ApiClaimDataAccessUserService) {}

  @Query(() => [Appointment], { nullable: true })
  userAppointments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.userAppointments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAppointments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.userCountAppointments(user.id, input)
  }

  @Query(() => [Appointment], { nullable: true })
  userSelectAppointments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.userSelectAppointments(user.id, input)
  }

  @Query(() => Appointment, { nullable: true })
  userAppointment(@CtxUser() user: User, @Args('appointmentId') appointmentId: string) {
    return this.service.userAppointment(user.id, appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  userCreateAppointment(@CtxUser() user: User, @Args('input') input: UserCreateAppointmentInput,) {
    return this.service.userCreateAppointment(user.id, input)
  }
  
  @Mutation(() => Appointment, { nullable: true })
  userCheckInAppointment(@CtxUser() user: User, @Args('appointmentId') appointmentId: string,) {
    return this.service.userCheckInAppointment(appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  userRequestReschedule(@CtxUser() user: User, @Args('appointmentId') appointmentId: string,) {
    return this.service.userRequestReschedule(appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  userRescheduleAppointment(
    @CtxUser() user: User,
    @Args('appointmentId') appointmentId: string,
    @Args('rescheduleDate') rescheduleDate: Date,
  ) {
    return this.service.userRescheduleAppointment(appointmentId, rescheduleDate);
  }

  @Mutation(() => Appointment, { nullable: true })
  userCancelAppointment(@CtxUser() user: User, @Args('appointmentId') appointmentId: string,) {
    return this.service.userCancelAppointment(appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  userConfirmAppointment(@CtxUser() user: User, @Args('appointmentId') appointmentId: string,) {
    return this.service.userConfirmAppointment(appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  userHideAppointment(@CtxUser() user: User, @Args('appointmentId') appointmentId: string,) {
    return this.service.userHideAppointment(appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  userUpdateAppointment(
    @CtxUser() user: User,
    @Args('appointmentId') appointmentId: string,
    @Args('input') input: UserUpdateAppointmentInput,
  ) {
    return this.service.userUpdateAppointment(user.id, appointmentId, input)
  }

  @Mutation(() => Appointment, { nullable: true })
  userUploadBill(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAppointmentInput,
  ) {

    if(input.bill) {
      let document = this.removeBase64Prefix(input.bill.attachment)
      sdk.document.extractDataJson("cms1500", {
        document,
      }, Environment.Development
      ).then((res: ExtractDataJsonResponse) => {
        if (res.statusCode == 200) {
          // handle response
          let response = res;
          let sensible = new SensibleService(response.extractionSingleResponse.parsedDocument)
          let claim = sensible.mapClaim1500ToUserCreateClaimInput()
          this.claimService.userCreateClaim(user.id, claim)
        }
      });
      return this.service.userUploadBill(user.id, input)
    }
  }

  removeBase64Prefix(uploadString: string): string {
    const parts = uploadString.split(',');
    
    if (parts.length === 2) {
      console.log(parts[1])
      return parts[1];
    }
    
    return uploadString;
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAppointments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAppointmentsInput,
  ) {
    return this.service.userUpdateAppointments(user.id, input)
  }

  @Mutation(() => Appointment, { nullable: true })
  userDeleteAppointment(@CtxUser() user: User, @Args('appointmentId') appointmentId: string) {
    return this.service.userDeleteAppointment(user.id, appointmentId)
  }
}

class SensibleService {
    constructor(parsedJson: any) {
       this.carrier = parsedJson.carrier
      this.item1Medicare = parsedJson['item1.medicare']
      this.item1Medicaid = parsedJson['item1.medicaid']
      this.item1SponsorsSsn = parsedJson['item1.sponsors_ssn']
      this.item1MemberId = parsedJson['item1.member_id']
      this.item1SsnOrId = parsedJson['item1.ssn_or_id']
      this.item1Ssn = parsedJson['item1.ssn']
      this.item1Id = parsedJson['item1.id']
      this.item1aInsuredsIdNumber = parsedJson['item1a.insureds_id_number']
      this.item2PatientsName = parsedJson['item2.patients_name']
      this.item3PatientsBirthDate = parsedJson['item3.patients_birth_date']
      this.item3Male = parsedJson['item3.male']
      this.item3Female = parsedJson['item3.female']
      this.item4InsuredsName = parsedJson['item4.insureds_name']
      this.item5PatientsStreetAddress = parsedJson['item5.patients_street_address']
      this.item5PatientsCity = parsedJson['item5.patients_city']
      this.item5PatientsState = parsedJson['item5.patients_state']
      this.item5PatientsZipCode = parsedJson['item5.patients_zip_code']
      this.item5PatientsTelephone = parsedJson['item5.patients_telephone']
      this.item6PatientRelationshipToInsuredSelf = parsedJson['item6.patient_relationship_to_insured_self']
      this.item6PatientRelationshipToInsuredSpouse = parsedJson['item6.patient_relationship_to_insured_spouse']
      this.item6PatientRelationshipToInsuredChild = parsedJson['item6.patient_relationship_to_insured.child']
      this.item6PatientRelationshipToInsuredOther = parsedJson['item6.patient_relationship_to_insured.other']
      this.item7InsuredsStreetAddress = parsedJson['item7.insureds_street_address']
      this.item7InsuredsCity = parsedJson['item7.insureds_city']
      this.item7InsuredsState = parsedJson['item7.insureds_state']
      this.item7InsuredsZipCode = parsedJson['item7.insureds_zip_code']
      this.item7InsuredsTelephone = parsedJson['item7.insureds_telephone']
      this.item8PatientStatusSingle = parsedJson['item8.patient_status.single']
      this.item8PatientStatusMarried = parsedJson['item8.patient_status.married']
      this.item8PatientStatusOther = parsedJson['item8.patient_status.other']
      this.item8PatientStatusEmployed = parsedJson['item8.patient_status.employed']
      this.item8PatientStatusFullTimeStudent = parsedJson['item8.patient_status.full_time_student']
      this.item8PatientStatusPartTimeStudent = parsedJson['item8.patient_status.part_time_student']
      this.item9OtherInsuredsName = parsedJson['item9.other_insureds_name']
      this.item9aOtherInsuredsNamePolicyOrGroupNumber = parsedJson['item9a.other_insureds_name_policy_or_group_number']
      this.item9bOtherInsuredsBirthDate = parsedJson['item9b.other_insureds_birth_date']
      this.item9bMale = parsedJson['item9b.male']
      this.item9bFemale = parsedJson['item9b.female']
      this.item9cEmployersNameOrSchoolName = parsedJson['item9c.employers_name_or_school_name']
      this.item9dInsurancePlanNameOrProgramName = parsedJson['item9d.insurance_plan_name_or_program_name']
      this.item10aIsPatientsConditionRelatedToEmployment = parsedJson['item10a.is_patients_condition_related_to_employment']
      this.item10bIsPatientsConditionRelatedToAutoAccident = parsedJson['item10b.is_patients_condition_related_to_auto_accident']
      this.item10bIsPatientsConditionRelatedToAutoAccidentPlace = parsedJson['item10b.is_patients_condition_related_to_auto_accident.place']
      this.item10cIsPatientsConditionRelatedToOtherAccident = parsedJson['item10c.is_patients_condition_related_to_other_accident']
      this.item10dReservedForLocalUse = parsedJson['item10d.reserved_for_local_use']
      this.item11InsuredsPolicyGroupOrFecaNumber = parsedJson['item11.insureds_policy_group_or_feca_number']
      this.item11aInsuredsBirthDate = parsedJson['item11a.insureds_birth_date']
      this.item11aMale = parsedJson['item11a.male']
      this.item11aFemale = parsedJson['item11a.female']
      this.item11bEmployersNameOrSchoolName = parsedJson['item11b.employers_name_or_school_name']
      this.item11cInsurancePlanNameOrProgramName = parsedJson['item11c.insurance_plan_name_or_program_name']
      this.item11dIsThereAnotherHealthBenefitPlan = parsedJson['item11d.is_ther_another_health_benefit_plan']
      this.item12PatientsAuthorizedPersonsSignature = parsedJson['item12.patients_authorized_persons.signature']
      this.item13InsuredsAuthorizedPersonsSignature = parsedJson['item13.insureds_authorized_persons.signature']
      this.item14DateOfCurrent = parsedJson['item14.date_of_current']
      this.item15FirstDateSameSimilarIssue = parsedJson['item15.first_date_same_similar_issue']
      this.item16DatesPatientUnableToWorkInCurrentOccupationFrom = parsedJson['item16.dates_patient_unable_to_work_in_current_occupation.from']
      this.item16DatesPatientUnableToWorkInCurrentOccupationTo = parsedJson['item16.dates_patient_unable_to_work_in_current_occupation.to']
      this.item17NameOfReferringProviderOrOtherSource = parsedJson['item17.name_of_referring_provider_or_other_source']
      this.item17a = parsedJson['item17a']
      this.item17b = parsedJson['item17b']
      this.item18HospitalizationDatesRelatedToCurrentServicesFrom = parsedJson['item18.hospitalization_dates_related_to_current_services.from']
      this.item18HospitalizationDatesRelatedToCurrentServicesTo = parsedJson['item18.hospitalization_dates_related_to_current_services.to']
      this.item19ReservedForLocalUse = parsedJson['item19.reserved_for_local_use']
      this.item20OutsideLab = parsedJson['item20.outside_lab']
      this.item20Charges = parsedJson['item20.charges']
      this.item21 = parsedJson['item21']
      this.item22MedicaidResubmissionCode = parsedJson['item22.medicaid_resubmission.code']
      this.item22MedicaidResubmissionOriginalRefNo = parsedJson['item22.medicaid_resubmission.original_ref_no']
      this.item23PriorAuthorizationNumber = parsedJson['item23.prior_authorization_number']
      this.item25FederalTaxIdNumber = parsedJson['item25.federal_tax_id_number']
      this.item25Ssn = parsedJson['item25.ssn']
      this.item25Ein = parsedJson['item25.ein']
      this.item26PatientsAccountNo = parsedJson['item26.patients_account_no']
      this.item27AcceptAssignment = parsedJson['item27.accept_assignment']
      this.item28TotalCharge = parsedJson['item28.total_charge']
      this.item29AmountPaid = parsedJson['item29.amount_paid']
      this.item30BalanceDue = parsedJson['item30.balance_due']
      this.item31SignatureOfPhysicianOrSupplier = parsedJson['item31.signature_of_physician_or_supplier']
      this.item31SignatureOfPhysicianOrSupplierDate = parsedJson['item31.signature_of_physician_or_supplier.date']
      this.item32ServiceFacilityLocationInformation = parsedJson['item32.service_facility_location_information']
      this.item32a = parsedJson['item32a']
      this.item21 = parsedJson['item21']
      this.item22MedicaidResubmissionCode = parsedJson['item22.medicaid_resubmission']
      this.item22MedicaidResubmissionOriginalRefNo = parsedJson['item22?.medicaid_resubmission']?.original_ref_no
      this.item23PriorAuthorizationNumber = parsedJson['item23.prior_authorization_number']
      this.item24 = parsedJson['item2']
      this.item25FederalTaxIdNumber = parsedJson['item25.federal_tax_id_number']
      this.item25Ssn = parsedJson['item25.ssn']
      this.item25Ein = parsedJson['item25.ein']
      this.item26PatientsAccountNo = parsedJson['item26.patients_account_no']
      this.item27AcceptAssignment = parsedJson['item27.accept_assignment.value']
      this.item28TotalCharge = parsedJson['item28.total_charge?.value']
      this.item29AmountPaid = parsedJson['item29.amount_paid']
      this.item30BalanceDue = parsedJson['item30.balance_due.unit']
      this.item31SignatureOfPhysicianOrSupplier = parsedJson['item31.signature_of_physician_or_supplier']
      this.item31SignatureOfPhysicianOrSupplierDate = parsedJson['item31.signature_of_physician_or_supplier?.date']
      this.item32ServiceFacilityLocationInformation = parsedJson['item32.service_facility_location_information']
      this.item32a = parsedJson['item32a']?.value
      this.item32b = parsedJson['item32b']
      this.item33BillingProviderInfo = parsedJson['item33.billing_provider_info']
      this.item33BillingProviderInfoPhoneNumber = parsedJson['item33.billing_provider_info']?.phone_number
      this.item33a = parsedJson['item33a']
      this.item33b = parsedJson['item33b']

      console.log(this)
  }

  carrier: {
      type: string;
      value: string;
    };
    item1Medicare: {
      type: string;
      value: boolean;
    };
    item1Medicaid: {
      type: string;
      value: boolean;
    };
    item1SponsorsSsn: {
      type: string;
      value: boolean;
    };
    item1MemberId: {
      type: string;
      value: boolean;
    };
    item1SsnOrId: {
      type: string;
      value: boolean;
    };
    item1Ssn: {
      type: string;
      value: boolean;
    };
    item1Id: {
      type: string;
      value: boolean;
    };
    item1aInsuredsIdNumber: {
      type: string;
      value: string;
    };
    item2PatientsName: {
      type: string;
      value: string;
    };
    item3PatientsBirthDate: {
      source: string;
      value: string;
      type: string;
    };
    item3Male: {
      type: string;
      value: boolean;
    };
    item3Female: {
      type: string;
      value: boolean;
    };
    item4InsuredsName: {
      type: string;
      value: string;
    };
    item5PatientsStreetAddress: {
      type: string;
      value: string;
    };
    item5PatientsCity: {
      type: string;
      value: string;
    };
    item5PatientsState: {
      type: string;
      value: string;
    };
    item5PatientsZipCode: {
      type: string;
      value: string;
    };
    item5PatientsTelephone: {
      type: string;
      source: string;
      value: string;
    };
    item6PatientRelationshipToInsuredSelf: {
      type: string;
      value: boolean;
    };
    item6PatientRelationshipToInsuredSpouse: {
      type: string;
      value: boolean;
    };
    item6PatientRelationshipToInsuredChild: {
      type: string;
      value: boolean;
    };
    item6PatientRelationshipToInsuredOther: {
      type: string;
      value: boolean;
    };
    item7InsuredsStreetAddress: {
      type: string;
      value: string;
    };
    item7InsuredsCity: {
      type: string;
      value: string;
    };
    item7InsuredsState: {
      type: string;
      value: string;
    };
    item7InsuredsZipCode: {
      type: string;
      value: string;
    };
    item7InsuredsTelephone: {
      type: string;
      value: string;
    };
    item8PatientStatusSingle: {
      type: string;
      value: boolean;
    };
    item8PatientStatusMarried: {
      type: string;
      value: boolean;
    };
    item8PatientStatusOther: {
      type: string;
      value: boolean;
    };
    item8PatientStatusEmployed: {
      type: string;
      value: boolean;
    };
    item8PatientStatusFullTimeStudent: {
      type: string;
      value: boolean;
    };
    item8PatientStatusPartTimeStudent: {
      type: string;
      value: boolean;
    };
    item9OtherInsuredsName: null;
    item9aOtherInsuredsNamePolicyOrGroupNumber: null;
    item9bOtherInsuredsBirthDate: null;
    item9bMale: {
      type: string;
      value: boolean;
    };
    item9bFemale: {
      type: string;
      value: boolean;
    };
    item9cEmployersNameOrSchoolName: null;
    item9dInsurancePlanNameOrProgramName: null;
    item10aIsPatientsConditionRelatedToEmployment: {
      type: string;
      value: boolean;
    };
    item10bIsPatientsConditionRelatedToAutoAccident: {
      type: string;
      value: boolean;
    };
    item10bIsPatientsConditionRelatedToAutoAccidentPlace: {
      type: string;
      value: string;
    };
    item10cIsPatientsConditionRelatedToOtherAccident: {
      type: string;
      value: boolean;
    };
    item10dReservedForLocalUse: null;
    item11InsuredsPolicyGroupOrFecaNumber: null;
    item11aInsuredsBirthDate: {
      source: string;
      value: string;
      type: string;
    };
    item11aMale: {
      type: string;
      value: boolean;
    };
    item11aFemale: {
      type: string;
      value: boolean;
    };
    item11bEmployersNameOrSchoolName: null;
    item11cInsurancePlanNameOrProgramName: null;
    item11dIsThereAnotherHealthBenefitPlan: {
      type: string;
      value: boolean;
    };
    item12PatientsAuthorizedPersonsSignature: {
      type: string;
      value: string;
    };
    item12PatientsAuthorizedPersonsDate: {
      source: string;
      value: string;
      type: string;
    };
    item13InsuredsAuthorizedPersonsSignature: {
      type: string;
      value: string;
    };
    item14DateOfCurrent: {
      source: string;
      value: string;
      type: string;
    };
    item15FirstDateSameSimilarIssue: null;
    item16DatesPatientUnableToWorkInCurrentOccupationFrom: null;
    item16DatesPatientUnableToWorkInCurrentOccupationTo: null;
    item17NameOfReferringProviderOrOtherSource: null;
    item17a: null;
    item17b: {
      type: string;
      value: string;
    };
    item18HospitalizationDatesRelatedToCurrentServicesFrom: null;
    item18HospitalizationDatesRelatedToCurrentServicesTo: null;
    item19ReservedForLocalUse: null;
    item20OutsideLab: {
      type: string;
      value: boolean;
    };
    item20Charges: null;
    item21: {
      item21DiagnosisPointer: {
        type: string;
        value: string;
      };
      item21DiagnosisOrNatureOfIllnessOrInjury: {
        value: string;
        type: string;
      };
    }[];
  item32ServiceFacilityLocationInformation: {
    type: string;
    value: string;
  };
  item32a: {
    type: string;
    value: string;
  };
  item21DiagnosisPointer: {
    type: string;
    value: string;
  }[];
  item21DiagnosisOrNatureOfIllnessOrInjury: {
    type: string;
    value: string;
  }[];
  item22MedicaidResubmissionCode: null;
  item22MedicaidResubmissionOriginalRefNo: null;
  item23PriorAuthorizationNumber: null;
  item24: {
    aDatesOfServiceFrom: {
      source: string;
      value: string;
      type: string;
    };
    aDatesOfServiceTo: {
      source: string;
      value: string;
      type: string;
    };
    bPlaceOfService: {
      type: string;
      value: string;
    };
    cEmg: null;
    dProceduresServicesOrSupplies: {
      type: string;
      value: string;
    };
    eDiagnosisPointer: {
      type: string;
      value: string;
    };
    fCharges: {
      source: string;
      value: number;
      unit: string;
      type: string;
    };
    gDaysOrUnits: {
      type: string;
      value: string;
    };
    hEpsdt: null;
    iIdQual: {
      type: string;
      value: string;
    };
    jRenderingProviderId: {
      type: string;
      value: string;
    };
  }[];
  item25FederalTaxIdNumber: {
    type: string;
    value: string;
  };
  item25Ssn: {
    type: string;
    value: boolean;
  };
  item25Ein: {
    type: string;
    value: boolean;
  };
  item26PatientsAccountNo: null;
  item27AcceptAssignment: {
    type: string;
    value: boolean;
  };
  item28TotalCharge: {
    source: string;
    value: number;
    unit: string;
    type: string;
  };
  item29AmountPaid: null;
  item30BalanceDue: {
    source: string;
    value: number;
    unit: string;
    type: string;
  };
  item31SignatureOfPhysicianOrSupplier: {
    type: string;
    value: string;
  };
  item31SignatureOfPhysicianOrSupplierDate: {
    source: string;
    value: string;
    type: string;
  };
  item32b: null;
  item33BillingProviderInfo: {
    type: string;
    value: string;
  };
  item33BillingProviderInfoPhoneNumber: {
    type: string;
    source: string;
    value: string;
  };
  item33a: {
    type: string;
    value: string;
  };
  item33b: null;

  mapClaim1500ToUserCreateClaimInput(): UserCreateClaimInput {
      const cms1500 = this;
      const userCreateClaimInput: UserCreateClaimInput = {};
  
      // Map fields from cms1500 to userCreateClaimInput
      userCreateClaimInput.carrierName = cms1500.carrier?.value;
      userCreateClaimInput.patientName = cms1500.item2PatientsName?.value;
      userCreateClaimInput.patientPhoneNumber = cms1500.item5PatientsTelephone?.value;
      userCreateClaimInput.patientDob = cms1500.item3PatientsBirthDate?.value;
      userCreateClaimInput.patientAddressLine1 = cms1500.item5PatientsStreetAddress?.value;    
      userCreateClaimInput.patientAddressCity = cms1500.item5PatientsCity?.value;
      userCreateClaimInput.patientAddressState = cms1500.item5PatientsState?.value;
      userCreateClaimInput.patientAddressPostalCode = cms1500.item5PatientsZipCode?.value;
  
      userCreateClaimInput.carrierName = cms1500.carrier?.value;
      
      // userCreateClaimInput.carrierLine1 = cms1500.item33BillingProviderInfo?.value;
      // userCreateClaimInput.carrierCity = cms1500.item33a?.value; // Replace "item33BillingProviderInfoPhoneNumber" with the actual field containing the city value
      // userCreateClaimInput.carrierState = cms1500.item33b; // Replace "item33BillingProviderInfoPhoneNumber" with the actual field containing the state value
      // userCreateClaimInput.carrierPostalCode = cms1500.item33BillingProviderInfoPhoneNumber?.postalCode; // Replace "item33BillingProviderInfoPhoneNumber" with the actual field containing the postal code value
  
      userCreateClaimInput.insuredName = cms1500.item4InsuredsName?.value;
      userCreateClaimInput.insuredLine1 = cms1500.item7InsuredsStreetAddress?.value;
      userCreateClaimInput.insuredCity = cms1500.item7InsuredsCity?.value;
      userCreateClaimInput.insuredState = cms1500.item7InsuredsState?.value;
      userCreateClaimInput.insuredPostalCode = cms1500.item7InsuredsZipCode?.value;
      // userCreateClaimInput.insuredPhoneNumber = cms1500.item7InsuredsTelephone?.value;
      // userCreateClaimInput.insuredDob = cms1500.item11aInsuredsBirthDate?.value;
      // userCreateClaimInput.insuredIdNumber = cms1500.item1aInsuredsIdNumber?.value;
      
      const assignDiagnosisCodes = (index: number) => {
          const diagnosisPointer = cms1500.item21[index]?.item21DiagnosisPointer?.value;
          if (diagnosisPointer) {
              userCreateClaimInput[`diagnosisCode${index + 1}`] = diagnosisPointer;
          }
      };
  
      // Use the iterator function for diagnosis codes 1 to 8
      for (let i = 0; i < 8; i++) {
          assignDiagnosisCodes(i);
      }          

      userCreateClaimInput.federalTaxId              = cms1500.item25FederalTaxIdNumber?.value;
      userCreateClaimInput.totalCharges              = cms1500.item28TotalCharge?.value;
      userCreateClaimInput.amountPaid                = cms1500.item29AmountPaid;
      userCreateClaimInput.physicianSignature        = cms1500.item31SignatureOfPhysicianOrSupplier?.value;
      userCreateClaimInput.physicianSignedOn         = cms1500.item31SignatureOfPhysicianOrSupplierDate?.value;
      userCreateClaimInput.serviceFacility           = cms1500.item32ServiceFacilityLocationInformation?.value;
      userCreateClaimInput.serviceFacilityLine1      = cms1500.item32a?.value;
      userCreateClaimInput.serviceFacilityCity       = cms1500.item32b; // Replace "item32ServiceFacilityLocationInformation" with the actual field containing the city value
      userCreateClaimInput.serviceFacilityState      = cms1500.item32b; // Replace "item32ServiceFacilityLocationInformation" with the actual field containing the state value
      userCreateClaimInput.serviceFacilityPostalCode = cms1500.item32b; // Replace "item32ServiceFacilityLocationInformation" with the actual field containing the postal code value
userCreateClaimInput.serviceFacilityNpi        = cms1500.item32b; // Replace "item32ServiceFacilityLocationInformation" with the actual field containing the NPI value
userCreateClaimInput.billingFacility           = cms1500.item33BillingProviderInfo?.value;

const billingAddress = cms1500.item33BillingProviderInfo?.value;
if (billingAddress) {
    const addressComponents = billingAddress.split(', '); // Assuming the address components are separated by a comma followed by a space
    if (addressComponents.length >= 3) {
        userCreateClaimInput.billingLine1 = addressComponents[0];
        userCreateClaimInput.billingCity = addressComponents[1];
        
        // Splitting state and zip code based on a space
        const stateAndZip = addressComponents[2].split(' ');
        if (stateAndZip.length >= 2) {
            userCreateClaimInput.billingState = stateAndZip[0];
            userCreateClaimInput.billingPostalCode = stateAndZip[1];
        }
    }
}

userCreateClaimInput.billingNpi                = cms1500.item33a?.value;
userCreateClaimInput.billingPhoneNumber        = cms1500.item33BillingProviderInfoPhoneNumber?.value;
userCreateClaimInput.billingOther              = cms1500.item33BillingProviderInfo?.value;
userCreateClaimInput.sessionNotes              = cms1500.item19ReservedForLocalUse;
userCreateClaimInput.referringProvider         = cms1500.item17NameOfReferringProviderOrOtherSource;
userCreateClaimInput.referringProviderNpi      = cms1500.item17b?.value;
userCreateClaimInput.additionalClaimInfo       = cms1500.item19ReservedForLocalUse;
userCreateClaimInput.patientAddressLine1       = cms1500.item5PatientsStreetAddress?.value;
userCreateClaimInput.accountNumber             = cms1500.item26PatientsAccountNo;
userCreateClaimInput.referenceNumber           = cms1500.item22MedicaidResubmissionOriginalRefNo;
userCreateClaimInput.facility                  = cms1500.item32ServiceFacilityLocationInformation?.value;
userCreateClaimInput.priorAuthorizationNumber  = cms1500.item23PriorAuthorizationNumber;
userCreateClaimInput.providerName              = cms1500.item33BillingProviderInfo?.value;
userCreateClaimInput.providerNumber            = cms1500.item33a?.value;
userCreateClaimInput.vendor                    = cms1500.item33BillingProviderInfo?.value;
userCreateClaimInput.vendorLine1               = cms1500.item33a?.value;
userCreateClaimInput.vendorCSZ                 = cms1500.item33b;
userCreateClaimInput.vendorTaxId               = cms1500.item25FederalTaxIdNumber?.value;
userCreateClaimInput.totalApprovedAmount      = cms1500.item29AmountPaid;
userCreateClaimInput.totalBilledAmount       = cms1500.item28TotalCharge?.value;
userCreateClaimInput.totalNetPayAmount      = cms1500.item30BalanceDue?.value;
userCreateClaimInput.notes                 = cms1500.item19ReservedForLocalUse;
      
  
      if (cms1500.item21) {
          userCreateClaimInput.procedures = [];
          for (const item of cms1500.item21) {
              const procedureInput: UserCreateClaimProcedureInput = {
                  name: item.item21DiagnosisOrNatureOfIllnessOrInjury?.value,
                  procedureCodeId: item.item21DiagnosisPointer?.value,
              };
              userCreateClaimInput.procedures.push(procedureInput);
          }
      }
  
      return userCreateClaimInput;
  }



}
