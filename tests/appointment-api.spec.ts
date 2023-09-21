
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { gql } from 'graphql-tag';
import { generateRandomName, sendGraphQLQuery } from './graphqlUtils';

dotenv.config();

test('UserAppointments Query Test', async ({ page }) => {
  const query = gql`
    query UserAppointments($input: UserListAppointmentInput) {
      items: userAppointments(input: $input) {
id
createdAt
updatedAt
name
appointmentDateAndTime
locationId
checkedIn
checkedInDateTime
medicalReportId
billId
imagingId
duration
patientId
clinicalProviderId
legalCaseId
appointmentStatusId
notes
recurringEventId
isFirstInstance
description
start
end
allDay
recurrence
location {
  id
  name
}
medicalReport {
  id
  name
}
bill {
  id
  name
}
imaging {
  id
  name
}
patient {
  id
  name
}
clinicalProvider {
  id
  name
}
legalCase {
  id
  name
}
appointmentStatus {
  id
  name
}





claimProcedures {
    id
    name
  }

caseProcedures {
    id
    name
  }
      }
      count: userCountAppointments(input: $input) {
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

test('UserCountAppointments Query Test', async ({ page }) => {
  const query = gql`
    query UserCountAppointments($input: UserListAppointmentInput) {
      count: userCountAppointments(input: $input) {
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

test('UserSelectAppointments Query Test', async ({ page }) => {
  const query = gql`
    query UserSelectAppointments($input: UserListAppointmentInput) {
      items: userSelectAppointments(input: $input) {
id
createdAt
updatedAt
name
appointmentDateAndTime
locationId
checkedIn
checkedInDateTime
medicalReportId
billId
imagingId
duration
patientId
clinicalProviderId
legalCaseId
appointmentStatusId
notes
recurringEventId
isFirstInstance
description
start
end
allDay
recurrence
location {
  id
  name
}
medicalReport {
  id
  name
}
bill {
  id
  name
}
imaging {
  id
  name
}
patient {
  id
  name
}
clinicalProvider {
  id
  name
}
legalCase {
  id
  name
}
appointmentStatus {
  id
  name
}





claimProcedures {
    id
    name
  }

caseProcedures {
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

test('UserAppointment Query Test', async ({ page }) => {
  const appointmentsQuery = gql`
    query UserAppointments {
      items: userAppointments {
        id
      }
    }
  `;

  // Send a GraphQL query to retrieve user accident types
  const graphqlUrl = process.env.GRAPHQL_URL || '';
  const url = new URL(graphqlUrl);
  const appointmentsResponse = await sendGraphQLQuery(url.href,appointmentsQuery);

  // Verify the response data
  const { data: { items: appointments }, errors: appointmentsErrors } = appointmentsResponse;
  expect(appointmentsErrors).toBeUndefined();
  expect(appointments).toBeDefined();
  expect(appointments.length).toBeGreaterThan(0);

  // Use the first accident type ID for the subsequent user accident type query
  const appointmentId = appointments[0].id;

  const query = gql`
    query UserAppointment($appointmentId: String!) {
      item: userAppointment(appointmentId: $appointmentId) {
id
createdAt
updatedAt
name
appointmentDateAndTime
locationId
checkedIn
checkedInDateTime
medicalReportId
billId
imagingId
duration
patientId
clinicalProviderId
legalCaseId
appointmentStatusId
notes
recurringEventId
isFirstInstance
description
start
end
allDay
recurrence
location {
  id
  name
}
medicalReport {
  id
  name
}
bill {
  id
  name
}
imaging {
  id
  name
}
patient {
  id
  name
}
clinicalProvider {
  id
  name
}
legalCase {
  id
  name
}
appointmentStatus {
  id
  name
}





claimProcedures {
    id
    name
  }

caseProcedures {
    id
    name
  }
      }
    }
  `;

  // Send a GraphQL query to retrieve the user accident type using the accident type ID
  const response = await sendGraphQLQuery(graphqlUrl, query, { appointmentId });

  // Verify the response data
  const { data, errors } = response;
  expect(errors).toBeUndefined();
  expect(data).toBeDefined();

  const { item } = data;
  expect(item).toBeDefined();
});


test('UserCreateAppointment Mutation Test', async ({ page, browser }) => {
  const createMutation = gql`
    mutation UserCreateAppointment($input: UserCreateAppointmentInput!) {
      created: userCreateAppointment(input: $input) {
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
    mutation UserUpdateAppointment($appointmentId: String!, $input: UserUpdateAppointmentInput!) {
      updated: userUpdateAppointment(appointmentId: $appointmentId, input: $input) {
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
  const updateResponse = await sendGraphQLQuery(graphqlUrl, updateMutation, { appointmentId: id, input: updateInput });

  // Verify the update response data
  const { data: updateData, errors: updateErrors } = updateResponse;
  expect(updateErrors).toBeUndefined();
  expect(updateData).toBeDefined();

  const { updated } = updateData;
  expect(updated).toBeDefined();
  expect(updated.name).toBe(updateInput.name);

  const deleteMutation = gql`
    mutation UserDeleteAppointment($appointmentId: String!) {
      deleted: userDeleteAppointment(appointmentId: $appointmentId) {
        id
        name
      }
    }
  `;

  // Send the mutation to delete the accident type
  const deleteResponse = await sendGraphQLQuery(graphqlUrl, deleteMutation, { appointmentId: id });

  // Verify the delete response data
  const { data: deleteData, errors: deleteErrors } = deleteResponse;
  expect(deleteErrors).toBeUndefined();
  expect(deleteData).toBeDefined();

  const { deleted } = deleteData;
  expect(deleted).toBeDefined();

  // Add more test cases for other mutations listed in the schema
});

