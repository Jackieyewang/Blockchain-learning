import { IDX } from '@ceramicstudio/idx';
import { BasicProfile } from '../models';
export declare function getBasicProfileDocContent(idx: IDX, did?: string): Promise<BasicProfile | null>;
export declare function setBasicProfileDocContent(idx: IDX, basicProfile: BasicProfile): Promise<string>;
