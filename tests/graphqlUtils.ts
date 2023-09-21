export function generateRandomName(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nameLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14
  
    let randomName = '';
    for (let i = 0; i < nameLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters.charAt(randomIndex);
    }
  
    return randomName;
  }

  export async function sendGraphQLQuery(endpoint, query, variables = {}) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsImlhdCI6MTY4MTMyODA0Nn0.8js7IIKFroO4W_ELiLVDHYjHlMlQI2I4G_n1Po5VO7A"
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending GraphQL query:', error);
      throw error;
    }
  }