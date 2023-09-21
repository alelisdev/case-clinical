
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserLocations Query Test', async ({ page }) => {
  const query = `
  query UserLocations($input: UserListLocationInput) {
    items: userLocations(input: $input) {
id
createdAt
updatedAt
name
locationName
line1
line2
city
state
postalCode
latitude
longitude
abbrev
division
country
officePhone
fax
attentionTo
placeOfServiceId
placeOfService {
id
name
}





providerLocations {
  id
  name
}

caseAccounts {
  id
  name
}

caseProcedures {
  id
  name
}

appointments {
  id
  name
}
    }
    count: userCountLocations(input: $input) {
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

test('UserCountLocations Query Test', async ({ page }) => {
  const query = `
    query UserCountLocations($input: UserListLocationInput) {
      count: userCountLocations(input: $input) {
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

test('UserSelectLocations Query Test', async ({ page }) => {
  const query = `
  query UserSelectLocations($input: UserListLocationInput) {
    items: userSelectLocations(input: $input) {
id
createdAt
updatedAt
name
locationName
line1
line2
city
state
postalCode
latitude
longitude
abbrev
division
country
officePhone
fax
attentionTo
placeOfServiceId
placeOfService {
id
name
}





providerLocations {
  id
  name
}


caseAccounts {
  id
  name
}

caseProcedures {
  id
  name
}

appointments {
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

test('UserLocation Query Test', async ({ page }) => {
  const locationsQuery = `
    query UserLocations {
      items: userLocations {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const locationsResponse = await sendGraphQLQuery(url.href,locationsQuery);

  // Verify the response data
  const { data: { items: locations }, errors: locationsErrors } = locationsResponse;
  expect(locationsErrors).toBeUndefined();
  expect(locations).toBeDefined();
  expect(locations.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const locationId = locations[0].id;

  const query = `
    query UserLocation($locationId: String!) {
      item: userLocation(locationId: $locationId) {
id
createdAt
updatedAt
name
locationName
line1
line2
city
state
postalCode
latitude
longitude
abbrev
division
country
officePhone
fax
attentionTo
placeOfServiceId
placeOfService {
  id
  name
}





providerLocations {
    id
    name
  }
 
caseAccounts {
    id
    name
  }

caseProcedures {
    id
    name
  }

appointments {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { locationId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateLocation Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateLocation($input: UserCreateLocationInput!) {
      created: userCreateLocation(input: $input) {
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
    mutation UserUpdateLocation($locationId: String!, $input: UserUpdateLocationInput!) {
      updated: userUpdateLocation(locationId: $locationId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { locationId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteLocation($locationId: String!) {
      deleted: userDeleteLocation(locationId: $locationId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { locationId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

