import {UserCreateClaimInput} from '@case-clinical/api/claim/data-access';
import {UserCreateClaimProcedureInput} from '@case-clinical/api/claim-procedure/data-access';

type DataType = 'string' | 'boolean' | 'date' | 'phoneNumber' | 'currency';

class DataField<T> {
    type: DataType;
    value: T;
    source?: string;
    unit?: string;
  
    constructor(value?: T, type?: DataType, source?: string, unit?: string) {
      if (value !== undefined) {
        this.value = value;
      }
  
      if (type !== undefined) {
        this.type = type;
      } else if (value !== undefined) {
        this.type = typeof value as DataType;
      }
  
      if (source !== undefined) {
        this.source = source;
      }
  
      if (unit !== undefined) {
        this.unit = unit;
      }
    }
  }

class Item21 {
  diagnosisPointer: string;
  diagnosisOrNature: string | null;

  constructor(data: any) {
    this.diagnosisPointer = data['item21.diagnosis_pointer']?.value || '';
    this.diagnosisOrNature = data['item21.diagnosis_or_nature_of_illness_or_injury']?.value || null;
  }
}

class Item1 {
  medicare: boolean;
  medicaid: boolean;
  sponsors_ssn: boolean;
  member_id: boolean;
  ssn_or_id: boolean;
  ssn: boolean;
  id: boolean;
  
  constructor(data: any) {
    this.medicare = data['item1.medicare']?.value || false;
    this.medicaid = data['item1.medicaid']?.value || false;
    this.sponsors_ssn = data['item1.sponsors_ssn']?.value || false;
    this.member_id = data['item1.member_id']?.value || false;
    this.ssn_or_id = data['item1.ssn_or_id']?.value || false;
    this.ssn = data['item1.ssn']?.value || false;
    this.id = data['item1.id']?.value || false;
  }
}

class Item2 {
  fullName: string;
  address: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  
  constructor(data: any) {
    this.fullName = data['item2.full_name']?.value || '';
    this.address = data['item2.address']?.value || '';
    this.dob = data['item2.date_of_birth']?.value || '';
    this.gender = data['item2.gender']?.value || '';
    this.phoneNumber = data['item2.phone_number']?.value || '';
  }
}
class Item3 {
  occupation: string;
  salary: number;
  maritalStatus: string;
  children: number;
  
  constructor(data: any) {
    this.occupation = data['item3.occupation']?.value || '';
    this.salary = data['item3.salary']?.value || 0;
    this.maritalStatus = data['item3.marital_status']?.value || '';
    this.children = data['item3.children']?.value || 0;
  }
}

class Item4 {
    doctorFirstName: string;
    doctorLastName: string;
    doctorSpecialty: string;
    doctorNPI: string;
    doctorPhone: string;
  
    constructor(data: any) {
      this.doctorFirstName = data.doctorFirstName || '';
      this.doctorLastName = data.doctorLastName || '';
      this.doctorSpecialty = data.doctorSpecialty || '';
      this.doctorNPI = data.doctorNPI || '';
      this.doctorPhone = data.doctorPhone || '';
    }
  }

class Item5 {
    patientsStreetAddress: string;
    patientsCity: string;
    patientsState: string;
    patientsZipCode: string;
    patientsTelephone: string;
  
    constructor(data: any) {
      this.patientsStreetAddress = data.patientsStreetAddress || '';
      this.patientsCity = data.patientsCity || '';
      this.patientsState = data.patientsState || '';
      this.patientsZipCode = data.patientsZipCode || '';
      this.patientsTelephone = data.patientsTelephone || '';
    }
  }

class Item6 {
    id: number;
    name: string;
    sections: Item2[];
    price: number;
    active: boolean;
  
    constructor(apiResponse: Item6) {
      this.id = apiResponse.id;
      this.name = apiResponse.name;
      this.sections = apiResponse.sections;
      this.price = apiResponse.price;
      this.active = apiResponse.active;
    }
  }

  class Item7 {
    medicationName: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
  
    constructor(data: any) {
      this.medicationName = data.medicationName || '';
      this.dosage = data.dosage || '';
      this.frequency = data.frequency || '';
      this.startDate = data.startDate || '';
      this.endDate = data.endDate || '';
    }
  }

  class Item8 {
    patientStatusSingle: boolean;
    patientStatusMarried: boolean;
    patientStatusOther: boolean;
    patientStatusEmployed: boolean;
    patientStatusFullTimeStudent: boolean;
    patientStatusPartTimeStudent: boolean;
  
    constructor(data: any) {
      this.patientStatusSingle = data['item8.patient_status.single']?.value || false;
      this.patientStatusMarried = data['item8.patient_status.married']?.value || false;
      this.patientStatusOther = data['item8.patient_status.other']?.value || false;
      this.patientStatusEmployed = data['item8.patient_status.employed']?.value || false;
      this.patientStatusFullTimeStudent = data['item8.patient_status.full_time_student']?.value || false;
      this.patientStatusPartTimeStudent = data['item8.patient_status.part_time_student']?.value || false;
    }
  }
  
  class Item9 {
    otherInsuredsName: string | null;
  
    constructor(data: any) {
      this.otherInsuredsName = data['item9.other_insureds_name'];
    }
  }

  class Item9a {
    otherInsuredsNamePolicyOrGroupNumber: string | null;
  
    constructor(data: any) {
      this.otherInsuredsNamePolicyOrGroupNumber = data['item9a.other_insureds_name_policy_or_group_number'];
    }
  }
  
  class Item9b {
    otherInsuredsBirthDate: string | null;
    male: boolean;
    female: boolean;
  
    constructor(data: any) {
      this.otherInsuredsBirthDate = data['item9b.other_insureds_birth_date'];
      this.male = data['item9b.male']?.value || false;
      this.female = data['item9b.female']?.value || false;
    }
  }
  
  class Item9c {
    employersNameOrSchoolName: string | null;
  
    constructor(data: any) {
      this.employersNameOrSchoolName = data['item9c.employers_name_or_school_name'];
    }
  }
  
  class Item9d {
    insurancePlanNameOrProgramName: string | null;
  
    constructor(data: any) {
      this.insurancePlanNameOrProgramName = data['item9d.insurance_plan_name_or_program_name'];
    }
  }

  class Item10a {
    isPatientsConditionRelatedToEmployment: boolean;
  
    constructor(data: any) {
      this.isPatientsConditionRelatedToEmployment = data['item10a.is_patients_condition_related_to_employment']?.value || false;
    }
  }
  
  class Item10b {
    isPatientsConditionRelatedToAutoAccident: boolean;
    place: string;
  
    constructor(data: any) {
      this.isPatientsConditionRelatedToAutoAccident = data['item10b.is_patients_condition_related_to_auto_accident']?.value || false;
      this.place = data['item10b.is_patients_condition_related_to_auto_accident.place']?.value || '';
    }
  }
  
  class Item10c {
    isPatientsConditionRelatedToOtherAccident: boolean;
  
    constructor(data: any) {
      this.isPatientsConditionRelatedToOtherAccident = data['item10c.is_patients_condition_related_to_other_accident']?.value || false;
    }
  }
  
  class Item10d {
    reservedForLocalUse: string | null;
  
    constructor(data: any) {
      this.reservedForLocalUse = data['item10d.reserved_for_local_use'];
    }
  }

  class Item11 {
    insuredsPolicyGroupOrFecaNumber: string | null;
  
    constructor(data: any) {
      this.insuredsPolicyGroupOrFecaNumber = data['item11.insureds_policy_group_or_feca_number'];
    }
  }
  
  class Item11a {
    insuredsBirthDate: string;
    male: boolean;
    female: boolean;
  
    constructor(data: any) {
      this.insuredsBirthDate = data['item11a.insureds_birth_date']?.value || '';
      this.male = data['item11a.male']?.value || false;
      this.female = data['item11a.female']?.value || false;
    }
  }
  
  class Item11b {
    employersNameOrSchoolName: string | null;
  
    constructor(data: any) {
      this.employersNameOrSchoolName = data['item11b.employers_name_or_school_name'];
    }
  }
  
  class Item11c {
    insurancePlanNameOrProgramName: string | null;
  
    constructor(data: any) {
      this.insurancePlanNameOrProgramName = data['item11c.insurance_plan_name_or_program_name'];
    }
  }
  
  class Item11d {
    isThereAnotherHealthBenefitPlan: boolean;
  
    constructor(data: any) {
      this.isThereAnotherHealthBenefitPlan = data['item11d.is_ther_another_health_benefit_plan']?.value || false;
    }
  }


  type Diagnosis = {
    diagnosisPointer: string;
    diagnosisOrNatureOfIllnessOrInjury: string | null;
  };
  
  type Service = {
    aDatesOfServiceFrom: string;
    aDatesOfServiceTo: string;
    bPlaceOfService: string;
    cEmg: string | null;
    dProceduresServicesOrSupplies: string;
    eDiagnosisPointer: string;
    fCharges: number;
    gDaysOrUnits: string;
    hEpsdt: string | null;
    iIdQual: string;
    jRenderingProviderId: string;
  };
  
  class Item12 {
    patientsAuthorizedPersonsDate: string;
  
    constructor(data: any) {
      this.patientsAuthorizedPersonsDate = data['item12.patients_authorized_persons.date']?.value || '';
    }
  }
  
  class Item13 {
    insuredsAuthorizedPersonsSignature: string;
  
    constructor(data: any) {
      this.insuredsAuthorizedPersonsSignature = data['item13.insureds_authorized_persons.signature']?.value || '';
    }
  }
  
  class Item14 {
    dateOfCurrent: string;
  
    constructor(data: any) {
      this.dateOfCurrent = data['item14.date_of_current']?.value || '';
    }
  }
  
  class Item15 {
    firstDateSameSimilarIssue: string | null;
  
    constructor(data: any) {
      this.firstDateSameSimilarIssue = data['item15.first_date_same_similar_issue'];
    }
  }
  
  class Item16 {
    datesPatientUnableToWorkInCurrentOccupationFrom: string | null;
    datesPatientUnableToWorkInCurrentOccupationTo: string | null;
  
    constructor(data: any) {
      this.datesPatientUnableToWorkInCurrentOccupationFrom = data['item16.dates_patient_unable_to_work_in_current_occupation.from'];
      this.datesPatientUnableToWorkInCurrentOccupationTo = data['item16.dates_patient_unable_to_work_in_current_occupation.to'];
    }
  }
  
  class Item17 {
    nameOfReferringProviderOrOtherSource: string | null;
    a: string | null;
    b: string;
  
    constructor(data: any) {
      this.nameOfReferringProviderOrOtherSource = data['item17.name_of_referring_provider_or_other_source'];
      this.a = data['item17a'];
      this.b = data['item17b']?.value || '';
    }
  }
  
  class Item18 {
    hospitalizationDatesFrom: Date | null;
    hospitalizationDatesTo: Date | null;
  
    constructor(data: any) {
      this.hospitalizationDatesFrom = data['from'];
      this.hospitalizationDatesTo = data['to'];
    }
  }
  
  class Item19 {
    reservedForLocalUse: any | null;
  
    constructor(data: any) {
      this.reservedForLocalUse = data;
    }
  }
  
  class Item20 {
    outsideLab: boolean;
    charges: any | null;
  
    constructor(data: any) {
      this.outsideLab = data['outside_lab']?.value || false;
      this.charges = data['charges'];
    }
  }
  
  class Item22 {
    medicaidCode: any | null;
    medicaidOriginalRefNo: any | null;
  
    constructor(data: any) {
      this.medicaidCode = data['medicaid_resubmission.code'];
      this.medicaidOriginalRefNo = data['medicaid_resubmission.original_ref_no'];
    }
  }
  
  class Item23 {
    priorAuthorizationNumber: any | null;
  
    constructor(data: any) {
      this.priorAuthorizationNumber = data;
    }
  }

  
  class Item33 {
    billingProviderInfo: string;
    billingProviderInfoPhoneNumber: string;
    a: string;
    b: string | null;
  
    constructor(data: any) {
      this.billingProviderInfo = data['item33.billing_provider_info']?.value || '';
      this.billingProviderInfoPhoneNumber = data['item33.billing_provider_info.phone_number']?.value || '';
      this.a = data['item33a']?.value || '';
      this.b = data['item33b'];
    }
  }

  class Item24 {
    datesOfServiceFrom: Date;
    datesOfServiceTo: Date;
    placeOfService: string;
    emg: any | null;
    proceduresServicesOrSupplies: string;
    diagnosisPointer: string;
    charges: number;
    daysOrUnits: string;
    epsdt: any | null;
    idQual: string;
    renderingProviderId: string;
  
    constructor(data: any) {
      this.datesOfServiceFrom = new Date(data['a.dates_of_service.from'].value);
      this.datesOfServiceTo = new Date(data['a.dates_of_service.to'].value);
      this.placeOfService = data['b.place_of_service'].value;
      this.emg = data['c.emg'];
      this.proceduresServicesOrSupplies = data['d.procedures_services_or_supplies'].value;
      this.diagnosisPointer = data['e.diagnosis_pointer'].value;
      this.charges = data['f.charges'].value;
      this.daysOrUnits = data['g.days_or_units'].value;
      this.epsdt = data['h.epsdt'];
      this.idQual = data['i.id_qual'].value;
      this.renderingProviderId = data['j.rendering_provider_id'].value;
    }
  }
  
  class Item25 {
    federalTaxIdNumber: string;
    ssn: boolean;
    ein: boolean;
  
    constructor(data: any) {
      this.federalTaxIdNumber = data['federal_tax_id_number'].value;
      this.ssn = data['ssn'].value;
      this.ein = data['ein'].value;
    }
  }
  
  class Item26 {
    patientsAccountNo: any | null;
  
    constructor(data: any) {
      this.patientsAccountNo = data;
    }
  }
  
  class Item27 {
    acceptAssignment: boolean;
  
    constructor(data: any) {
      this.acceptAssignment = data['accept_assignment'].value;
    }
  }
  
  class Item28 {
    totalCharge: number;
  
    constructor(data: any) {
      this.totalCharge = data['total_charge'].value;
    }
  }
  
  class Item29 {
    amountPaid: any | null;
  
    constructor(data: any) {
      this.amountPaid = data;
    }
  }
  
  class Item30 {
    balanceDue: number;
  
    constructor(data: any) {
      this.balanceDue = data['balance_due'].value;
    }
  }
  
  class Item31 {
    signature: string;
    signatureDate: Date;
  
    constructor(data: any) {
      this.signature = data['signature_of_physician_or_supplier'].value;
      this.signatureDate = new Date(data['signature_of_physician_or_supplier.date'].value);
    }
  }
  
  class Item32 {
    serviceFacilityLocationInformation: string;
  
    constructor(data: any) {
      this.serviceFacilityLocationInformation = data['service_facility_location_information'].value;
    }
  }
  
  class Item32a {
    value: string;
  
    constructor(data: any) {
      this.value = data['value'];
    }
  }
  
  class Item32b {
    value: any | null;
  
    constructor(data: any) {
      this.value = data;
    }
  }

  export class SensibleService {
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

    mapClaim1500ToUserCreateClaimInput(cms1500: SensibleService): UserCreateClaimInput {
        const userCreateClaimInput: UserCreateClaimInput = {};
    
        // Map fields from cms1500 to userCreateClaimInput
        userCreateClaimInput.carrierName = cms1500.carrier?.value;
        userCreateClaimInput.patientName = cms1500.item2PatientsName?.value;
        userCreateClaimInput.patientPhoneNumber = cms1500.item5PatientsTelephone?.value;
        userCreateClaimInput.patientDob = cms1500.item3PatientsBirthDate.value;
        userCreateClaimInput.patientAddressLine1 = cms1500.item5PatientsStreetAddress.value;    
        userCreateClaimInput.patientAddressCity = cms1500.item5PatientsCity.value;
        userCreateClaimInput.patientAddressState = cms1500.item5PatientsState.value;
        userCreateClaimInput.patientAddressPostalCode = cms1500.item5PatientsZipCode.value;
    
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


class CMS1500 {
    carrier: DataField<string>
    item1: Item1
    item2: Item2
    item3: Item3
    item4: Item4
    item5: Item5
    item6: Item6
    item7: Item7
    item8: Item8
    item9: Item9
    item9a: Item9a
    item9b: Item9b
    item9c: Item9c
    item9d: Item9d
    item10a: Item10a
    item10b: Item10b
    item10c: Item10c
    item10d: Item10d
    item11: Item11
    item11a: Item11a
    item11b: Item11b
    item11c: Item11c
    item11d: Item11d
    item12: Item12
    item13: Item13
    item14: Item14
    item15: Item15
    item16: Item16
    item17: Item17
    item18: Item18
    item19: Item19
    item20: Item20
    item21: Item21[]
    item22: Item22
    item23: Item23
    item24: Item24[]
    item25: Item25
    item26: Item26
    item27: Item27
    item28: Item28
    item29: Item29
    item30: Item30
    item31: Item31
    item32: Item32
    item32a: Item32a
    item32b: Item32b
    item33: Item33

    constructor(apiResponse: any) {
        this.carrier = new DataField('string', apiResponse.carrier);
        this.item1 = new Item1(apiResponse.item1);
        this.item2 = new Item2(apiResponse.item2);
        this.item3 = new Item3(apiResponse.item3);
        this.item4 = new Item4(apiResponse.item4);
        this.item5 = new Item5(apiResponse.item5);
        this.item6 = new Item6(apiResponse.item6);
        this.item7 = new Item7(apiResponse.item7);
        this.item8 = new Item8(apiResponse.item8);
        this.item9 = new Item9(apiResponse.item9);
        this.item9a = new Item9a(apiResponse.item9a);
        this.item9b = new Item9b(apiResponse.item9b);
        this.item9c = new Item9c(apiResponse.item9c);
        this.item9d = new Item9d(apiResponse.item9d);
        this.item10a = new Item10a(apiResponse.item10a);
        this.item10b = new Item10b(apiResponse.item10b);
        this.item10c = new Item10c(apiResponse.item10c);
        this.item10d = new Item10d(apiResponse.item10d);
        this.item11 = new Item11(apiResponse.item11);
        this.item11a = new Item11a(apiResponse.item11a);
        this.item11b = new Item11b(apiResponse.item11b);
        this.item11c = new Item11c(apiResponse.item11c);
        this.item11d = new Item11d(apiResponse.item11d);
        this.item12 = new Item12(apiResponse.item12);
        this.item13 = new Item13(apiResponse.item13);
        this.item14 = new Item14(apiResponse.item14);
        this.item15 = new Item15(apiResponse.item15);
        this.item16 = new Item16(apiResponse.item16);
        this.item17 = new Item17(apiResponse.item17);
        this.item18 = new Item18(apiResponse.item18);
        this.item19 = new Item19(apiResponse.item19);
        this.item20 = new Item20(apiResponse.item20);
        this.item21 = apiResponse.item21.map((item: any) => new Item21(item));
        this.item22 = new Item22(apiResponse.item22);
        this.item23 = new Item23(apiResponse.item23);
        this.item24 = apiResponse.item24.map((item: any) => new Item24(item));
        this.item25 = new Item25(apiResponse.item25);
        this.item26 = new Item26(apiResponse.item26);
        this.item27 = new Item27(apiResponse.item27);
        this.item28 = new Item28(apiResponse.item28);
        this.item29 = new Item29(apiResponse.item29);
        this.item30 = new Item30(apiResponse.item30);
        this.item31 = new Item31(apiResponse.item31);
        this.item32 = new Item32(apiResponse.item32);
        this.item32a = new Item32a(apiResponse.item32a);
        this.item32b = new Item32b(apiResponse.item32b);
        this.item33 = new Item33(apiResponse.item33);
      }

      mapClaim1500ToUserCreateClaimInput(cms1500: CMS1500): UserCreateClaimInput {
        const userCreateClaimInput: UserCreateClaimInput = {};
        userCreateClaimInput.carrierName = cms1500.carrier?.value;
        userCreateClaimInput.patientName = cms1500.item2?.fullName;
        userCreateClaimInput.patientPhoneNumber = cms1500.item2?.phoneNumber; 
        userCreateClaimInput.patientDob = cms1500.item2.dob; 

         userCreateClaimInput.patientAddressCity      = cms1500.item5.patientsCity;  
         userCreateClaimInput.patientAddressState       = cms1500.item5.patientsState;
         userCreateClaimInput.patientAddressPostalCode  = cms1500.item5.patientsZipCode;
         userCreateClaimInput.carrierName               = cms1500.carrier?.value;
         userCreateClaimInput.carrierLine1              = cms1500.item33.billingProviderInfo;
         userCreateClaimInput.carrierLine2              = ''
         userCreateClaimInput.carrierCity               
         userCreateClaimInput.carrierState              
         userCreateClaimInput.carrierPostalCode         
         userCreateClaimInput.insuredName               
         userCreateClaimInput.insuredLine1              
         userCreateClaimInput.insuredCity               
         userCreateClaimInput.insuredState              
         userCreateClaimInput.insuredPostalCode         
         userCreateClaimInput.patientSignature          
         userCreateClaimInput.diagnosisCode1            
         userCreateClaimInput.diagnosisCode2            
         userCreateClaimInput.diagnosisCode3            
         userCreateClaimInput.diagnosisCode4            
         userCreateClaimInput.diagnosisCode5            
         userCreateClaimInput.diagnosisCode6            
         userCreateClaimInput.diagnosisCode7            
         userCreateClaimInput.diagnosisCode8            
         userCreateClaimInput.federalTaxId              
         userCreateClaimInput.totalCharges              
         userCreateClaimInput.amountPaid                
         userCreateClaimInput.physicianSignature        
         userCreateClaimInput.physicianSignedOn         
         userCreateClaimInput.serviceFacility           
         userCreateClaimInput.serviceFacilityLine1      
         userCreateClaimInput.serviceFacilityCity       
         userCreateClaimInput.serviceFacilityState      
         userCreateClaimInput.serviceFacilityPostalCode 
   userCreateClaimInput.serviceFacilityNpi        
   userCreateClaimInput.billingFacility           
   userCreateClaimInput.billingLine1              
   userCreateClaimInput.billingCity               
   userCreateClaimInput.billingState              
   userCreateClaimInput.billingPostalCode         
   userCreateClaimInput.billingNpi                
   userCreateClaimInput.billingPhoneNumber        
   userCreateClaimInput.billingOther              
   userCreateClaimInput.sessionNotes              
   userCreateClaimInput.referringProvider         
   userCreateClaimInput.referringProviderNpi      
   userCreateClaimInput.additionalClaimInfo       
   userCreateClaimInput.patientAddressLine1       
   userCreateClaimInput.accountNumber             
   userCreateClaimInput.referenceNumber           
   userCreateClaimInput.facility                  
   userCreateClaimInput.priorAuthorizationNumber  
   userCreateClaimInput.providerName              
   userCreateClaimInput.providerNumber            
   userCreateClaimInput.vendor                    
   userCreateClaimInput.vendorLine1               
   userCreateClaimInput.vendorCSZ                 
   userCreateClaimInput.vendorTaxId               
   userCreateClaimInput.totalApprovedAmount
   userCreateClaimInput.totalBilledAmount
   userCreateClaimInput.totalNetPayAmount
   userCreateClaimInput.notes 
        if (cms1500.item21) {
            userCreateClaimInput.procedures = [];
            for (const item of cms1500.item21) {
                const procedureInput: UserCreateClaimProcedureInput = {
                    name: item?.diagnosisOrNature,
                    procedureCodeId: item?.diagnosisPointer,
                };
                userCreateClaimInput.procedures.push(procedureInput);
            }
        }
    
        return userCreateClaimInput;
     }
    }

// Usage
const jsonData: any = {/* Your JSON data */};
const cms1500: CMS1500 = jsonData;
