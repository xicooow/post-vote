import { ObjectId } from "mongodb";

export function objectIdToString<T extends { _id: ObjectId }>(model: T) {
  const { _id, ...rest } = model;
  return { ...rest, _id: _id.toString() };
}
