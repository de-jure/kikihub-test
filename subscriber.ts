import ampqlib from 'amqplib';
import config from './config';

const lastSecReceived = new Map<string, number>();

(async () => {
  const connection = await ampqlib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(config.createMessageQueue);

  channel.prefetch(10000);

  channel.consume(
    config.createMessageQueue,
    (msg: any) => {
      const emoji = msg.content.toString();
      if (lastSecReceived.has(emoji)) {
        lastSecReceived.set(emoji, lastSecReceived.get(emoji)! + 1);
      } else {
        lastSecReceived.set(emoji, 1);
      }
      channel.ack(msg);
      // console.log(new Date().toISOString(), 'Received:', emoji);
    },
    { noAck: false }
  );

  setInterval(() => {
    console.clear();
    console.log(
      new Date().toISOString(),
      'Last second received emojis:\n',
      Array.from(lastSecReceived.entries())
        .map(([emoji, count]) => `${emoji}: ${count}`)
        .join('\n')
    );
    lastSecReceived.clear();
  }, 1000);
})();
