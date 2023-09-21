
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserPatients Query Test', async ({ page }) => {
  const query = `
    query UserPatients($input: UserListPatientInput) {
      items: userPatients(input: $input) {
id
createdAt
updatedAt
name
firstName
middleName
lastName
suffix
genderId
nickname
height
weight
dateOfBirth
primaryPhoneNumber
isPrimaryPhoneMobile
secondaryPhoneNumber
isSecondaryPhoneMobile
memberRegistrationNumber
ethnicityId
languageId
requiresTranslator
socialSecurityNumber
honorific
primaryEmailAddress
primaryAddressLine1
primaryAddressLine2
primaryAddressCity
primaryAddressStateOrProvince
primaryAddressPostalCode
workAddressLine1
workAddressLine2
workAddressCity
workAddressStateOrProvince
workAddressPostalCode
notes
latitude
longitude
workLatitude
workLongitude
emergencyContactId
homePhoneNumber
mobileNumber
bmi
occupation
debtorRemarks
ethnicity {
  id
  name
}
gender {
  id
  name
}
language {
  id
  name
}





prescriptions {
    id
    name
  }

documents {
    id
    name
  }

patientStudies {
    id
    name
  }

claims {
    id
    name
  }

legalCases {
    id
    name
  }

priorAuthorizationRequests {
    id
    name
  }

appointments {
    id
    name
  }

users {
    id
    name
  }
      }
      count: userCountPatients(input: $input) {
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

test('UserCountPatients Query Test', async ({ page }) => {
  const query = `
    query UserCountPatients($input: UserListPatientInput) {
      count: userCountPatients(input: $input) {
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

test('UserSelectPatients Query Test', async ({ page }) => {
  const query = `
    query UserSelectPatients($input: UserListPatientInput) {
      items: userSelectPatients(input: $input) {
id
createdAt
updatedAt
name
firstName
middleName
lastName
suffix
genderId
nickname
height
weight
dateOfBirth
primaryPhoneNumber
isPrimaryPhoneMobile
secondaryPhoneNumber
isSecondaryPhoneMobile
memberRegistrationNumber
ethnicityId
languageId
requiresTranslator
socialSecurityNumber
honorific
primaryEmailAddress
primaryAddressLine1
primaryAddressLine2
primaryAddressCity
primaryAddressStateOrProvince
primaryAddressPostalCode
workAddressLine1
workAddressLine2
workAddressCity
workAddressStateOrProvince
workAddressPostalCode
notes
latitude
longitude
workLatitude
workLongitude
emergencyContactId
homePhoneNumber
mobileNumber
bmi
occupation
debtorRemarks
ethnicity {
  id
  name
}
gender {
  id
  name
}
language {
  id
  name
}





prescriptions {
    id
    name
  }

documents {
    id
    name
  }

patientStudies {
    id
    name
  }

claims {
    id
    name
  }

legalCases {
    id
    name
  }

priorAuthorizationRequests {
    id
    name
  }

appointments {
    id
    name
  }

users {
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

test('UserPatient Query Test', async ({ page }) => {
  const patientsQuery = `
    query UserPatients {
      items: userPatients {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const patientsResponse = await sendGraphQLQuery(url.href,patientsQuery);

  // Verify the response data
  const { data: { items: patients }, errors: patientsErrors } = patientsResponse;
  expect(patientsErrors).toBeUndefined();
  expect(patients).toBeDefined();
  expect(patients.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const patientId = patients[0].id;

  const query = `
    query UserPatient($patientId: String!) {
      item: userPatient(patientId: $patientId) {
id
createdAt
updatedAt
name
firstName
middleName
lastName
suffix
genderId
nickname
height
weight
dateOfBirth
primaryPhoneNumber
isPrimaryPhoneMobile
secondaryPhoneNumber
isSecondaryPhoneMobile
memberRegistrationNumber
ethnicityId
languageId
requiresTranslator
socialSecurityNumber
honorific
primaryEmailAddress
primaryAddressLine1
primaryAddressLine2
primaryAddressCity
primaryAddressStateOrProvince
primaryAddressPostalCode
workAddressLine1
workAddressLine2
workAddressCity
workAddressStateOrProvince
workAddressPostalCode
notes
latitude
longitude
workLatitude
workLongitude
emergencyContactId
homePhoneNumber
mobileNumber
bmi
occupation
debtorRemarks
ethnicity {
  id
  name
}
gender {
  id
  name
}
language {
  id
  name
}





prescriptions {
    id
    name
  }

documents {
    id
    name
  }

patientStudies {
    id
    name
  }

claims {
    id
    name
  }

legalCases {
    id
    name
  }

priorAuthorizationRequests {
    id
    name
  }

appointments {
    id
    name
  }

users {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { patientId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreatePatient Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreatePatient($input: UserCreatePatientInput!) {
      created: userCreatePatient(input: $input) {
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
    mutation UserUpdatePatient($patientId: String!, $input: UserUpdatePatientInput!) {
      updated: userUpdatePatient(patientId: $patientId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { patientId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeletePatient($patientId: String!) {
      deleted: userDeletePatient(patientId: $patientId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { patientId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

