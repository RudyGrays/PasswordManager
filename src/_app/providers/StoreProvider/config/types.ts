export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  rejectValue: T;
}

export interface ThunkExtraArg {}

import { PasswordServiceState } from "@/entities/PasswordService/model/types/types";

export interface StateSchema {
  passService: PasswordServiceState;
}
