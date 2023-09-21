
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserPremiseAccidents Query Test', async ({ page }) => {
  const query = gql`
    query UserPremiseAccidents($input: UserListPremiseAccidentInput) {
      items: userPremiseAccidents(input: $input) {
clientHasObtainedPlaintiffAdvance
advanceAmount
lossOfEarningsIsBeingFiled
doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart
explain
clientHasCriminalHistory
criminalHistory
locationOfIncident






      }
      count: userCountPremiseAccidents(input: $input) {
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

test('UserCountPremiseAccidents Query Test', async ({ page }) => {
  const query = gql`
    query UserCountPremiseAccidents($input: UserListPremiseAccidentInput) {
      count: userCountPremiseAccidents(input: $input) {
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

test('UserSelectPremiseAccidents Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectPremiseAccidents($input: UserListPremiseAccidentInput) {
      items: userSelectPremiseAccidents(input: $input) {
clientHasObtainedPlaintiffAdvance
advanceAmount
lossOfEarningsIsBeingFiled
doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart
explain
clientHasCriminalHistory
criminalHistory
locationOfIncident






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

test('UserPremiseAccident Query Test', async ({ page }) => {
  const premiseAccidentsQuery = gql`
    query UserPremiseAccidents {
      items: userPremiseAccidents {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const premiseAccidentsResponse = await sendGraphQLQuery(url.href,premiseAccidentsQuery);

  // Verify the response data
  const { data: { items: premiseAccidents }, errors: premiseAccidentsErrors } = premiseAccidentsResponse;
  expect(premiseAccidentsErrors).toBeUndefined();
  expect(premiseAccidents).toBeDefined();
  expect(premiseAccidents.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const premiseAccidentId = premiseAccidents[0].id;

  const query = gql`
    query UserPremiseAccident($premiseAccidentId: String!) {
      item: userPremiseAccident(premiseAccidentId: $premiseAccidentId) {
clientHasObtainedPlaintiffAdvance
advanceAmount
lossOfEarningsIsBeingFiled
doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart
explain
clientHasCriminalHistory
criminalHistory
locationOfIncident






      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { premiseAccidentId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreatePremiseAccident Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreatePremiseAccident($input: UserCreatePremiseAccidentInput!) {
      created: userCreatePremiseAccident(input: $input) {
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
    mutation UserUpdatePremiseAccident($premiseAccidentId: String!, $input: UserUpdatePremiseAccidentInput!) {
      updated: userUpdatePremiseAccident(premiseAccidentId: $premiseAccidentId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { premiseAccidentId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeletePremiseAccident($premiseAccidentId: String!) {
      deleted: userDeletePremiseAccident(premiseAccidentId: $premiseAccidentId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { premiseAccidentId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

