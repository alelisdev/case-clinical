
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserUnderwritings Query Test', async ({ page }) => {
  const query = gql`
    query UserUnderwritings($input: UserListUnderwritingInput) {
      items: userUnderwritings(input: $input) {
dateCreated
lastUpdateDate
timeSensitive
needsMoreInfo
billsAttached
completedMedRecs
balance
signedLien
procedureRequested
medBills
estimate
plaintiff
covered
remarks






      }
      count: userCountUnderwritings(input: $input) {
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

test('UserCountUnderwritings Query Test', async ({ page }) => {
  const query = gql`
    query UserCountUnderwritings($input: UserListUnderwritingInput) {
      count: userCountUnderwritings(input: $input) {
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

test('UserSelectUnderwritings Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectUnderwritings($input: UserListUnderwritingInput) {
      items: userSelectUnderwritings(input: $input) {
dateCreated
lastUpdateDate
timeSensitive
needsMoreInfo
billsAttached
completedMedRecs
balance
signedLien
procedureRequested
medBills
estimate
plaintiff
covered
remarks






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

test('UserUnderwriting Query Test', async ({ page }) => {
  const underwritingsQuery = gql`
    query UserUnderwritings {
      items: userUnderwritings {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const underwritingsResponse = await sendGraphQLQuery(url.href,underwritingsQuery);

  // Verify the response data
  const { data: { items: underwritings }, errors: underwritingsErrors } = underwritingsResponse;
  expect(underwritingsErrors).toBeUndefined();
  expect(underwritings).toBeDefined();
  expect(underwritings.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const underwritingId = underwritings[0].id;

  const query = gql`
    query UserUnderwriting($underwritingId: String!) {
      item: userUnderwriting(underwritingId: $underwritingId) {
dateCreated
lastUpdateDate
timeSensitive
needsMoreInfo
billsAttached
completedMedRecs
balance
signedLien
procedureRequested
medBills
estimate
plaintiff
covered
remarks






      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { underwritingId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateUnderwriting Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateUnderwriting($input: UserCreateUnderwritingInput!) {
      created: userCreateUnderwriting(input: $input) {
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
    mutation UserUpdateUnderwriting($underwritingId: String!, $input: UserUpdateUnderwritingInput!) {
      updated: userUpdateUnderwriting(underwritingId: $underwritingId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { underwritingId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteUnderwriting($underwritingId: String!) {
      deleted: userDeleteUnderwriting(underwritingId: $underwritingId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { underwritingId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

