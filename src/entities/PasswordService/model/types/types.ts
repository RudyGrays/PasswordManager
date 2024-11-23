import { Url } from "next/dist/shared/lib/router/router";

export interface IPasswordServiceItem {
  id: string;
  service: string;
  password: string;
}

type EntityId = IPasswordServiceItem["id"];

export interface PasswordServiceState {
  entities: Record<EntityId, IPasswordServiceItem>;
  ids: EntityId[];
  loading?: boolean;
  error?: PasswordServiceError;
}

export const enum PasswordServiceError {
  SERVER_ERROR = "Ошибка на стороне сервера!",
}

export interface PassServiceDTO {
  password: string;
  service: string;
}
