const net = require('net');

const client = new net.Socket();

client.connect({
  host: 'localhost',
  port: 5222,
});

client.on('connect', () => {
  console.log('Client: connection established with server');

  console.log('---------client details -----------------');
  const address = client.address();
  const { port } = address;
  const { family } = address;
  const ipaddr = address.address;
  console.log(`Client is listening at port: ${port}`);
  console.log(`Client ip: ${ipaddr}`);
  console.log(`Client is IP4/IP6: ${family}`);

  const createRoomSpark = {
    id: 'some random ID',
    type: 'createRoom',
    data: {
      name: 'Nueva Sala',
      description: 'Sala para grupo 1',
      maxPlayers: 4,
      userNickname: 'K3v1n',
    },
  };

  const joinToRoomSpark = {
    id: 'some random ID',
    type: 'join',
    data: {
      roomId: 'lpEHpbDA',
      nickname: 'K3v1n 3',
    },
  };

  const messageSpark = {
    type: 'message',
    data: {
      message: 'Hola a todos',
    },
  };

  client.write(JSON.stringify(joinToRoomSpark));
  // client.write(JSON.stringify(messageSpark));
});

client.setEncoding('utf8');

client.on('data', (data) => {
  console.log('Data from server', JSON.parse(data));
});

// setTimeout(() => {
//   client.end();
// }, 5000);

// NOTE:--> all the events of the socket are applicable here..in client...

// -----------------creating client using net.connect instead of custom socket-------

// server creation using net.connect --->
// u can also => write the below code in seperate js file
// open new node instance => and run it...
