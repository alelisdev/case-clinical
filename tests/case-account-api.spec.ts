
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserCaseAccounts Query Test', async ({ page }) => {
  const query = `
    query UserCaseAccounts($input: UserListCaseAccountInput) {
      items: userCaseAccounts(input: $input) {
id
createdAt
updatedAt
name
legalCaseId
locationId
vendorId
accountStatusId
procedureTypeId
agreementTypeId
accountAgentId
claimProcedureId
invoiceDetailId
contractId
portfolioId
thirdPartyFunderName
originalDueDate
accountTerm
serviceDate
quantity
originalDebt
cost
balance
lastBalance
reduction
treatmentState
accountNumber
servicesPerformed
cptCodes
treatingPhysician
referringPhysician
collectionsDate
deemedWriteOffDate
expensedBadDebtDate
paidDate
ghostAccount
ghostedDate
ghostedBy
unGhostedDate
unGhostedBy
additionalPayment
missingBill
missingLien
missingMedicalRecords
assignedTo
resubmitted
treatmentCity
origination
thresholdProviderRate
thresholdLocationRate
teamLeaderRateSource
checkNumber
accountDateReceived
dateApplied
amountApplied
description
note
medicareRate
providerPercentOfMedicare
contractedAmount
markupPercent
reimbursedTotal
initialRevenue
factor
retailBill
estMargin
roi
attorneyPaid
percentOfRetail
reimbursedFromPCR
ingredientCost
dispensingCost
administrativeCost
coPay
totalCost
averageWholesalePrice
weightedAverageCost
averageSalePrice
invoiceCost
usualAndCustomary
nationalDrugCode
procedureVendorId
legalCase {
  id
  name
}
location {
  id
  name
}
vendor {
  id
  name
}
accountStatus {
  id
  name
}
procedureType {
  id
  name
}
agreementType {
  id
  name
}
claimProcedure {
  id
  name
}
invoiceDetail {
  id
  name
}
contract {
  id
  name
}
portfolio {
  id
  name
}
procedureVendor {
  id
  name
}





writeOffs {
    id
    name
  }

caseAccountPayments {
    id
    name
  }

journalEntries {
    id
    name
  }
      }
      count: userCountCaseAccounts(input: $input) {
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

test('UserCountCaseAccounts Query Test', async ({ page }) => {
  const query = `
    query UserCountCaseAccounts($input: UserListCaseAccountInput) {
      count: userCountCaseAccounts(input: $input) {
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

test('UserSelectCaseAccounts Query Test', async ({ page }) => {
  const query = `
    query UserSelectCaseAccounts($input: UserListCaseAccountInput) {
      items: userSelectCaseAccounts(input: $input) {
id
createdAt
updatedAt
name
legalCaseId
locationId
vendorId
accountStatusId
procedureTypeId
agreementTypeId
accountAgentId
claimProcedureId
invoiceDetailId
contractId
portfolioId
thirdPartyFunderName
originalDueDate
accountTerm
serviceDate
quantity
originalDebt
cost
balance
lastBalance
reduction
treatmentState
accountNumber
servicesPerformed
cptCodes
treatingPhysician
referringPhysician
collectionsDate
deemedWriteOffDate
expensedBadDebtDate
paidDate
ghostAccount
ghostedDate
ghostedBy
unGhostedDate
unGhostedBy
additionalPayment
missingBill
missingLien
missingMedicalRecords
assignedTo
resubmitted
treatmentCity
origination
thresholdProviderRate
thresholdLocationRate
teamLeaderRateSource
checkNumber
accountDateReceived
dateApplied
amountApplied
description
note
medicareRate
providerPercentOfMedicare
contractedAmount
markupPercent
reimbursedTotal
initialRevenue
factor
retailBill
estMargin
roi
attorneyPaid
percentOfRetail
reimbursedFromPCR
ingredientCost
dispensingCost
administrativeCost
coPay
totalCost
averageWholesalePrice
weightedAverageCost
averageSalePrice
invoiceCost
usualAndCustomary
nationalDrugCode
procedureVendorId
legalCase {
  id
  name
}
location {
  id
  name
}
vendor {
  id
  name
}
accountStatus {
  id
  name
}
procedureType {
  id
  name
}
agreementType {
  id
  name
}
claimProcedure {
  id
  name
}
invoiceDetail {
  id
  name
}
contract {
  id
  name
}
portfolio {
  id
  name
}
procedureVendor {
  id
  name
}





writeOffs {
    id
    name
  }

caseAccountPayments {
    id
    name
  }

journalEntries {
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

test('UserCaseAccount Query Test', async ({ page }) => {
  const caseAccountsQuery = `
    query UserCaseAccounts {
      items: userCaseAccounts {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const caseAccountsResponse = await sendGraphQLQuery(url.href,caseAccountsQuery);

  // Verify the response data
  const { data: { items: caseAccounts }, errors: caseAccountsErrors } = caseAccountsResponse;
  expect(caseAccountsErrors).toBeUndefined();
  expect(caseAccounts).toBeDefined();
  expect(caseAccounts.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const caseAccountId = caseAccounts[0].id;

  const query = `
    query UserCaseAccount($caseAccountId: String!) {
      item: userCaseAccount(caseAccountId: $caseAccountId) {
id
createdAt
updatedAt
name
legalCaseId
locationId
vendorId
accountStatusId
procedureTypeId
agreementTypeId
accountAgentId
claimProcedureId
invoiceDetailId
contractId
portfolioId
thirdPartyFunderName
originalDueDate
accountTerm
serviceDate
quantity
originalDebt
cost
balance
lastBalance
reduction
treatmentState
accountNumber
servicesPerformed
cptCodes
treatingPhysician
referringPhysician
collectionsDate
deemedWriteOffDate
expensedBadDebtDate
paidDate
ghostAccount
ghostedDate
ghostedBy
unGhostedDate
unGhostedBy
additionalPayment
missingBill
missingLien
missingMedicalRecords
assignedTo
resubmitted
treatmentCity
origination
thresholdProviderRate
thresholdLocationRate
teamLeaderRateSource
checkNumber
accountDateReceived
dateApplied
amountApplied
description
note
medicareRate
providerPercentOfMedicare
contractedAmount
markupPercent
reimbursedTotal
initialRevenue
factor
retailBill
estMargin
roi
attorneyPaid
percentOfRetail
reimbursedFromPCR
ingredientCost
dispensingCost
administrativeCost
coPay
totalCost
averageWholesalePrice
weightedAverageCost
averageSalePrice
invoiceCost
usualAndCustomary
nationalDrugCode
procedureVendorId
legalCase {
  id
  name
}
location {
  id
  name
}
vendor {
  id
  name
}
accountStatus {
  id
  name
}
procedureType {
  id
  name
}
agreementType {
  id
  name
}
claimProcedure {
  id
  name
}
invoiceDetail {
  id
  name
}
contract {
  id
  name
}
portfolio {
  id
  name
}
procedureVendor {
  id
  name
}





writeOffs {
    id
    name
  }

caseAccountPayments {
    id
    name
  }

journalEntries {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { caseAccountId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateCaseAccount Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateCaseAccount($input: UserCreateCaseAccountInput!) {
      created: userCreateCaseAccount(input: $input) {
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
    mutation UserUpdateCaseAccount($caseAccountId: String!, $input: UserUpdateCaseAccountInput!) {
      updated: userUpdateCaseAccount(caseAccountId: $caseAccountId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { caseAccountId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteCaseAccount($caseAccountId: String!) {
      deleted: userDeleteCaseAccount(caseAccountId: $caseAccountId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { caseAccountId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

