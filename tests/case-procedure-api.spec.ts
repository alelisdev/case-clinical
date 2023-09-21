
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserCaseProcedures Query Test', async ({ page }) => {
  const query = `
    query UserCaseProcedures($input: UserListCaseProcedureInput) {
      items: userCaseProcedures(input: $input) {
id
createdAt
updatedAt
name
legalCaseId
appointmentId
locationId
procedureDate
cost
notes
createdBy
dateCreated
removed
approvedDate
procedureReasonName
decisionDate
nextActionDate
legalCase {
  id
  name
}
appointment {
  id
  name
}
location {
  id
  name
}





priorAuthorizationRequests {
    id
    name
  }

procedureVendors {
    id
    name
  }
      }
      count: userCountCaseProcedures(input: $input) {
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

test('UserCountCaseProcedures Query Test', async ({ page }) => {
  const query = `
    query UserCountCaseProcedures($input: UserListCaseProcedureInput) {
      count: userCountCaseProcedures(input: $input) {
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

test('UserSelectCaseProcedures Query Test', async ({ page }) => {
  const query = `
    query UserSelectCaseProcedures($input: UserListCaseProcedureInput) {
      items: userSelectCaseProcedures(input: $input) {
id
createdAt
updatedAt
name
legalCaseId
appointmentId
locationId
procedureDate
cost
notes
createdBy
dateCreated
removed
approvedDate
procedureReasonName
decisionDate
nextActionDate
legalCase {
  id
  name
}
appointment {
  id
  name
}
location {
  id
  name
}





priorAuthorizationRequests {
    id
    name
  }

procedureVendors {
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

test('UserCaseProcedure Query Test', async ({ page }) => {
  const caseProceduresQuery = `
    query UserCaseProcedures {
      items: userCaseProcedures {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const caseProceduresResponse = await sendGraphQLQuery(url.href,caseProceduresQuery);

  // Verify the response data
  const { data: { items: caseProcedures }, errors: caseProceduresErrors } = caseProceduresResponse;
  expect(caseProceduresErrors).toBeUndefined();
  expect(caseProcedures).toBeDefined();
  expect(caseProcedures.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const caseProcedureId = caseProcedures[0].id;

  const query = `
    query UserCaseProcedure($caseProcedureId: String!) {
      item: userCaseProcedure(caseProcedureId: $caseProcedureId) {
id
createdAt
updatedAt
name
legalCaseId
appointmentId
locationId
procedureDate
cost
notes
createdBy
dateCreated
removed
approvedDate
procedureReasonName
decisionDate
nextActionDate
legalCase {
  id
  name
}
appointment {
  id
  name
}
location {
  id
  name
}





priorAuthorizationRequests {
    id
    name
  }

procedureVendors {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { caseProcedureId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateCaseProcedure Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateCaseProcedure($input: UserCreateCaseProcedureInput!) {
      created: userCreateCaseProcedure(input: $input) {
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
    mutation UserUpdateCaseProcedure($caseProcedureId: String!, $input: UserUpdateCaseProcedureInput!) {
      updated: userUpdateCaseProcedure(caseProcedureId: $caseProcedureId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { caseProcedureId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteCaseProcedure($caseProcedureId: String!) {
      deleted: userDeleteCaseProcedure(caseProcedureId: $caseProcedureId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { caseProcedureId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

