import { CeramicDoc } from "../typings";
export declare type Collections = {
    unsorted: string[];
    public: string[];
    private: string[];
    trash: string[];
    [key: string]: string[];
};
export declare type CollectionsDoc = CeramicDoc<Collections>;
