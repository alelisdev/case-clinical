
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserManufacturers Query Test', async ({ page }) => {
  const query = `
    query UserManufacturers($input: UserListManufacturerInput) {
      items: userManufacturers(input: $input) {
id
createdAt
updatedAt
name
primaryPhoneNumber
primaryEmailAddress
primaryAddressLine1
primaryAddressLine2
primaryAddressCity
primaryAddressStateOrProvince
primaryAddressPostalCode
notes






implants {
    id
    name
  }
      }
      count: userCountManufacturers(input: $input) {
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

test('UserCountManufacturers Query Test', async ({ page }) => {
  const query = `
    query UserCountManufacturers($input: UserListManufacturerInput) {
      count: userCountManufacturers(input: $input) {
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

test('UserSelectManufacturers Query Test', async ({ page }) => {
  const query = `
    query UserSelectManufacturers($input: UserListManufacturerInput) {
      items: userSelectManufacturers(input: $input) {
id
createdAt
updatedAt
name
primaryPhoneNumber
primaryEmailAddress
primaryAddressLine1
primaryAddressLine2
primaryAddressCity
primaryAddressStateOrProvince
primaryAddressPostalCode
notes






implants {
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

test('UserManufacturer Query Test', async ({ page }) => {
  const manufacturersQuery = `
    query UserManufacturers {
      items: userManufacturers {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const manufacturersResponse = await sendGraphQLQuery(url.href,manufacturersQuery);

  // Verify the response data
  const { data: { items: manufacturers }, errors: manufacturersErrors } = manufacturersResponse;
  expect(manufacturersErrors).toBeUndefined();
  expect(manufacturers).toBeDefined();
  expect(manufacturers.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const manufacturerId = manufacturers[0].id;

  const query = `
    query UserManufacturer($manufacturerId: String!) {
      item: userManufacturer(manufacturerId: $manufacturerId) {
id
createdAt
updatedAt
name
primaryPhoneNumber
primaryEmailAddress
primaryAddressLine1
primaryAddressLine2
primaryAddressCity
primaryAddressStateOrProvince
primaryAddressPostalCode
notes






implants {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { manufacturerId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateManufacturer Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateManufacturer($input: UserCreateManufacturerInput!) {
      created: userCreateManufacturer(input: $input) {
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
    mutation UserUpdateManufacturer($manufacturerId: String!, $input: UserUpdateManufacturerInput!) {
      updated: userUpdateManufacturer(manufacturerId: $manufacturerId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { manufacturerId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteManufacturer($manufacturerId: String!) {
      deleted: userDeleteManufacturer(manufacturerId: $manufacturerId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { manufacturerId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

