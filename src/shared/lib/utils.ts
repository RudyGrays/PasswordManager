import {
  PassServiceDTO,
  PasswordServiceError,
  IPasswordServiceItem,
} from "@/entities/PasswordService/model/types/types";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const isBrowser = typeof window !== "undefined";

let id = 1;

let lsId = isBrowser ? localStorage.getItem("id") : 0;

if (lsId) {
  id = +lsId + 1;
}

export const fakeRequest = async (PassService: PassServiceDTO) => {
  const { password, service } = PassService;
  return new Promise<IPasswordServiceItem>((res, rej) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 2) + 1 === 1) {
        res({
          id: String(id),
          password,
          service,
        });
      } else {
        rej(PasswordServiceError.SERVER_ERROR);
      }
    }, 1000);
  });
};

export const fakeRequestOnDelete = async (itemId: string) => {
  return new Promise<string>((res, rej) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 2) + 1 === 1) {
        res(itemId);
      } else {
        rej(PasswordServiceError.SERVER_ERROR);
      }
    }, 1000);
  });
};

interface PasswordFormData {
  customChars?: string;
  service: string;
  useLetters?: boolean;
  useSpecialChars?: boolean;
  useNumbers?: boolean;
  caseOption?: "lower" | "upper" | "mixed";
  passLength: string;
}
export const passwordGenerator = ({
  passLength,
  customChars,
  useSpecialChars,
  useNumbers,
  useLetters,
  caseOption,
}: PasswordFormData) => {
  const initialLetters = "abcdefghijklmnopqrstuvwxyz";
  const initialSpecialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  const numbers = "0123456789";

  let availableChars = "";

  if (!customChars) {
    if (useLetters) {
      if (caseOption === "lower") {
        availableChars += initialLetters;
      } else if (caseOption === "upper") {
        availableChars += initialLetters.toUpperCase();
      } else if (caseOption === "mixed") {
        availableChars += initialLetters + initialLetters.toUpperCase();
      }
    }
    if (useNumbers) {
      availableChars += numbers;
    }

    if (useSpecialChars) {
      availableChars += initialSpecialChars;
    }
  }

  if (customChars) {
    availableChars += customChars;
  }

  if (!availableChars.length) {
    throw new Error("Набор символов пуст. Проверьте настройки генератора.");
  }

  const passwordLength = Number(passLength);
  if (isNaN(passwordLength) || passwordLength <= 0) {
    throw new Error("Длина пароля должна быть положительным числом.");
  }

  let result = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    result += availableChars[randomIndex];
  }

  return result;
};
