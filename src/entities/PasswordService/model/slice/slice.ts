import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IPasswordServiceItem, PasswordServiceState } from "../types/types";
import { addPassService } from "../services/addPassServiceThunk";
import { deletePassService } from "../services/deletePassServiceThunk";

export const PasswordServiceAdapter = createEntityAdapter({
  selectId: (passwordService: IPasswordServiceItem) => passwordService.id,
});

const PasswordServiceSlice = createSlice({
  name: "PasswordServiceSlice",
  initialState: PasswordServiceAdapter.getInitialState<PasswordServiceState>({
    entities: {},
    ids: [],
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPassService.pending, (state, action) => {
        (state.loading = true), (state.error = undefined);
      })
      .addCase(addPassService.fulfilled, (state, action) => {
        (state.loading = false), (state.error = undefined);
        PasswordServiceAdapter.addOne(state, action.payload);
      })

      .addCase(deletePassService.pending, (state, action) => {
        (state.loading = true), (state.error = undefined);
      })
      .addCase(deletePassService.fulfilled, (state, action) => {
        (state.loading = false), (state.error = undefined);
        PasswordServiceAdapter.removeOne(state, action.payload);
      });
  },
});

export const { reducer: PassServiceReducer, actions: PassServiceActions } =
  PasswordServiceSlice;
