
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserPriorAuthorizationEquipments Query Test', async ({ page }) => {
  const query = `
    query UserPriorAuthorizationEquipments($input: UserListPriorAuthorizationEquipmentInput) {
      items: userPriorAuthorizationEquipments(input: $input) {
id
createdAt
updatedAt
name
estimatedCost
equipmentId
priorAuthorizationRequestId
equipment {
  id
  name
}
priorAuthorizationRequest {
  id
  name
}





      }
      count: userCountPriorAuthorizationEquipments(input: $input) {
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

test('UserCountPriorAuthorizationEquipments Query Test', async ({ page }) => {
  const query = `
    query UserCountPriorAuthorizationEquipments($input: UserListPriorAuthorizationEquipmentInput) {
      count: userCountPriorAuthorizationEquipments(input: $input) {
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

test('UserSelectPriorAuthorizationEquipments Query Test', async ({ page }) => {
  const query = `
    query UserSelectPriorAuthorizationEquipments($input: UserListPriorAuthorizationEquipmentInput) {
      items: userSelectPriorAuthorizationEquipments(input: $input) {
id
createdAt
updatedAt
name
estimatedCost
equipmentId
priorAuthorizationRequestId
equipment {
  id
  name
}
priorAuthorizationRequest {
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

test('UserPriorAuthorizationEquipment Query Test', async ({ page }) => {
  const priorAuthorizationEquipmentsQuery = `
    query UserPriorAuthorizationEquipments {
      items: userPriorAuthorizationEquipments {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const priorAuthorizationEquipmentsResponse = await sendGraphQLQuery(url.href,priorAuthorizationEquipmentsQuery);

  // Verify the response data
  const { data: { items: priorAuthorizationEquipments }, errors: priorAuthorizationEquipmentsErrors } = priorAuthorizationEquipmentsResponse;
  expect(priorAuthorizationEquipmentsErrors).toBeUndefined();
  expect(priorAuthorizationEquipments).toBeDefined();
  expect(priorAuthorizationEquipments.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const priorAuthorizationEquipmentId = priorAuthorizationEquipments[0].id;

  const query = `
    query UserPriorAuthorizationEquipment($priorAuthorizationEquipmentId: String!) {
      item: userPriorAuthorizationEquipment(priorAuthorizationEquipmentId: $priorAuthorizationEquipmentId) {
id
createdAt
updatedAt
name
estimatedCost
equipmentId
priorAuthorizationRequestId
equipment {
  id
  name
}
priorAuthorizationRequest {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { priorAuthorizationEquipmentId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreatePriorAuthorizationEquipment Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreatePriorAuthorizationEquipment($input: UserCreatePriorAuthorizationEquipmentInput!) {
      created: userCreatePriorAuthorizationEquipment(input: $input) {
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
    mutation UserUpdatePriorAuthorizationEquipment($priorAuthorizationEquipmentId: String!, $input: UserUpdatePriorAuthorizationEquipmentInput!) {
      updated: userUpdatePriorAuthorizationEquipment(priorAuthorizationEquipmentId: $priorAuthorizationEquipmentId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { priorAuthorizationEquipmentId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeletePriorAuthorizationEquipment($priorAuthorizationEquipmentId: String!) {
      deleted: userDeletePriorAuthorizationEquipment(priorAuthorizationEquipmentId: $priorAuthorizationEquipmentId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { priorAuthorizationEquipmentId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

