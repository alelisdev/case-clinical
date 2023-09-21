
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserTramaticBrainInjuryFunctionalNeurologicalSymptoms Query Test', async ({ page }) => {
  const query = gql`
    query UserTramaticBrainInjuryFunctionalNeurologicalSymptoms($input: UserListTramaticBrainInjuryFunctionalNeurologicalSymptomInput) {
      items: userTramaticBrainInjuryFunctionalNeurologicalSymptoms(input: $input) {
id
createdAt
updatedAt
name
functionalNeurologicalSymptomId
tramaticBrainInjuryId






      }
      count: userCountTramaticBrainInjuryFunctionalNeurologicalSymptoms(input: $input) {
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

test('UserCountTramaticBrainInjuryFunctionalNeurologicalSymptoms Query Test', async ({ page }) => {
  const query = gql`
    query UserCountTramaticBrainInjuryFunctionalNeurologicalSymptoms($input: UserListTramaticBrainInjuryFunctionalNeurologicalSymptomInput) {
      count: userCountTramaticBrainInjuryFunctionalNeurologicalSymptoms(input: $input) {
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

test('UserSelectTramaticBrainInjuryFunctionalNeurologicalSymptoms Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectTramaticBrainInjuryFunctionalNeurologicalSymptoms($input: UserListTramaticBrainInjuryFunctionalNeurologicalSymptomInput) {
      items: userSelectTramaticBrainInjuryFunctionalNeurologicalSymptoms(input: $input) {
id
createdAt
updatedAt
name
functionalNeurologicalSymptomId
tramaticBrainInjuryId






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

test('UserTramaticBrainInjuryFunctionalNeurologicalSymptom Query Test', async ({ page }) => {
  const tramaticBrainInjuryFunctionalNeurologicalSymptomsQuery = gql`
    query UserTramaticBrainInjuryFunctionalNeurologicalSymptoms {
      items: userTramaticBrainInjuryFunctionalNeurologicalSymptoms {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const tramaticBrainInjuryFunctionalNeurologicalSymptomsResponse = await sendGraphQLQuery(url.href,tramaticBrainInjuryFunctionalNeurologicalSymptomsQuery);

  // Verify the response data
  const { data: { items: tramaticBrainInjuryFunctionalNeurologicalSymptoms }, errors: tramaticBrainInjuryFunctionalNeurologicalSymptomsErrors } = tramaticBrainInjuryFunctionalNeurologicalSymptomsResponse;
  expect(tramaticBrainInjuryFunctionalNeurologicalSymptomsErrors).toBeUndefined();
  expect(tramaticBrainInjuryFunctionalNeurologicalSymptoms).toBeDefined();
  expect(tramaticBrainInjuryFunctionalNeurologicalSymptoms.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const tramaticBrainInjuryFunctionalNeurologicalSymptomId = tramaticBrainInjuryFunctionalNeurologicalSymptoms[0].id;

  const query = gql`
    query UserTramaticBrainInjuryFunctionalNeurologicalSymptom($tramaticBrainInjuryFunctionalNeurologicalSymptomId: String!) {
      item: userTramaticBrainInjuryFunctionalNeurologicalSymptom(tramaticBrainInjuryFunctionalNeurologicalSymptomId: $tramaticBrainInjuryFunctionalNeurologicalSymptomId) {
id
createdAt
updatedAt
name
functionalNeurologicalSymptomId
tramaticBrainInjuryId






      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { tramaticBrainInjuryFunctionalNeurologicalSymptomId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateTramaticBrainInjuryFunctionalNeurologicalSymptom Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateTramaticBrainInjuryFunctionalNeurologicalSymptom($input: UserCreateTramaticBrainInjuryFunctionalNeurologicalSymptomInput!) {
      created: userCreateTramaticBrainInjuryFunctionalNeurologicalSymptom(input: $input) {
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
    mutation UserUpdateTramaticBrainInjuryFunctionalNeurologicalSymptom($tramaticBrainInjuryFunctionalNeurologicalSymptomId: String!, $input: UserUpdateTramaticBrainInjuryFunctionalNeurologicalSymptomInput!) {
      updated: userUpdateTramaticBrainInjuryFunctionalNeurologicalSymptom(tramaticBrainInjuryFunctionalNeurologicalSymptomId: $tramaticBrainInjuryFunctionalNeurologicalSymptomId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { tramaticBrainInjuryFunctionalNeurologicalSymptomId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteTramaticBrainInjuryFunctionalNeurologicalSymptom($tramaticBrainInjuryFunctionalNeurologicalSymptomId: String!) {
      deleted: userDeleteTramaticBrainInjuryFunctionalNeurologicalSymptom(tramaticBrainInjuryFunctionalNeurologicalSymptomId: $tramaticBrainInjuryFunctionalNeurologicalSymptomId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { tramaticBrainInjuryFunctionalNeurologicalSymptomId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

