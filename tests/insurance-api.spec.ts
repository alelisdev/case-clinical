
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserInsurances Query Test', async ({ page }) => {
  const query = `
    query UserInsurances($input: UserListInsuranceInput) {
      items: userInsurances(input: $input) {
id
createdAt
updatedAt
name
legalCaseId
insuranceTypeId
insuranceSectorId
policyNumber
insuranceCompany
minimumCoverageAmount
maximumCoverageAmount
isStackable
adjuster
leadId
legalCase {
  id
  name
}
insuranceType {
  id
  name
}
insuranceSector {
  id
  name
}
lead {
  id
  name
}





      }
      count: userCountInsurances(input: $input) {
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

test('UserCountInsurances Query Test', async ({ page }) => {
  const query = `
    query UserCountInsurances($input: UserListInsuranceInput) {
      count: userCountInsurances(input: $input) {
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

test('UserSelectInsurances Query Test', async ({ page }) => {
  const query = `
    query UserSelectInsurances($input: UserListInsuranceInput) {
      items: userSelectInsurances(input: $input) {
id
createdAt
updatedAt
name
legalCaseId
insuranceTypeId
insuranceSectorId
policyNumber
insuranceCompany
minimumCoverageAmount
maximumCoverageAmount
isStackable
adjuster
leadId
legalCase {
  id
  name
}
insuranceType {
  id
  name
}
insuranceSector {
  id
  name
}
lead {
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

test('UserInsurance Query Test', async ({ page }) => {
  const insurancesQuery = `
    query UserInsurances {
      items: userInsurances {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const insurancesResponse = await sendGraphQLQuery(url.href,insurancesQuery);

  // Verify the response data
  const { data: { items: insurances }, errors: insurancesErrors } = insurancesResponse;
  expect(insurancesErrors).toBeUndefined();
  expect(insurances).toBeDefined();
  expect(insurances.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const insuranceId = insurances[0].id;

  const query = `
    query UserInsurance($insuranceId: String!) {
      item: userInsurance(insuranceId: $insuranceId) {
id
createdAt
updatedAt
name
legalCaseId
insuranceTypeId
insuranceSectorId
policyNumber
insuranceCompany
minimumCoverageAmount
maximumCoverageAmount
isStackable
adjuster
leadId
legalCase {
  id
  name
}
insuranceType {
  id
  name
}
insuranceSector {
  id
  name
}
lead {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { insuranceId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateInsurance Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateInsurance($input: UserCreateInsuranceInput!) {
      created: userCreateInsurance(input: $input) {
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
    mutation UserUpdateInsurance($insuranceId: String!, $input: UserUpdateInsuranceInput!) {
      updated: userUpdateInsurance(insuranceId: $insuranceId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { insuranceId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteInsurance($insuranceId: String!) {
      deleted: userDeleteInsurance(insuranceId: $insuranceId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { insuranceId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

