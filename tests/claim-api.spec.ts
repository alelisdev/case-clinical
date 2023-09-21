
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserClaims Query Test', async ({ page }) => {
  const query = `
    query UserClaims($input: UserListClaimInput) {
      items: userClaims(input: $input) {
id
createdAt
updatedAt
name
originalRecordDate
receivedDate
dueDate
patientName
patientPhoneNumber
patientDob
patientAddressLine1
patientAddressCity
patientAddressState
patientAddressPostalCode
carrierName
carrierLine1
carrierLine2
carrierCity
carrierState
carrierPostalCode
insuredName
insuredLine1
insuredCity
insuredState
insuredPostalCode
patientSignature
diagnosisCode1
diagnosisCode2
diagnosisCode3
diagnosisCode4
diagnosisCode5
diagnosisCode6
diagnosisCode7
diagnosisCode8
federalTaxId
totalCharges
amountPaid
physicianSignature
physicianSignedOn
serviceFacility
serviceFacilityLine1
serviceFacilityCity
serviceFacilityState
serviceFacilityPostalCode
serviceFacilityNpi
billingFacility
billingLine1
billingCity
billingState
billingPostalCode
billingNpi
billingPhoneNumber
billingOther
sessionNotes
referringProvider
referringProviderNpi
additionalClaimInfo
accountNumber
referenceNumber
facility
priorAuthorizationNumber
priorAuthorizationRequestId
providerName
providerNumber
vendor
vendorLine1
vendorCSZ
vendorTaxId
totalApprovedAmount
totalBilledAmount
totalNetPayAmount
notes
claimId
explanationOfPaymentId
patientId
priorAuthorizationRequest {
  id
  name
}
claim {
  id
  name
}
explanationOfPayment {
  id
  name
}
patient {
  id
  name
}





procedures {
    id
    name
  }
      }
      count: userCountClaims(input: $input) {
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

test('UserCountClaims Query Test', async ({ page }) => {
  const query = `
    query UserCountClaims($input: UserListClaimInput) {
      count: userCountClaims(input: $input) {
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

test('UserSelectClaims Query Test', async ({ page }) => {
  const query = `
    query UserSelectClaims($input: UserListClaimInput) {
      items: userSelectClaims(input: $input) {
id
createdAt
updatedAt
name
originalRecordDate
receivedDate
dueDate
patientName
patientPhoneNumber
patientDob
patientAddressLine1
patientAddressCity
patientAddressState
patientAddressPostalCode
carrierName
carrierLine1
carrierLine2
carrierCity
carrierState
carrierPostalCode
insuredName
insuredLine1
insuredCity
insuredState
insuredPostalCode
patientSignature
diagnosisCode1
diagnosisCode2
diagnosisCode3
diagnosisCode4
diagnosisCode5
diagnosisCode6
diagnosisCode7
diagnosisCode8
federalTaxId
totalCharges
amountPaid
physicianSignature
physicianSignedOn
serviceFacility
serviceFacilityLine1
serviceFacilityCity
serviceFacilityState
serviceFacilityPostalCode
serviceFacilityNpi
billingFacility
billingLine1
billingCity
billingState
billingPostalCode
billingNpi
billingPhoneNumber
billingOther
sessionNotes
referringProvider
referringProviderNpi
additionalClaimInfo
accountNumber
referenceNumber
facility
priorAuthorizationNumber
priorAuthorizationRequestId
providerName
providerNumber
vendor
vendorLine1
vendorCSZ
vendorTaxId
totalApprovedAmount
totalBilledAmount
totalNetPayAmount
notes
claimId
explanationOfPaymentId
patientId
priorAuthorizationRequest {
  id
  name
}
claim {
  id
  name
}
explanationOfPayment {
  id
  name
}
patient {
  id
  name
}





procedures {
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

test('UserClaim Query Test', async ({ page }) => {
  const claimsQuery = `
    query UserClaims {
      items: userClaims {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const claimsResponse = await sendGraphQLQuery(url.href,claimsQuery);

  // Verify the response data
  const { data: { items: claims }, errors: claimsErrors } = claimsResponse;
  expect(claimsErrors).toBeUndefined();
  expect(claims).toBeDefined();
  expect(claims.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const claimId = claims[0].id;

  const query = `
    query UserClaim($claimId: String!) {
      item: userClaim(claimId: $claimId) {
id
createdAt
updatedAt
name
originalRecordDate
receivedDate
dueDate
patientName
patientPhoneNumber
patientDob
patientAddressLine1
patientAddressCity
patientAddressState
patientAddressPostalCode
carrierName
carrierLine1
carrierLine2
carrierCity
carrierState
carrierPostalCode
insuredName
insuredLine1
insuredCity
insuredState
insuredPostalCode
patientSignature
diagnosisCode1
diagnosisCode2
diagnosisCode3
diagnosisCode4
diagnosisCode5
diagnosisCode6
diagnosisCode7
diagnosisCode8
federalTaxId
totalCharges
amountPaid
physicianSignature
physicianSignedOn
serviceFacility
serviceFacilityLine1
serviceFacilityCity
serviceFacilityState
serviceFacilityPostalCode
serviceFacilityNpi
billingFacility
billingLine1
billingCity
billingState
billingPostalCode
billingNpi
billingPhoneNumber
billingOther
sessionNotes
referringProvider
referringProviderNpi
additionalClaimInfo
accountNumber
referenceNumber
facility
priorAuthorizationNumber
priorAuthorizationRequestId
providerName
providerNumber
vendor
vendorLine1
vendorCSZ
vendorTaxId
totalApprovedAmount
totalBilledAmount
totalNetPayAmount
notes
claimId
explanationOfPaymentId
patientId
priorAuthorizationRequest {
  id
  name
}
claim {
  id
  name
}
explanationOfPayment {
  id
  name
}
patient {
  id
  name
}





procedures {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { claimId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateClaim Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateClaim($input: UserCreateClaimInput!) {
      created: userCreateClaim(input: $input) {
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
    mutation UserUpdateClaim($claimId: String!, $input: UserUpdateClaimInput!) {
      updated: userUpdateClaim(claimId: $claimId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { claimId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteClaim($claimId: String!) {
      deleted: userDeleteClaim(claimId: $claimId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { claimId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

