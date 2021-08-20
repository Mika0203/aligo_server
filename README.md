## Aligo server

https://smartsms.aligo.in/ 


## Setting

1. Need to setting config.js file

```

const server = '192.168.0.6';

module.exports = {
    server,
    serverURL : `https://${server}`,
    port : 2000,
    aligoAPI : 'aligo api',
    aligoUserId : 'userId',
    aligoSender : 'phoneNumber'
}

```


2. If you need TLS (https)

Make directory "keys" and input your pem(private, public) files.

Next in server.js, set options and change require(http) to require(https)

```

const options = {
    key : fs.readFileSync('./keys/private.pem'),
    cert : fs.readFileSync('./keys/public.pem'),
}


const server = require('http').createServer(app);

=>

const server = require('https').createServer(options, app);

```


3. Start server

```
node server.js
```

## Send aligo msg from another server

```
const send = async (obj) => {

  // obj = {
  //  receiver : "01027864280",
  //  msg : '알리고 테스트 메세지 입니다'
  // }


  const form = new FormData();
  const formHeaders = form.getHeaders();
  for (let key in obj) {
    form.append(key, obj[key]);
  }
  const res = await axios.post(`${config.serverURL}:${config.aligoServerPort}`, form, {
    headers: {
      ...formHeaders
    }
  });
  return res.data;
}
```
