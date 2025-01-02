# Pub/Sub Technical Task for KikiHub (Yurii Plets)

- `yarn` – Installs all dependencies.
- `yarn deps` – Starts RabbitMQ docker container
- `yarn sub` – Starts the subscriber service (or whatever it listens to).

And as many `yarn pub` commands as you need.

To run 5 parallel `yarn pub` processes, use the following command in your terminal:

```bash
yarn pub & yarn pub & yarn pub & yarn pub & yarn pub
```

To stop all of the `yarn pub` processes at once, you can use the kill command with the process IDs (PIDs).

First, get the PIDs of the running processes:

```bash
ps aux | grep 'yarn pub'
```

To stop the processes, use the `kill` command followed by the PIDs. For example, if the PIDs are 1234, 5678, 91011, 121314, and 151617, run:

```bash
kill 1234 5678 91011 121314 151617
```
