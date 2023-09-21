
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserPriorAuthorizationRequests Query Test', async ({ page }) => {
  const query = `
    query UserPriorAuthorizationRequests($input: UserListPriorAuthorizationRequestInput) {
      items: userPriorAuthorizationRequests(input: $input) {
id
createdAt
updatedAt
name
referredOn
approvedOn
effectiveAsOf
expiresOn
duration
procedureSiteId
surgicalPositionId
procedureDescription
remarks
underwritingApproved
tpaApproved
requiresMedicalDirector
reviewedOn
treatingProviderId
referredToId
priorAuthorizationNumber
caseManager
memberNumber
medicalDirector
tpaApprover
underwriter
prescriptionId
visitKindId
guidelineUsedId
guidelineRequires
authorizationKindId
authorizationStatusId
patientId
caseProcedureId
procedureSite {
  id
  name
}
surgicalPosition {
  id
  name
}
treatingProvider {
  id
  name
}
referredTo {
  id
  name
}
prescription {
  id
  name
}
visitKind {
  id
  name
}
guidelineUsed {
  id
  name
}
authorizationKind {
  id
  name
}
authorizationStatus {
  id
  name
}
patient {
  id
  name
}
caseProcedure {
  id
  name
}





claims {
    id
    name
  }

guidelines {
    id
    name
  }

priorAuthDmes {
    id
    name
  }

priorAuthorizationDiagnosisCodes {
    id
    name
  }

priorAuthorizationEquipments {
    id
    name
  }

priorAuthorizationImplants {
    id
    name
  }

priorAuthorizationProcedureCodes {
    id
    name
  }
      }
      count: userCountPriorAuthorizationRequests(input: $input) {
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

test('UserCountPriorAuthorizationRequests Query Test', async ({ page }) => {
  const query = `
    query UserCountPriorAuthorizationRequests($input: UserListPriorAuthorizationRequestInput) {
      count: userCountPriorAuthorizationRequests(input: $input) {
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

test('UserSelectPriorAuthorizationRequests Query Test', async ({ page }) => {
  const query = `
    query UserSelectPriorAuthorizationRequests($input: UserListPriorAuthorizationRequestInput) {
      items: userSelectPriorAuthorizationRequests(input: $input) {
id
createdAt
updatedAt
name
referredOn
approvedOn
effectiveAsOf
expiresOn
duration
procedureSiteId
surgicalPositionId
procedureDescription
remarks
underwritingApproved
tpaApproved
requiresMedicalDirector
reviewedOn
treatingProviderId
referredToId
priorAuthorizationNumber
caseManager
memberNumber
medicalDirector
tpaApprover
underwriter
prescriptionId
visitKindId
guidelineUsedId
guidelineRequires
authorizationKindId
authorizationStatusId
patientId
caseProcedureId
procedureSite {
  id
  name
}
surgicalPosition {
  id
  name
}
treatingProvider {
  id
  name
}
referredTo {
  id
  name
}
prescription {
  id
  name
}
visitKind {
  id
  name
}
guidelineUsed {
  id
  name
}
authorizationKind {
  id
  name
}
authorizationStatus {
  id
  name
}
patient {
  id
  name
}
caseProcedure {
  id
  name
}





claims {
    id
    name
  }

guidelines {
    id
    name
  }

priorAuthDmes {
    id
    name
  }

priorAuthorizationDiagnosisCodes {
    id
    name
  }

priorAuthorizationEquipments {
    id
    name
  }

priorAuthorizationImplants {
    id
    name
  }

priorAuthorizationProcedureCodes {
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

test('UserPriorAuthorizationRequest Query Test', async ({ page }) => {
  const priorAuthorizationRequestsQuery = `
    query UserPriorAuthorizationRequests {
      items: userPriorAuthorizationRequests {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const priorAuthorizationRequestsResponse = await sendGraphQLQuery(url.href,priorAuthorizationRequestsQuery);

  // Verify the response data
  const { data: { items: priorAuthorizationRequests }, errors: priorAuthorizationRequestsErrors } = priorAuthorizationRequestsResponse;
  expect(priorAuthorizationRequestsErrors).toBeUndefined();
  expect(priorAuthorizationRequests).toBeDefined();
  expect(priorAuthorizationRequests.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const priorAuthorizationRequestId = priorAuthorizationRequests[0].id;

  const query = `
    query UserPriorAuthorizationRequest($priorAuthorizationRequestId: String!) {
      item: userPriorAuthorizationRequest(priorAuthorizationRequestId: $priorAuthorizationRequestId) {
id
createdAt
updatedAt
name
referredOn
approvedOn
effectiveAsOf
expiresOn
duration
procedureSiteId
surgicalPositionId
procedureDescription
remarks
underwritingApproved
tpaApproved
requiresMedicalDirector
reviewedOn
treatingProviderId
referredToId
priorAuthorizationNumber
caseManager
memberNumber
medicalDirector
tpaApprover
underwriter
prescriptionId
visitKindId
guidelineUsedId
guidelineRequires
authorizationKindId
authorizationStatusId
patientId
caseProcedureId
procedureSite {
  id
  name
}
surgicalPosition {
  id
  name
}
treatingProvider {
  id
  name
}
referredTo {
  id
  name
}
prescription {
  id
  name
}
visitKind {
  id
  name
}
guidelineUsed {
  id
  name
}
authorizationKind {
  id
  name
}
authorizationStatus {
  id
  name
}
patient {
  id
  name
}
caseProcedure {
  id
  name
}





claims {
    id
    name
  }

guidelines {
    id
    name
  }

priorAuthDmes {
    id
    name
  }

priorAuthorizationDiagnosisCodes {
    id
    name
  }

priorAuthorizationEquipments {
    id
    name
  }

priorAuthorizationImplants {
    id
    name
  }

priorAuthorizationProcedureCodes {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { priorAuthorizationRequestId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreatePriorAuthorizationRequest Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreatePriorAuthorizationRequest($input: UserCreatePriorAuthorizationRequestInput!) {
      created: userCreatePriorAuthorizationRequest(input: $input) {
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
    mutation UserUpdatePriorAuthorizationRequest($priorAuthorizationRequestId: String!, $input: UserUpdatePriorAuthorizationRequestInput!) {
      updated: userUpdatePriorAuthorizationRequest(priorAuthorizationRequestId: $priorAuthorizationRequestId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { priorAuthorizationRequestId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeletePriorAuthorizationRequest($priorAuthorizationRequestId: String!) {
      deleted: userDeletePriorAuthorizationRequest(priorAuthorizationRequestId: $priorAuthorizationRequestId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { priorAuthorizationRequestId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

