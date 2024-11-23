import { StateSchema } from "@/_app/providers/StoreProvider/config/StateSchema";
import { PasswordServiceAdapter } from "../slice/slice";

export const getPassServiceData =
  PasswordServiceAdapter.getSelectors<StateSchema>(
    (state) => state.passService || PasswordServiceAdapter.getInitialState()
  );

export const getPassServiceError = (state: StateSchema) =>
  state.passService?.error || "";

export const getPassServiceLoading = (state: StateSchema) =>
  state.passService?.loading || false;
