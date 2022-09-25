import { injectMethods } from 'declarations';
import {normalizeError, processTurn} from 'utils';

injectMethods();

export const loop = normalizeError(() => {
  // Bot code here
  processTurn();
});
