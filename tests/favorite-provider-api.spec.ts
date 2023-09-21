
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserFavoriteProviders Query Test', async ({ page }) => {
  const query = `
    query UserFavoriteProviders($input: UserListFavoriteProviderInput) {
      items: userFavoriteProviders(input: $input) {
id
createdAt
updatedAt
name
clinicalProviderId
userId
specialtyId
clinicalProvider {
  id
  name
}





      }
      count: userCountFavoriteProviders(input: $input) {
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

test('UserCountFavoriteProviders Query Test', async ({ page }) => {
  const query = `
    query UserCountFavoriteProviders($input: UserListFavoriteProviderInput) {
      count: userCountFavoriteProviders(input: $input) {
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

test('UserSelectFavoriteProviders Query Test', async ({ page }) => {
  const query = `
    query UserSelectFavoriteProviders($input: UserListFavoriteProviderInput) {
      items: userSelectFavoriteProviders(input: $input) {
id
createdAt
updatedAt
name
clinicalProviderId
userId
specialtyId
clinicalProvider {
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

test('UserFavoriteProvider Query Test', async ({ page }) => {
  const favoriteProvidersQuery = `
    query UserFavoriteProviders {
      items: userFavoriteProviders {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const favoriteProvidersResponse = await sendGraphQLQuery(url.href,favoriteProvidersQuery);

  // Verify the response data
  const { data: { items: favoriteProviders }, errors: favoriteProvidersErrors } = favoriteProvidersResponse;
  expect(favoriteProvidersErrors).toBeUndefined();
  expect(favoriteProviders).toBeDefined();
  expect(favoriteProviders.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const favoriteProviderId = favoriteProviders[0].id;

  const query = `
    query UserFavoriteProvider($favoriteProviderId: String!) {
      item: userFavoriteProvider(favoriteProviderId: $favoriteProviderId) {
id
createdAt
updatedAt
name
clinicalProviderId
userId
specialtyId
clinicalProvider {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { favoriteProviderId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateFavoriteProvider Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateFavoriteProvider($input: UserCreateFavoriteProviderInput!) {
      created: userCreateFavoriteProvider(input: $input) {
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
    mutation UserUpdateFavoriteProvider($favoriteProviderId: String!, $input: UserUpdateFavoriteProviderInput!) {
      updated: userUpdateFavoriteProvider(favoriteProviderId: $favoriteProviderId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { favoriteProviderId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteFavoriteProvider($favoriteProviderId: String!) {
      deleted: userDeleteFavoriteProvider(favoriteProviderId: $favoriteProviderId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { favoriteProviderId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

