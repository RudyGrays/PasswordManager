"use client";
import { FC, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  Form,
  FormLabel,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { passwordGenerator } from "@/shared/lib/utils";

import { useAppDispatch } from "@/_app/providers/StoreProvider/ui/store";
import { formSchema } from "../model/config/formInstanceZod";
import { addPassService } from "@/entities/PasswordService/model/services/addPassServiceThunk";
import { useToast } from "@/shared/hooks/use-toast";

interface PasswordServiceFormProps {
  closeHandler: () => void;
}

const containsAny = (str: string, chars: string) => {
  return [...str].some((char) => chars.includes(char));
};

const PasswordServiceForm: FC<PasswordServiceFormProps> = ({
  closeHandler,
}) => {
  const [isCustom, setIsCustom] = useState(false);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const schema = formSchema(isCustom);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      customChars: "",
      service: "",
      caseOption: "mixed",
      useLetters: true,
      useNumbers: true,
      useSpecialChars: true,
      passLength: "10",
    },
  });

  const { reset } = form;
  useEffect(() => {
    reset();
  }, [isCustom, reset]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { service } = values;
    const password = passwordGenerator(values);

    try {
      await dispatch(addPassService({ password, service })).unwrap();
      toast({
        title: "Пароль успешно добавлен",
        description: "Пароль был успешно добавлен в ваш сервис!",
      });
      closeHandler();
    } catch (e: any) {
      toast({
        title: "Ошибка добавления пароля",
        description: e?.item || "Произошла ошибка при добавлении пароля.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h1 className="text-xl text-center">Добавление пароля для сервиса</h1>
        <FormField
          name="service"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Название сервиса</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Введите название сервиса..." />
              </FormControl>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />
        {isCustom && (
          <FormField
            name="customChars"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Символы для пароля</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="abcd@!%$#&" type="text" />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        )}

        <FormField
          name="passLength"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Длина пароля</FormLabel>
              <FormControl>
                <Input {...field} placeholder="1, 2, 3, ..." type="text" />
              </FormControl>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {!isCustom && (
          <div className="mb-4">
            <FormField
              control={form.control}
              name="caseOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регистр</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите допустимый регистр" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lower">lower</SelectItem>
                      <SelectItem value="upper">upper</SelectItem>
                      <SelectItem value="mixed">mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="flex-col flex gap-3">
          {!isCustom && (
            <FormField
              control={form.control}
              name="useNumbers"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div className="flex items-center gap-3 h-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Использовать числа</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
          {!isCustom && (
            <FormField
              control={form.control}
              name="useLetters"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 h-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Использовать буквы</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
          {!isCustom && (
            <FormField
              control={form.control}
              name="useSpecialChars"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 h-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Использовать специальные символы</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center gap-5 mt-5">
          <Button type="submit" className="text-2xl w-[100px] ">
            +
          </Button>
          <Button onClick={() => setIsCustom((prev) => !prev)}>
            {!isCustom
              ? "Использовать мой набор"
              : "Сгенерировать по полям формы"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { PasswordServiceForm };
