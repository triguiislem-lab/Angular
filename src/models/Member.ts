
import { Pub } from './Pub';

export interface Member {
  id: string;
  cin: string;
  nom: string;
  type: string;
  createDate: string;
  tabPub:Pub[];
}
