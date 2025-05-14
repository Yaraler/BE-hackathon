import { ObjectId } from 'mongodb';
export interface IRequirementsBrigade {
  _id: ObjectId;
  exercise: string;
  minimum?: number;
  maximum?: number;
  brigadeId: string;
}

export interface IBrigadeResponse {
  _id: ObjectId;
  name: string;
  description: string;
  image?: string;
  requirementsBrigadeIds: string[];
  requirements: IRequirementsBrigade[];
}
