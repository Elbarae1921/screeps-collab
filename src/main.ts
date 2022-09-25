import {processTurn} from 'utils';

export const loop = () => {
  Promise.resolve("World").then(value => console.log(`Hello ${value}!`));
  processTurn();
}

// export const loop = () => {
//   console.log(true ? 'a' : 'b');
//   console.log(null ?? 'test');
// }
