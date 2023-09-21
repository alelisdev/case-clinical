export interface PatientInsurance {
    MemberPlanMaxLevelRestriction: {
      Amount: number;
      EffectiveDate: string;
      ExpirationDate: string;
    };
    ContractId: number;
    ContractName: string;
    CreateDate: string;
    CreateUser: string;
    CustomerGroupCode: string;
    Mpi: number;
    OrderNo: number;
    ParticipantType: string;
    PatientRelationship: string;
    PatientRelationshipId: number;
    Pcn: string;
    PersonCode: string;
    PersonCodeDescription: string;
    RxGroup: string;
    TerminationDate: string;
    UpdateDate: string;
    UpdateUser: string;
    UserCustomerId: number;
    CardHolderId: string;
    EffectiveDate: string;
    ExpirationDate: string;
    FamilyId: string;
    GroupId: number;
    GroupName: string;
    Id: number;
    IsCdgRequired: boolean;
    IsMedicare: boolean;
    MaxTier: number;
  }
  
  export interface MailingAddress {
    Address1: string;
    City: string;
    State: string;
    ZipCode: string;
  }
  
  export interface PatientInfo {
    DateOfBirth: string;
    FirstName: string;
    GenderCode: string;
    Height: string;
    LastName1: string;
    MaritalStatusDescription: string;
    MaritalStatusId: number;
    Mpi: number;
    PatientFullName: string;
    PhoneNumber: string;
    PostalAddress1: string;
    PostalAddress2: string;
    PostalCity: string;
    PostalId: number;
    PostalState: string;
    PostalZipCode: string;
    ResidentialAddress1: string;
    ResidentialAddress2: string;
    ResidentialCity: string;
    ResidentialId: number;
    ResidentialState: string;
    ResidentialZipCode: string;
    MailingAddress: MailingAddress;
  }
  
  export interface PatientData {
    PatientInsurance: PatientInsurance;
    DateOfBirth: string;
    FirstName: string;
    GenderCode: string;
    Height: string;
    LastName1: string;
    MaritalStatusDescription: string;
    MaritalStatusId: number;
    Mpi: number;
    PatientFullName: string;
    PhoneNumber: string;
    PostalAddress1: string;
    PostalAddress2: string;
    PostalCity: string;
    PostalId: number;
    PostalState: string;
    PostalZipCode: string;
    ResidentialAddress1: string;
    ResidentialAddress2: string;
    ResidentialCity: string;
    ResidentialId: number;
    ResidentialState: string;
    ResidentialZipCode: string;
    MailingAddress: MailingAddress;
  }

  export interface MemberPlanMaxLevelRestriction {
    Amount: number;
    EffectiveDate: string;
    ExpirationDate: string;
  }
  
