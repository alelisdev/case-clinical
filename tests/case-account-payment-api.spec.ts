
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserCaseAccountPayments Query Test', async ({ page }) => {
  const query = `
    query UserCaseAccountPayments($input: UserListCaseAccountPaymentInput) {
      items: userCaseAccountPayments(input: $input) {
id
createdAt
updatedAt
name
amountApplied
paymentId
caseAccountId
payment {
  id
  name
}
caseAccount {
  id
  name
}





      }
      count: userCountCaseAccountPayments(input: $input) {
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

test('UserCountCaseAccountPayments Query Test', async ({ page }) => {
  const query = `
    query UserCountCaseAccountPayments($input: UserListCaseAccountPaymentInput) {
      count: userCountCaseAccountPayments(input: $input) {
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

test('UserSelectCaseAccountPayments Query Test', async ({ page }) => {
  const query = `
    query UserSelectCaseAccountPayments($input: UserListCaseAccountPaymentInput) {
      items: userSelectCaseAccountPayments(input: $input) {
id
createdAt
updatedAt
name
amountApplied
paymentId
caseAccountId
payment {
  id
  name
}
caseAccount {
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

test('UserCaseAccountPayment Query Test', async ({ page }) => {
  const caseAccountPaymentsQuery = `
    query UserCaseAccountPayments {
      items: userCaseAccountPayments {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const caseAccountPaymentsResponse = await sendGraphQLQuery(url.href,caseAccountPaymentsQuery);

  // Verify the response data
  const { data: { items: caseAccountPayments }, errors: caseAccountPaymentsErrors } = caseAccountPaymentsResponse;
  expect(caseAccountPaymentsErrors).toBeUndefined();
  expect(caseAccountPayments).toBeDefined();
  expect(caseAccountPayments.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const caseAccountPaymentId = caseAccountPayments[0].id;

  const query = `
    query UserCaseAccountPayment($caseAccountPaymentId: String!) {
      item: userCaseAccountPayment(caseAccountPaymentId: $caseAccountPaymentId) {
id
createdAt
updatedAt
name
amountApplied
paymentId
caseAccountId
payment {
  id
  name
}
caseAccount {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { caseAccountPaymentId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateCaseAccountPayment Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateCaseAccountPayment($input: UserCreateCaseAccountPaymentInput!) {
      created: userCreateCaseAccountPayment(input: $input) {
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
    mutation UserUpdateCaseAccountPayment($caseAccountPaymentId: String!, $input: UserUpdateCaseAccountPaymentInput!) {
      updated: userUpdateCaseAccountPayment(caseAccountPaymentId: $caseAccountPaymentId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { caseAccountPaymentId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteCaseAccountPayment($caseAccountPaymentId: String!) {
      deleted: userDeleteCaseAccountPayment(caseAccountPaymentId: $caseAccountPaymentId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { caseAccountPaymentId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

