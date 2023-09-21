
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserAttorneys Query Test', async ({ page }) => {
  const query = gql`
    query UserAttorneys($input: UserListAttorneyInput) {
      items: userAttorneys(input: $input) {
id
createdAt
updatedAt
name
firmId
attorneyStatusId
attorneyTypeId
title
firstName
lastName
address
city
state
zip
email
direct
fax
cellPhone
barNumber
barState
doNotDisturb
temp
createdById
dateCreated
removed
migSource
entity
firmNolongerNeeded
firm {
  id
  name
}
attorneyStatus {
  id
  name
}
attorneyType {
  id
  name
}





legalCases {
    id
    name
  }

user {
    id
    name
  }
      }
      count: userCountAttorneys(input: $input) {
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

test('UserCountAttorneys Query Test', async ({ page }) => {
  const query = gql`
    query UserCountAttorneys($input: UserListAttorneyInput) {
      count: userCountAttorneys(input: $input) {
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

test('UserSelectAttorneys Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectAttorneys($input: UserListAttorneyInput) {
      items: userSelectAttorneys(input: $input) {
id
createdAt
updatedAt
name
firmId
attorneyStatusId
attorneyTypeId
title
firstName
lastName
address
city
state
zip
email
direct
fax
cellPhone
barNumber
barState
doNotDisturb
temp
createdById
dateCreated
removed
migSource
entity
firmNolongerNeeded
firm {
  id
  name
}
attorneyStatus {
  id
  name
}
attorneyType {
  id
  name
}





legalCases {
    id
    name
  }

user {
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

test('UserAttorney Query Test', async ({ page }) => {
  const attorneysQuery = gql`
    query UserAttorneys {
      items: userAttorneys {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const attorneysResponse = await sendGraphQLQuery(url.href,attorneysQuery);

  // Verify the response data
  const { data: { items: attorneys }, errors: attorneysErrors } = attorneysResponse;
  expect(attorneysErrors).toBeUndefined();
  expect(attorneys).toBeDefined();
  expect(attorneys.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const attorneyId = attorneys[0].id;

  const query = gql`
    query UserAttorney($attorneyId: String!) {
      item: userAttorney(attorneyId: $attorneyId) {
id
createdAt
updatedAt
name
firmId
attorneyStatusId
attorneyTypeId
title
firstName
lastName
address
city
state
zip
email
direct
fax
cellPhone
barNumber
barState
doNotDisturb
temp
createdById
dateCreated
removed
migSource
entity
firmNolongerNeeded
firm {
  id
  name
}
attorneyStatus {
  id
  name
}
attorneyType {
  id
  name
}





legalCases {
    id
    name
  }

user {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { attorneyId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateAttorney Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateAttorney($input: UserCreateAttorneyInput!) {
      created: userCreateAttorney(input: $input) {
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
    mutation UserUpdateAttorney($attorneyId: String!, $input: UserUpdateAttorneyInput!) {
      updated: userUpdateAttorney(attorneyId: $attorneyId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { attorneyId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteAttorney($attorneyId: String!) {
      deleted: userDeleteAttorney(attorneyId: $attorneyId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { attorneyId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

