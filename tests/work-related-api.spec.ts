
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserWorkRelateds Query Test', async ({ page }) => {
  const query = `
    query UserWorkRelateds($input: UserListWorkRelatedInput) {
      items: userWorkRelateds(input: $input) {
selfInsuredWorkComp
workCompCaseIsOpenClosed
workCompCaseSettledAmount
workCompCaseSettlementIncludesFutureMedicals
reasonNotFiledUnderWorkComp






      }
      count: userCountWorkRelateds(input: $input) {
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

test('UserCountWorkRelateds Query Test', async ({ page }) => {
  const query = `
    query UserCountWorkRelateds($input: UserListWorkRelatedInput) {
      count: userCountWorkRelateds(input: $input) {
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

test('UserSelectWorkRelateds Query Test', async ({ page }) => {
  const query = `
    query UserSelectWorkRelateds($input: UserListWorkRelatedInput) {
      items: userSelectWorkRelateds(input: $input) {
selfInsuredWorkComp
workCompCaseIsOpenClosed
workCompCaseSettledAmount
workCompCaseSettlementIncludesFutureMedicals
reasonNotFiledUnderWorkComp






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

test('UserWorkRelated Query Test', async ({ page }) => {
  const workRelatedsQuery = `
    query UserWorkRelateds {
      items: userWorkRelateds {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const workRelatedsResponse = await sendGraphQLQuery(url.href,workRelatedsQuery);

  // Verify the response data
  const { data: { items: workRelateds }, errors: workRelatedsErrors } = workRelatedsResponse;
  expect(workRelatedsErrors).toBeUndefined();
  expect(workRelateds).toBeDefined();
  expect(workRelateds.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const workRelatedId = workRelateds[0].id;

  const query = `
    query UserWorkRelated($workRelatedId: String!) {
      item: userWorkRelated(workRelatedId: $workRelatedId) {
selfInsuredWorkComp
workCompCaseIsOpenClosed
workCompCaseSettledAmount
workCompCaseSettlementIncludesFutureMedicals
reasonNotFiledUnderWorkComp






      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { workRelatedId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateWorkRelated Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateWorkRelated($input: UserCreateWorkRelatedInput!) {
      created: userCreateWorkRelated(input: $input) {
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
    mutation UserUpdateWorkRelated($workRelatedId: String!, $input: UserUpdateWorkRelatedInput!) {
      updated: userUpdateWorkRelated(workRelatedId: $workRelatedId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { workRelatedId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteWorkRelated($workRelatedId: String!) {
      deleted: userDeleteWorkRelated(workRelatedId: $workRelatedId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { workRelatedId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

