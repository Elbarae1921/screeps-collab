import {processTurn} from 'utils';

export const loop = () => {
  console.log('Hello World!');
}

export async function x() {
  await (async () => console.log("a"));
  await (async () => console.log("b"));
  await (async () => console.log("c"));
  await Promise.resolve(12);
  console.log("test");
}

Promise.resolve(4).then(console.log).finally(() => {});

processTurn();
