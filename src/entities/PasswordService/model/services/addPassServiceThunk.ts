import { ThunkConfig } from "@/_app/providers/StoreProvider/config/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PassServiceDTO,
  PasswordServiceError,
  IPasswordServiceItem,
} from "../types/types";
import { Url } from "next/dist/shared/lib/router/router";
import { fakeRequest, passwordGenerator } from "@/shared/lib/utils";

export const addPassService = createAsyncThunk<
  IPasswordServiceItem,
  PassServiceDTO,
  { rejectValue: string }
>("addPassService", async (formData, { rejectWithValue }) => {
  try {
    const item = await fakeRequest(formData);

    return item;
  } catch (e: any) {
    return rejectWithValue(e.item);
  }
});
