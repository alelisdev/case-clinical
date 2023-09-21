const sdk = require('api')('@checkly-public-api/v1#skrcu6n4nalf040j5m');
sdk.auth('Bearer cu_e12901ce6fde4934b8ed79221055d4d1');
sdk.getV1Checks({
  limit: '99',
  page: '1',
  'x-checkly-account': '373b948b-7e63-45b0-840f-8d29a33c8ea9'
})
  .then(({ data }) => data.map(check => {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer cu_e12901ce6fde4934b8ed79221055d4d1',
        'x-checkly-account': '373b948b-7e63-45b0-840f-8d29a33c8ea9'
      }
    };
    
    fetch(`https://api.checklyhq.com/v1/checks/${check.id}`, options)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }))
  .catch(err => console.log(err));
