
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserAssignedDocuments Query Test', async ({ page }) => {
  const query = gql`
    query UserAssignedDocuments($input: UserListAssignedDocumentInput) {
      items: userAssignedDocuments(input: $input) {
id
createdAt
updatedAt
name
expirationDate
entityName
entityId
documentId
templateId
documentTypeId
userId
vendorId
document {
  id
  name
}
template {
  id
  name
}
documentType {
  id
  name
}
user {
  id
  name
}
vendor {
  id
  name
}





      }
      count: userCountAssignedDocuments(input: $input) {
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

test('UserCountAssignedDocuments Query Test', async ({ page }) => {
  const query = gql`
    query UserCountAssignedDocuments($input: UserListAssignedDocumentInput) {
      count: userCountAssignedDocuments(input: $input) {
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

test('UserSelectAssignedDocuments Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectAssignedDocuments($input: UserListAssignedDocumentInput) {
      items: userSelectAssignedDocuments(input: $input) {
id
createdAt
updatedAt
name
expirationDate
entityName
entityId
documentId
templateId
documentTypeId
userId
vendorId
document {
  id
  name
}
template {
  id
  name
}
documentType {
  id
  name
}
user {
  id
  name
}
vendor {
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

test('UserAssignedDocument Query Test', async ({ page }) => {
  const assignedDocumentsQuery = gql`
    query UserAssignedDocuments {
      items: userAssignedDocuments {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const assignedDocumentsResponse = await sendGraphQLQuery(url.href,assignedDocumentsQuery);

  // Verify the response data
  const { data: { items: assignedDocuments }, errors: assignedDocumentsErrors } = assignedDocumentsResponse;
  expect(assignedDocumentsErrors).toBeUndefined();
  expect(assignedDocuments).toBeDefined();
  expect(assignedDocuments.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const assignedDocumentId = assignedDocuments[0].id;

  const query = gql`
    query UserAssignedDocument($assignedDocumentId: String!) {
      item: userAssignedDocument(assignedDocumentId: $assignedDocumentId) {
id
createdAt
updatedAt
name
expirationDate
entityName
entityId
documentId
templateId
documentTypeId
userId
vendorId
document {
  id
  name
}
template {
  id
  name
}
documentType {
  id
  name
}
user {
  id
  name
}
vendor {
  id
  name
}





      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { assignedDocumentId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateAssignedDocument Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateAssignedDocument($input: UserCreateAssignedDocumentInput!) {
      created: userCreateAssignedDocument(input: $input) {
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
    mutation UserUpdateAssignedDocument($assignedDocumentId: String!, $input: UserUpdateAssignedDocumentInput!) {
      updated: userUpdateAssignedDocument(assignedDocumentId: $assignedDocumentId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { assignedDocumentId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteAssignedDocument($assignedDocumentId: String!) {
      deleted: userDeleteAssignedDocument(assignedDocumentId: $assignedDocumentId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { assignedDocumentId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

