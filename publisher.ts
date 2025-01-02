import amqplib from 'amqplib';

import config, { emojis } from './config';

function sendRandomEmoji(channel: amqplib.Channel) {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  channel.sendToQueue(config.createMessageQueue, Buffer.from(emoji));
  // console.log(new Date().toISOString(), 'Published:', emoji);
}

let sentCounter = 0;
(async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(config.createMessageQueue);

  setInterval(async () => {
    for (let i = 0; i < config.messagesPerSecond; i++) {
      sendRandomEmoji(channel);
    }
    sentCounter += config.messagesPerSecond;
    if (sentCounter % 100000 === 0) {
      console.log(`PID ${process.pid}:`, sentCounter, 'messages sent');
    }
  }, 1000);
})();
