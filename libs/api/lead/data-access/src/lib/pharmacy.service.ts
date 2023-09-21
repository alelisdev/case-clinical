import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApiCoreSharedService } from '@case-clinical/api/core/data-access';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PatientInsurance, PatientInfo, MemberPlanMaxLevelRestriction, PatientData, UserUpdateLeadInput } from '@case-clinical/api/lead/data-access';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PharmacyService implements OnModuleInit {
  private token: string;

  constructor(
    private readonly data: ApiCoreSharedService, 
    private readonly httpClient: HttpService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    // const username = this.configService.get<string>('PHARMACY_API_USERNAME');
    // const clientSecret = this.configService.get<string>('PHARMACY_API_CLIENT_SECRET');
    // console.log('username:', username);
    // console.log('clientSecret:', clientSecret);

    this.token = "" //await this.authenticateUser({ UserName: username, ClientSecret: clientSecret });
  }

  async authenticateUser(auth: { UserName: string; ClientSecret: string }) {
    try {

      const authResponse = await firstValueFrom(
        this.httpClient.post('https://oneark-api-test.pharmpix.com:44390/api/authentication/API', auth),
      );

      return authResponse.data.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  async sendDataToServer(patientData: any) {
    try {
      const headers = {
        Authorization: `Bearer ${this.token}`,
      };

      const response = await firstValueFrom(
        this.httpClient.post('https://oneark-api-test.pharmpix.com:44390/api/authentication/API', patientData, {
          headers,
        }),
      );

      console.log('Response from server:', response);

      return response.status === 200;
    } catch (error) {
      console.error('Sending data failed:', error);
      throw error;
    }
  }
  // Load from JSON method
  loadFromJson(Mrn: string, lead: UserUpdateLeadInput): PatientData {
    const memberPlanMaxLevelRestriction: MemberPlanMaxLevelRestriction = {
      Amount: 200,
      EffectiveDate: '2023-03-22',
      ExpirationDate: '2024-03-22',
    }

    const pharmacyApprovedAmount = 200;
    const pharmacyEffectiveDate = "2023-03-22"; // legalCase.createdOn
    const pharmacyExpirationDate = "2024-03-22"; // legalCase.createdOn + 2 years
    
    const patientInsurance: PatientInsurance = {
      MemberPlanMaxLevelRestriction: {
        Amount: pharmacyApprovedAmount,
        EffectiveDate: pharmacyEffectiveDate,
        ExpirationDate: pharmacyExpirationDate,
      },
      ContractId: 32,
      ContractName: "Araya PBM Services",
      CreateDate: new Date().toISOString(), // getdate()
      CreateUser: "ARAYA, PCHIPA",
      CustomerGroupCode: "PCH113797702",
      Mpi: 1599417,
      OrderNo: 1,
      ParticipantType: "I",
      PatientRelationship: "HOH/Cardholder",
      PatientRelationshipId: 1,
      Pcn: "NYM", // legalCase.pharmacyPCN
      PersonCode: "00",
      PersonCodeDescription: "Head of HouseHold",
      RxGroup: "PCHIPA1",
      TerminationDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString(), // legalCase.createOn + 2 years
      UpdateDate: new Date().toISOString(), // legalCase.updatedOn
      UpdateUser: "ARAYA, PCHIPA",
      UserCustomerId: 17,
      CardHolderId: Mrn, // MRN
      EffectiveDate: pharmacyEffectiveDate, // legalCase.effectiveDate or createdOn
      ExpirationDate: pharmacyExpirationDate, // legalCase.createOn + 2 years
      FamilyId: "PCH1234567892", // legalCase.memberRegistrationNumber
      GroupId: 8925,
      GroupName: "PCHIPA1",
      Id: 11120598, // gets returned from the pharmacy create, store it to update
      IsCdgRequired: true,
      IsMedicare: false,
      MaxTier: 3,
    };
    
    const patientDateOfBirth = "1986-01-01T00:00:00"; // legalCase.patient.dateOfBirth
    // const patientGender = legalCase.patient.gender.id === "Male" ? "1" : "2"; // IF Male == 1, IF Female == 2
    const patientGender = "1"

    const patientInfo: PatientInfo = {
      DateOfBirth: lead.dateOfBirth?.toISOString() ?? '',
      FirstName: lead.firstName ?? '',
      GenderCode: '', // Not available in Lead
      Height: '', // Not available in Lead
      LastName1: lead.lastName ?? '',
      MaritalStatusDescription: "Single",
      MaritalStatusId: 1,
      Mpi: 1599417, // static
      PatientFullName: lead.name,
      PhoneNumber: lead.phoneNumber ?? '',
      PostalAddress1: lead.address ?? '',
      PostalAddress2: '', // Not available in Lead
      PostalCity: lead.city ?? '',
      PostalState: lead.state ?? '',
      PostalZipCode: lead.postalCode ?? '',
      PostalId: 6780255,
      ResidentialId: 6780255,
      ResidentialAddress1: lead.address ?? '',
      ResidentialAddress2: '', // Not available in Lead
      ResidentialCity: lead.city ?? '',
      ResidentialState: lead.state ?? '',
      ResidentialZipCode: lead.postalCode ?? '',
      MailingAddress: {
        Address1: lead.address,
        City: lead.city,
        State: lead.state,
        ZipCode: lead.postalCode,
      },
      // ... (other unchanged code)
    };

    const jsonString = this.getPharmacyJsonString('123456', memberPlanMaxLevelRestriction, patientInsurance, patientInfo)

    return JSON.parse(jsonString) as PatientData
  }

  getPharmacyJsonString(
    Mrn: string,
    memberPlanMaxLevelRestriction: MemberPlanMaxLevelRestriction,
    patientInsurance: PatientInsurance,
    patientInfo: PatientInfo,
  ): string {
    return `{
      "PatientInsurance": {
          "MemberPlanMaxLevelRestriction": ${JSON.stringify(memberPlanMaxLevelRestriction)},
          "ContractId": ${patientInsurance.ContractId},
          "ContractName": "${patientInsurance.ContractName}",
          "CreateDate": "${patientInsurance.CreateDate}",
          "CreateUser": "${patientInsurance.CreateUser}",
          "CustomerGroupCode": "${patientInsurance.CustomerGroupCode}",
          "Mpi": ${patientInsurance.Mpi},
          "OrderNo": ${patientInsurance.OrderNo},
          "ParticipantType": "${patientInsurance.ParticipantType}",
          "PatientRelationship": "${patientInsurance.PatientRelationship}",
          "PatientRelationshipId": ${patientInsurance.PatientRelationshipId},
          "Pcn": "${patientInsurance.Pcn}",
          "PersonCode": "${patientInsurance.PersonCode}",
          "PersonCodeDescription": "${patientInsurance.PersonCodeDescription}",
          "RxGroup": "${patientInsurance.RxGroup}",
          "TerminationDate": "${patientInsurance.TerminationDate}",
          "UpdateDate": "${patientInsurance.UpdateDate}",
          "UpdateUser": "${patientInsurance.UpdateUser}",
          "UserCustomerId": ${patientInsurance.UserCustomerId},
          "CardHolderId": "${Mrn}",
          "EffectiveDate": "${patientInsurance.EffectiveDate}",
          "ExpirationDate": "${patientInsurance.ExpirationDate}",
          "FamilyId": "${patientInsurance.FamilyId}",
          "GroupId": ${patientInsurance.GroupId},
          "GroupName": "${patientInsurance.GroupName}",
          "Id": ${patientInsurance.Id},
          "IsCdgRequired": ${patientInsurance.IsCdgRequired},
          "IsMedicare": ${patientInsurance.IsMedicare},
          "MaxTier": ${patientInsurance.MaxTier}
      },
      "DateOfBirth": "${patientInfo.DateOfBirth}",
      "FirstName": "${patientInfo.FirstName}",
      "GenderCode": "${patientInfo.GenderCode}",
      "Height": "${patientInfo.Height}",
      "LastName1": "${patientInfo.LastName1}",
      "MaritalStatusDescription": "${patientInfo.MaritalStatusDescription}",
      "MaritalStatusId": ${patientInfo.MaritalStatusId},
      "Mpi": ${patientInfo.Mpi},
      "PatientFullName": "${patientInfo.PatientFullName}",
      "PhoneNumber": "${patientInfo.PhoneNumber}",
      "PostalAddress1": "${patientInfo.PostalAddress1}",
      "PostalAddress2": "${patientInfo.PostalAddress2}",
      "PostalCity": "${patientInfo.PostalCity}",
      "PostalId": ${patientInfo.PostalId},
      "PostalState": "${patientInfo.PostalState}",
      "PostalZipCode": "${patientInfo.PostalZipCode}",
      "ResidentialAddress1": "${patientInfo.ResidentialAddress1}",
      "ResidentialAddress2": "${patientInfo.ResidentialAddress2}",
      "ResidentialCity": "${patientInfo.ResidentialCity}",
      "ResidentialId": ${patientInfo.ResidentialId},
      "ResidentialState": "${patientInfo.ResidentialState}",
      "ResidentialZipCode": "${patientInfo.ResidentialZipCode}",
      "MailingAddress": ${JSON.stringify(patientInfo.MailingAddress)}
  }`
  }
}
