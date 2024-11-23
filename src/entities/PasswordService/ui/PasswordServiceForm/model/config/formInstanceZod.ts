import {
  initialLetters,
  initialSpecialChars,
  numbers,
} from "@/shared/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const containsAny = (str: string, chars: string) => {
  return [...str].some((char) => chars.includes(char));
};

export const formSchema = (isCustom: boolean) =>
  z.object({
    customChars: isCustom
      ? z
          .string()
          .min(3)
          .max(18)
          .refine((value) => {
            if (value) {
              return containsAny(value, initialLetters);
            }
            return true;
          }, "Пароль должен содержать хотя бы одну букву.")
          .refine((value) => {
            if (value) {
              return containsAny(value, numbers);
            }
            return true;
          }, "Пароль должен содержать хотя бы одну цифру.")
          .refine((value) => {
            if (value) {
              return containsAny(value, initialSpecialChars);
            }
            return true;
          }, "Пароль должен содержать хотя бы один спецсимвол.")
      : z.string().optional(),

    service: z.string().min(1),
    useLetters: z.boolean().optional(),
    useSpecialChars: z.boolean().optional(),
    useNumbers: z.boolean().optional(),
    caseOption: z
      .union([z.literal("lower"), z.literal("upper"), z.literal("mixed")])
      .optional(),
    passLength: z.string().regex(/^\d+$/, "Длина пароля должна быть числом"),
  });
