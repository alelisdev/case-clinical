
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {  } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserContracts Query Test', async ({ page }) => {
  const query = `
    query UserContracts($input: UserListContractInput) {
      items: userContracts(input: $input) {
id
createdAt
updatedAt
name
organizationId
billingOrganizationId
templateId
billOnBehalf
billRate
vendorId
contractDate
maturityDate
requiresTpaMedicalNecessity
requiresTpaMedicareAllowable
reconciliationPeriodTypeId
calculationBasisTypeId
signed
processId
organization {
  id
  name
}
billingOrganization {
  id
  name
}
template {
  id
  name
}
vendor {
  id
  name
}
reconciliationPeriodType {
  id
  name
}
calculationBasisType {
  id
  name
}
process {
  id
  name
}





documents {
    id
    name
  }

contractedRates {
    id
    name
  }

caseAccounts {
    id
    name
  }

contractTerms {
    id
    name
  }

procedureVendors {
    id
    name
  }
      }
      count: userCountContracts(input: $input) {
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

test('UserCountContracts Query Test', async ({ page }) => {
  const query = `
    query UserCountContracts($input: UserListContractInput) {
      count: userCountContracts(input: $input) {
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

test('UserSelectContracts Query Test', async ({ page }) => {
  const query = `
    query UserSelectContracts($input: UserListContractInput) {
      items: userSelectContracts(input: $input) {
id
createdAt
updatedAt
name
organizationId
billingOrganizationId
templateId
billOnBehalf
billRate
vendorId
contractDate
maturityDate
requiresTpaMedicalNecessity
requiresTpaMedicareAllowable
reconciliationPeriodTypeId
calculationBasisTypeId
signed
processId
organization {
  id
  name
}
billingOrganization {
  id
  name
}
template {
  id
  name
}
vendor {
  id
  name
}
reconciliationPeriodType {
  id
  name
}
calculationBasisType {
  id
  name
}
process {
  id
  name
}





documents {
    id
    name
  }

contractedRates {
    id
    name
  }

caseAccounts {
    id
    name
  }

contractTerms {
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

test('UserContract Query Test', async ({ page }) => {
  const contractsQuery = `
    query UserContracts {
      items: userContracts {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const contractsResponse = await sendGraphQLQuery(url.href,contractsQuery);

  // Verify the response data
  const { data: { items: contracts }, errors: contractsErrors } = contractsResponse;
  expect(contractsErrors).toBeUndefined();
  expect(contracts).toBeDefined();
  expect(contracts.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const contractId = contracts[0].id;

  const query = `
    query UserContract($contractId: String!) {
      item: userContract(contractId: $contractId) {
id
createdAt
updatedAt
name
organizationId
billingOrganizationId
templateId
billOnBehalf
billRate
vendorId
contractDate
maturityDate
requiresTpaMedicalNecessity
requiresTpaMedicareAllowable
reconciliationPeriodTypeId
calculationBasisTypeId
signed
processId
organization {
  id
  name
}
billingOrganization {
  id
  name
}
template {
  id
  name
}
vendor {
  id
  name
}
reconciliationPeriodType {
  id
  name
}
calculationBasisType {
  id
  name
}
process {
  id
  name
}





documents {
    id
    name
  }

contractedRates {
    id
    name
  }

caseAccounts {
    id
    name
  }

contractTerms {
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
  const response = await sendGraphQLQuery(graphqlUrl, query, { contractId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateContract Mutation Test', async ({ page, browser }) => {
  const createMutation = `
    mutation UserCreateContract($input: UserCreateContractInput!) {
      created: userCreateContract(input: $input) {
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
    mutation UserUpdateContract($contractId: String!, $input: UserUpdateContractInput!) {
      updated: userUpdateContract(contractId: $contractId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { contractId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = `
    mutation UserDeleteContract($contractId: String!) {
      deleted: userDeleteContract(contractId: $contractId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { contractId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

