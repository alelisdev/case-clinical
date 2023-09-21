
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserClaimProcedures Query Test', async ({ page }) => {
  const query = gql`
    query UserClaimProcedures($input: UserListClaimProcedureInput) {
      items: userClaimProcedures(input: $input) {
id
createdAt
updatedAt
name
claimProcedureCodeId
procedureCodeId
claimId
fromDateOfService
toDateOfService
placeOfServiceId
nationalDrugCode
drugUnit
drugQuantity
quantity
billedAmount
approvedAmount
adjustmentAmount
netPaymentAmount
paymentMethod
internalMemo
explainationOfBenefitsComment
claimStatusId
reason
procedureCode
diagnosisPointer
modifier1
modifier2
modifier3
modifier4
appointmentId
placeOfService {
  id
  name
}
claimStatus {
  id
  name
}
claim {
  id
  name
}
appointment {
  id
  name
}





caseAccounts {
    id
    name
  }
      }
      count: userCountClaimProcedures(input: $input) {
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

test('UserCountClaimProcedures Query Test', async ({ page }) => {
  const query = gql`
    query UserCountClaimProcedures($input: UserListClaimProcedureInput) {
      count: userCountClaimProcedures(input: $input) {
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

test('UserSelectClaimProcedures Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectClaimProcedures($input: UserListClaimProcedureInput) {
      items: userSelectClaimProcedures(input: $input) {
id
createdAt
updatedAt
name
claimProcedureCodeId
procedureCodeId
claimId
fromDateOfService
toDateOfService
placeOfServiceId
nationalDrugCode
drugUnit
drugQuantity
quantity
billedAmount
approvedAmount
adjustmentAmount
netPaymentAmount
paymentMethod
internalMemo
explainationOfBenefitsComment
claimStatusId
reason
procedureCode
diagnosisPointer
modifier1
modifier2
modifier3
modifier4
appointmentId
placeOfService {
  id
  name
}
claimStatus {
  id
  name
}
claim {
  id
  name
}
appointment {
  id
  name
}





caseAccounts {
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

test('UserClaimProcedure Query Test', async ({ page }) => {
  const claimProceduresQuery = gql`
    query UserClaimProcedures {
      items: userClaimProcedures {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const claimProceduresResponse = await sendGraphQLQuery(url.href,claimProceduresQuery);

  // Verify the response data
  const { data: { items: claimProcedures }, errors: claimProceduresErrors } = claimProceduresResponse;
  expect(claimProceduresErrors).toBeUndefined();
  expect(claimProcedures).toBeDefined();
  expect(claimProcedures.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const claimProcedureId = claimProcedures[0].id;

  const query = gql`
    query UserClaimProcedure($claimProcedureId: String!) {
      item: userClaimProcedure(claimProcedureId: $claimProcedureId) {
id
createdAt
updatedAt
name
claimProcedureCodeId
procedureCodeId
claimId
fromDateOfService
toDateOfService
placeOfServiceId
nationalDrugCode
drugUnit
drugQuantity
quantity
billedAmount
approvedAmount
adjustmentAmount
netPaymentAmount
paymentMethod
internalMemo
explainationOfBenefitsComment
claimStatusId
reason
procedureCode
diagnosisPointer
modifier1
modifier2
modifier3
modifier4
appointmentId
placeOfService {
  id
  name
}
claimStatus {
  id
  name
}
claim {
  id
  name
}
appointment {
  id
  name
}





caseAccounts {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { claimProcedureId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateClaimProcedure Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateClaimProcedure($input: UserCreateClaimProcedureInput!) {
      created: userCreateClaimProcedure(input: $input) {
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


  const updateMutation = gql`
    mutation UserUpdateClaimProcedure($claimProcedureId: String!, $input: UserUpdateClaimProcedureInput!) {
      updated: userUpdateClaimProcedure(claimProcedureId: $claimProcedureId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { claimProcedureId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteClaimProcedure($claimProcedureId: String!) {
      deleted: userDeleteClaimProcedure(claimProcedureId: $claimProcedureId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { claimProcedureId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

