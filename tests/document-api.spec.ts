
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserDocuments Query Test', async ({ page }) => {
  const query = gql`
    query UserDocuments($input: UserListDocumentInput) {
      items: userDocuments(input: $input) {
id
createdAt
updatedAt
name
attachment
encoding
extension
contractId
patientId
providerId
patientStudyId
procedureVendorId
medicalConditionProviderId
locationId
contract {
  id
  name
}
patient {
  id
  name
}
provider {
  id
  name
}
patientStudies {
  id
  name
}
procedureVendor {
  id
  name
}
medicalConditionProvider {
  id
  name
}





assignedDocuments {
    id
    name
  }

authroizedMedicalReports {
    id
    name
  }

authorizedBills {
    id
    name
  }

priorAuthorizationRequests {
    id
    name
  }

prescriptions {
    id
    name
  }

medicalReports {
    id
    name
  }

bills {
    id
    name
  }

imagings {
    id
    name
  }

claims {
    id
    name
  }

eulas {
    id
    name
  }

statements {
    id
    name
  }

phoneRecordings {
    id
    name
  }

policeReportAttachments {
    id
    name
  }

driversLicenses {
    id
    name
  }

invoices {
    id
    name
  }

explainationOfPayments {
    id
    name
  }
      }
      count: userCountDocuments(input: $input) {
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

test('UserCountDocuments Query Test', async ({ page }) => {
  const query = gql`
    query UserCountDocuments($input: UserListDocumentInput) {
      count: userCountDocuments(input: $input) {
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

test('UserSelectDocuments Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectDocuments($input: UserListDocumentInput) {
      items: userSelectDocuments(input: $input) {
id
createdAt
updatedAt
name
attachment
encoding
extension
contractId
patientId
providerId
patientStudyId
procedureVendorId
medicalConditionProviderId
locationId
contract {
  id
  name
}
patient {
  id
  name
}
provider {
  id
  name
}
patientStudies {
  id
  name
}
procedureVendor {
  id
  name
}
medicalConditionProvider {
  id
  name
}





assignedDocuments {
    id
    name
  }

authroizedMedicalReports {
    id
    name
  }

authorizedBills {
    id
    name
  }

priorAuthorizationRequests {
    id
    name
  }

prescriptions {
    id
    name
  }

medicalReports {
    id
    name
  }

bills {
    id
    name
  }

imagings {
    id
    name
  }

claims {
    id
    name
  }

eulas {
    id
    name
  }

statements {
    id
    name
  }

phoneRecordings {
    id
    name
  }

policeReportAttachments {
    id
    name
  }

driversLicenses {
    id
    name
  }

invoices {
    id
    name
  }

explainationOfPayments {
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

test('UserDocument Query Test', async ({ page }) => {
  const documentsQuery = gql`
    query UserDocuments {
      items: userDocuments {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const documentsResponse = await sendGraphQLQuery(url.href,documentsQuery);

  // Verify the response data
  const { data: { items: documents }, errors: documentsErrors } = documentsResponse;
  expect(documentsErrors).toBeUndefined();
  expect(documents).toBeDefined();
  expect(documents.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const documentId = documents[0].id;

  const query = gql`
    query UserDocument($documentId: String!) {
      item: userDocument(documentId: $documentId) {
id
createdAt
updatedAt
name
attachment
encoding
extension
contractId
patientId
providerId
patientStudyId
procedureVendorId
medicalConditionProviderId
locationId
contract {
  id
  name
}
patient {
  id
  name
}
provider {
  id
  name
}
patientStudies {
  id
  name
}
procedureVendor {
  id
  name
}
medicalConditionProvider {
  id
  name
}





assignedDocuments {
    id
    name
  }

authroizedMedicalReports {
    id
    name
  }

authorizedBills {
    id
    name
  }

priorAuthorizationRequests {
    id
    name
  }

prescriptions {
    id
    name
  }

medicalReports {
    id
    name
  }

bills {
    id
    name
  }

imagings {
    id
    name
  }

claims {
    id
    name
  }

eulas {
    id
    name
  }

statements {
    id
    name
  }

phoneRecordings {
    id
    name
  }

policeReportAttachments {
    id
    name
  }

driversLicenses {
    id
    name
  }

invoices {
    id
    name
  }

explainationOfPayments {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { documentId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateDocument Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateDocument($input: UserCreateDocumentInput!) {
      created: userCreateDocument(input: $input) {
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
    mutation UserUpdateDocument($documentId: String!, $input: UserUpdateDocumentInput!) {
      updated: userUpdateDocument(documentId: $documentId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { documentId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteDocument($documentId: String!) {
      deleted: userDeleteDocument(documentId: $documentId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { documentId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

