
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserClinicalProviderSpecialties Query Test', async ({ page }) => {
  const query = `
    query UserClinicalProviderSpecialties($input: UserListClinicalProviderSpecialtyInput) {
      items: userClinicalProviderSpecialties(input: $input) {
id
createdAt
updatedAt
name
clinicalProviderId
specialtyId
clinicalProvider {
  id
  name
}
specialty {
  id
  name
}





      }
      count: userCountClinicalProviderSpecialties(input: $input) {
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

test('UserCountClinicalProviderSpecialties Query Test', async ({ page }) => {
  const query = `
    query UserCountClinicalProviderSpecialties($input: UserListClinicalProviderSpecialtyInput) {
      count: userCountClinicalProviderSpecialties(input: $input) {
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

test('UserSelectClinicalProviderSpecialties Query Test', async ({ page }) => {
  const query = `
    query UserSelectClinicalProviderSpecialties($input: UserListClinicalProviderSpecialtyInput) {
      items: userSelectClinicalProviderSpecialties(input: $input) {
id
createdAt
updatedAt
name
clinicalProviderId
specialtyId
clinicalProvider {
  id
  name
}
specialty {
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

test('UserClinicalProviderSpecialty Query Test', async ({ page }) => {
  const clinicalProviderSpecialtiesQuery = `
    query UserClinicalProviderSpecialties {
      items: userClinicalProviderSpecialties {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const clinicalProviderSpecialtiesResponse = await sendGraphQLQuery(url.href,clinicalProviderSpecialtiesQuery);

  // Verify the response data
  const { data: { items: clinicalProviderSpecialties }, errors: clinicalProviderSpecialtiesErrors } = clinicalProviderSpecialtiesResponse;
  expect(clinicalProviderSpecialtiesErrors).toBeUndefined();
  expect(clinicalProviderSpecialties).toBeDefined();
  expect(clinicalProviderSpecialties.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const clinicalProviderSpecialtyId = clinicalProviderSpecialties[0].id;

  const query = `
    query UserClinicalProviderSpecialty($clinicalProviderSpecialtyId: String!) {
      item: userClinicalProviderSpecialty(clinicalProviderSpecialtyId: $clinicalProviderSpecialtyId) {
id
createdAt
updatedAt
name
clinicalProviderId
specialtyId
clinicalProvider {
  id
  name
}
specialty {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { clinicalProviderSpecialtyId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateClinicalProviderSpecialty Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateClinicalProviderSpecialty($input: UserCreateClinicalProviderSpecialtyInput!) {
      created: userCreateClinicalProviderSpecialty(input: $input) {
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
    mutation UserUpdateClinicalProviderSpecialty($clinicalProviderSpecialtyId: String!, $input: UserUpdateClinicalProviderSpecialtyInput!) {
      updated: userUpdateClinicalProviderSpecialty(clinicalProviderSpecialtyId: $clinicalProviderSpecialtyId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { clinicalProviderSpecialtyId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteClinicalProviderSpecialty($clinicalProviderSpecialtyId: String!) {
      deleted: userDeleteClinicalProviderSpecialty(clinicalProviderSpecialtyId: $clinicalProviderSpecialtyId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { clinicalProviderSpecialtyId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

