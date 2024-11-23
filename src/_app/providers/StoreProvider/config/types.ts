export interface ThunkConfig<T> {
  rejectValue: T;
}

import { PasswordServiceState } from "@/entities/PasswordService/model/types/types";

export interface StateSchema {
  passService: PasswordServiceState;
}
