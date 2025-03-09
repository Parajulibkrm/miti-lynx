import _NepaliDate from "nepali-datetime";
export const NepaliDate = _NepaliDate as unknown as typeof _NepaliDate.default;
// Instance type for NepaliDate
export type NepaliDateType = InstanceType<typeof NepaliDate>;
