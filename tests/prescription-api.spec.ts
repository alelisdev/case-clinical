
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserPrescriptions Query Test', async ({ page }) => {
  const query = `
    query UserPrescriptions($input: UserListPrescriptionInput) {
      items: userPrescriptions(input: $input) {
id
createdAt
updatedAt
name
medicalProvider
dateWritten
days
note
category
kind
quantity
refills
rxNumber
sig
strength
unit
patientId
documentId
patient {
  id
  name
}
document {
  id
  name
}





      }
      count: userCountPrescriptions(input: $input) {
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

test('UserCountPrescriptions Query Test', async ({ page }) => {
  const query = `
    query UserCountPrescriptions($input: UserListPrescriptionInput) {
      count: userCountPrescriptions(input: $input) {
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

test('UserSelectPrescriptions Query Test', async ({ page }) => {
  const query = `
    query UserSelectPrescriptions($input: UserListPrescriptionInput) {
      items: userSelectPrescriptions(input: $input) {
id
createdAt
updatedAt
name
medicalProvider
dateWritten
days
note
category
kind
quantity
refills
rxNumber
sig
strength
unit
patientId
documentId
patient {
  id
  name
}
document {
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

test('UserPrescription Query Test', async ({ page }) => {
  const prescriptionsQuery = `
    query UserPrescriptions {
      items: userPrescriptions {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const prescriptionsResponse = await sendGraphQLQuery(url.href,prescriptionsQuery);

  // Verify the response data
  const { data: { items: prescriptions }, errors: prescriptionsErrors } = prescriptionsResponse;
  expect(prescriptionsErrors).toBeUndefined();
  expect(prescriptions).toBeDefined();
  expect(prescriptions.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const prescriptionId = prescriptions[0].id;

  const query = `
    query UserPrescription($prescriptionId: String!) {
      item: userPrescription(prescriptionId: $prescriptionId) {
id
createdAt
updatedAt
name
medicalProvider
dateWritten
days
note
category
kind
quantity
refills
rxNumber
sig
strength
unit
patientId
documentId
patient {
  id
  name
}
document {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { prescriptionId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreatePrescription Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreatePrescription($input: UserCreatePrescriptionInput!) {
      created: userCreatePrescription(input: $input) {
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
    mutation UserUpdatePrescription($prescriptionId: String!, $input: UserUpdatePrescriptionInput!) {
      updated: userUpdatePrescription(prescriptionId: $prescriptionId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { prescriptionId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeletePrescription($prescriptionId: String!) {
      deleted: userDeletePrescription(prescriptionId: $prescriptionId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { prescriptionId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

