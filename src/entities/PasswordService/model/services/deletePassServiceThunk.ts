import { ThunkConfig } from "@/_app/providers/StoreProvider/config/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PassServiceDTO,
  PasswordServiceError,
  IPasswordServiceItem,
} from "../types/types";

import {
  fakeRequest,
  fakeRequestOnDelete,
  passwordGenerator,
} from "@/shared/lib/utils";

export const deletePassService = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deletePassService", async (itemId, { rejectWithValue }) => {
  try {
    console.log(itemId);
    const item = await fakeRequestOnDelete(itemId);
    console.log(itemId);
    return item;
  } catch (e: any) {
    return rejectWithValue(e.item);
  }
});
