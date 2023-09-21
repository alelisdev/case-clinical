
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserLegalCases Query Test', async ({ page }) => {
  const query = `
  query UserLegalCases($input: UserListLegalCaseInput) {
    items: userLegalCases(input: $input) {
id
createdAt
updatedAt
name
accidentTypeId
patientId
medLevelId
firmId
attorneyId
caseStatusId
caseTypeId
patientTreatmentStatusId
medicalRecordNumber
pharmacyControlNumber
pchGroupNumber
dateOfLoss
caseStatusDate
caseStatusOther
paralegal
paralegalContact
caseNoteSummary
policyLimit
attorneyFee 
referringPhysician
noMoreTreatment
medpay
fileNumber
caseNumber
accidentState 
attorneyPaid
attorneySentDate
writeOff
noMRI
noPT
noFirstAppointment
hot
documentsUploaded
attorneyReview
escalatedReview
inActive
criteria1712
documentUploadedDate
patientDischargedGatheringRecordsDate
resubmitted
caseProgressStatusId
firmCaseManager
adverseInsuranceStatusId
createdBy
renegotiatePayOffDate
accidentType {
id
name
}
patient {
id
name
}
medLevel {
id
name
}
firm {
id
name
}
attorney {
id
name
}
caseStatus {
id
name
}
caseType {
id
name
}
patientTreatmentStatus {
id
name
} 
caseProgressStatus {
id
name
}
adverseInsuranceStatus {
id
name
}

underwriting_dateCreated
underwriting_lastUpdateDate
underwriting_timeSensitive
underwriting_needsMoreInfo
underwriting_billsAttached
underwriting_completedMedRecs
underwriting_balance
underwriting_signedLien
underwriting_procedureRequested
underwriting_medBills
underwriting_estimate
underwriting_plaintiff
underwriting_covered
underwriting_remarks
accidentInformation_accidentDescription
accidentInformation_dateOfLoss
accidentInformation_review
accidentInformation_initialEvaluation
accidentInformation_evaluation
accidentInformation_evaluationAfterHowLong
accidentInformation_evaluatedIn
accidentInformation_complaints
accidentInformation_previousHistory
accidentInformation_gapInCare
accidentInformation_gapInCareWhen
accidentInformation_preExistingProblems
accidentInformation_priorInjuries
accidentInformation_otherInjuriesSince
motorVehicleAccident_mvaDriver
motorVehicleAccident_mvaPassenger
motorVehicleAccident_mvaVehicle
motorVehicleAccident_mvaClaimants
motorVehicleAccident_mvaOperable
motorVehicleAccident_mvaTar
motorVehicleAccident_mvaDamage
motorVehicleAccident_mvaLess
motorVehicleAccident_mvaGreater
motorVehicleAccident_mvaAmount
premiseAccident_clientHasObtainedPlaintiffAdvance
premiseAccident_advanceAmount
premiseAccident_lossOfEarningsIsBeingFiled
premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart
premiseAccident_explain
premiseAccident_clientHasCriminalHistory
premiseAccident_criminalHistory
premiseAccident_locationOfIncident
productLiability_product
productLiability_whereDidItHappen
productLiability_proofOfLiability
productLiability_productWasRecalled
workRelated_selfInsuredWorkComp
workRelated_workCompCaseIsOpenClosed
workRelated_workCompCaseSettledAmount
workRelated_workCompCaseSettlementIncludesFutureMedicals
workRelated_reasonNotFiledUnderWorkComp




caseAccounts {
  id
  name
}

balanceRequests {
  id
  name
}

casePreAccidents {
  id
  name
}

casePreInjuries {
  id
  name
}

casePreProblems {
  id
  name
}

insurances {
  id
  name
}

casePreProcedures {
  id
  name
}

caseProcedures {
  id
  name
}

priorMedsToDates {
  id
  name
}

appointments {
  id
  name
}
    }
    count: userCountLegalCases(input: $input) {
      total
    }
  }
  `;

  // Send a GraphQL query to the endpoint
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const response = await sendGraphQLQuery(url.href, query);

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { items, count } = data;
  expect(items).toBeDefined();
  expect(count).toBeDefined();
});

test('UserCountLegalCases Query Test', async ({ page }) => {
  const query = `
    query UserCountLegalCases($input: UserListLegalCaseInput) {
      count: userCountLegalCases(input: $input) {
        total
      }
    }
  `;

  // Send a GraphQL query to the endpoint
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const response = await sendGraphQLQuery(url.href, query);

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { count } = data;
  expect(count).toBeDefined();
});

test('UserSelectLegalCases Query Test', async ({ page }) => {
  const query = `
  query UserSelectLegalCases($input: UserListLegalCaseInput) {
    items: userSelectLegalCases(input: $input) {
id
createdAt
updatedAt
name
accidentTypeId
patientId
medLevelId
firmId
attorneyId
caseStatusId
caseTypeId
patientTreatmentStatusId
medicalRecordNumber
pharmacyControlNumber
pchGroupNumber
dateOfLoss
caseStatusDate
caseStatusOther
paralegal
paralegalContact
caseNoteSummary
policyLimit
attorneyFee 
referringPhysician
noMoreTreatment
medpay
fileNumber
caseNumber
accidentState 
attorneyPaid
attorneySentDate
writeOff
noMRI
noPT
noFirstAppointment
hot
documentsUploaded
attorneyReview
escalatedReview
inActive
criteria1712
documentUploadedDate
patientDischargedGatheringRecordsDate
resubmitted
caseProgressStatusId
firmCaseManager
adverseInsuranceStatusId
createdBy
renegotiatePayOffDate
accidentType {
id
name
}
patient {
id
name
}
medLevel {
id
name
}
firm {
id
name
}
attorney {
id
name
}
caseStatus {
id
name
}
caseType {
id
name
}
patientTreatmentStatus {
id
name
} 
caseProgressStatus {
id
name
}
adverseInsuranceStatus {
id
name
}

underwriting_dateCreated
underwriting_lastUpdateDate
underwriting_timeSensitive
underwriting_needsMoreInfo
underwriting_billsAttached
underwriting_completedMedRecs
underwriting_balance
underwriting_signedLien
underwriting_procedureRequested
underwriting_medBills
underwriting_estimate
underwriting_plaintiff
underwriting_covered
underwriting_remarks
accidentInformation_accidentDescription
accidentInformation_dateOfLoss
accidentInformation_review
accidentInformation_initialEvaluation
accidentInformation_evaluation
accidentInformation_evaluationAfterHowLong
accidentInformation_evaluatedIn
accidentInformation_complaints
accidentInformation_previousHistory
accidentInformation_gapInCare
accidentInformation_gapInCareWhen
accidentInformation_preExistingProblems
accidentInformation_priorInjuries
accidentInformation_otherInjuriesSince
motorVehicleAccident_mvaDriver
motorVehicleAccident_mvaPassenger
motorVehicleAccident_mvaVehicle
motorVehicleAccident_mvaClaimants
motorVehicleAccident_mvaOperable
motorVehicleAccident_mvaTar
motorVehicleAccident_mvaDamage
motorVehicleAccident_mvaLess
motorVehicleAccident_mvaGreater
motorVehicleAccident_mvaAmount
premiseAccident_clientHasObtainedPlaintiffAdvance
premiseAccident_advanceAmount
premiseAccident_lossOfEarningsIsBeingFiled
premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart
premiseAccident_explain
premiseAccident_clientHasCriminalHistory
premiseAccident_criminalHistory
premiseAccident_locationOfIncident
productLiability_product
productLiability_whereDidItHappen
productLiability_proofOfLiability
productLiability_productWasRecalled
workRelated_selfInsuredWorkComp
workRelated_workCompCaseIsOpenClosed
workRelated_workCompCaseSettledAmount
workRelated_workCompCaseSettlementIncludesFutureMedicals
workRelated_reasonNotFiledUnderWorkComp



caseAccounts {
  id
  name
}

balanceRequests {
  id
  name
}

casePreAccidents {
  id
  name
}

casePreInjuries {
  id
  name
}

casePreProblems {
  id
  name
}

insurances {
  id
  name
}

casePreProcedures {
  id
  name
}

caseProcedures {
  id
  name
}

priorMedsToDates {
  id
  name
}

appointments {
  id
  name
}
    }
  }
  `;

  // Send a GraphQL query to the endpoint
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const response = await sendGraphQLQuery(graphqlUrl, query);

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { items } = data;
  expect(items).toBeDefined();
});

test('UserLegalCase Query Test', async ({ page }) => {
  const legalCasesQuery = `
    query UserLegalCases {
      items: userLegalCases {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const legalCasesResponse = await sendGraphQLQuery(url.href,legalCasesQuery);

  // Verify the response data
  const { data: { items: legalCases }, errors: legalCasesErrors } = legalCasesResponse;
  expect(legalCasesErrors).toBeUndefined();
  expect(legalCases).toBeDefined();
  expect(legalCases.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const legalCaseId = legalCases[0].id;

  const query = `
  query UserLegalCase($legalCaseId: String!) {
    item: userLegalCase(legalCaseId: $legalCaseId) {
id
createdAt
updatedAt
name
accidentTypeId
patientId
medLevelId
firmId
attorneyId
caseStatusId
caseTypeId
patientTreatmentStatusId
medicalRecordNumber
pharmacyControlNumber
pchGroupNumber
dateOfLoss
caseStatusDate
caseStatusOther
paralegal
paralegalContact
caseNoteSummary
policyLimit
attorneyFee 
referringPhysician
noMoreTreatment
medpay
fileNumber
caseNumber
accidentState 
attorneyPaid
attorneySentDate
writeOff
noMRI
noPT
noFirstAppointment
hot
documentsUploaded
attorneyReview
escalatedReview
inActive
criteria1712
documentUploadedDate
patientDischargedGatheringRecordsDate
resubmitted
caseProgressStatusId
firmCaseManager
adverseInsuranceStatusId
createdBy
renegotiatePayOffDate
accidentType {
id
name
}
patient {
id
name
}
medLevel {
id
name
}
firm {
id
name
}
attorney {
id
name
}
caseStatus {
id
name
}
caseType {
id
name
}
patientTreatmentStatus {
id
name
} 
caseProgressStatus {
id
name
}
adverseInsuranceStatus {
id
name
}

underwriting_dateCreated
underwriting_lastUpdateDate
underwriting_timeSensitive
underwriting_needsMoreInfo
underwriting_billsAttached
underwriting_completedMedRecs
underwriting_balance
underwriting_signedLien
underwriting_procedureRequested
underwriting_medBills
underwriting_estimate
underwriting_plaintiff
underwriting_covered
underwriting_remarks
accidentInformation_accidentDescription
accidentInformation_dateOfLoss
accidentInformation_review
accidentInformation_initialEvaluation
accidentInformation_evaluation
accidentInformation_evaluationAfterHowLong
accidentInformation_evaluatedIn
accidentInformation_complaints
accidentInformation_previousHistory
accidentInformation_gapInCare
accidentInformation_gapInCareWhen
accidentInformation_preExistingProblems
accidentInformation_priorInjuries
accidentInformation_otherInjuriesSince
motorVehicleAccident_mvaDriver
motorVehicleAccident_mvaPassenger
motorVehicleAccident_mvaVehicle
motorVehicleAccident_mvaClaimants
motorVehicleAccident_mvaOperable
motorVehicleAccident_mvaTar
motorVehicleAccident_mvaDamage
motorVehicleAccident_mvaLess
motorVehicleAccident_mvaGreater
motorVehicleAccident_mvaAmount
premiseAccident_clientHasObtainedPlaintiffAdvance
premiseAccident_advanceAmount
premiseAccident_lossOfEarningsIsBeingFiled
premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart
premiseAccident_explain
premiseAccident_clientHasCriminalHistory
premiseAccident_criminalHistory
premiseAccident_locationOfIncident
productLiability_product
productLiability_whereDidItHappen
productLiability_proofOfLiability
productLiability_productWasRecalled
workRelated_selfInsuredWorkComp
workRelated_workCompCaseIsOpenClosed
workRelated_workCompCaseSettledAmount
workRelated_workCompCaseSettlementIncludesFutureMedicals
workRelated_reasonNotFiledUnderWorkComp




caseAccounts {
  id
  name
}

balanceRequests {
  id
  name
}

casePreAccidents {
  id
  name
}

casePreInjuries {
  id
  name
}

casePreProblems {
  id
  name
}

insurances {
  id
  name
}

casePreProcedures {
  id
  name
}

caseProcedures {
  id
  name
}

priorMedsToDates {
  id
  name
}

appointments {
  id
  name
}
    }
  }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { legalCaseId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateLegalCase Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateLegalCase($input: UserCreateLegalCaseInput!) {
      created: userCreateLegalCase(input: $input) {
        id
        name
      }
    }
  `;

  // const mockarooApiKey = process.env.MOCKAROO_APIKEY || '';

  // // Fetch a random user's first name from Mockaroo API
  // const mockarooUrl = `https://api.mockaroo.com/api/datasets/${encodeURIComponent(
  //   'Airport Name'
  // )}?key=${encodeURIComponent(mockarooApiKey)}`;

  // const mockarooFields = 'name';
  // const mockarooResponse = await fetch(`${mockarooUrl}`);
  // const mockarooData = await mockarooResponse;
  // const mockarooDataJson = await mockarooData.json();
  // const { name } = mockarooDataJson as Record<string, unknown>;
  const name = generateRandomName()

  const createInput = {
    // Provide the necessary input variables for creating an accident type
    // Modify the input variables according to your requirements
    name: name
  };

  // Send the mutation to create an accident type
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const createResponse = await sendGraphQLQuery(graphqlUrl, createMutation, { input: createInput });

  // Verify the create response data
  const { data: createData, errors: createErrors } = createResponse;
  console.log(createInput)
  expect(createErrors).toBeUndefined();
  expect(createData).toBeDefined();

  const { created } = createData;
  expect(created).toBeDefined();
  expect(created.name).toBe(createInput.name);

  const { id } = created;
  expect(id).toBeDefined();


  const updateMutation = `
    mutation UserUpdateLegalCase($legalCaseId: String!, $input: UserUpdateLegalCaseInput!) {
      updated: userUpdateLegalCase(legalCaseId: $legalCaseId, input: $input) {
        id
        name
      }
    }
  `;

  const updateInput = {
    // Provide the necessary input variables for updating an accident type
    // Modify the input variables according to your requirements
    name: generateRandomName()
  };

  // Send the mutation to update the accident type
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { legalCaseId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteLegalCase($legalCaseId: String!) {
      deleted: userDeleteLegalCase(legalCaseId: $legalCaseId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { legalCaseId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

