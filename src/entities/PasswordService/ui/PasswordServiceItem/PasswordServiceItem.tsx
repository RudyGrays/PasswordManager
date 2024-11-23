import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Copy, CopyCheck, Delete, Eye, EyeClosed } from "lucide-react";
import { FC, useState } from "react";
import { deletePassService } from "../../model/services/deletePassServiceThunk";
import { useAppDispatch } from "@/_app/providers/StoreProvider/ui/store";

interface PasswordServiceItemProps {
  service: string;
  password: string;
  id: string;
}

const PasswordServiceItem: FC<PasswordServiceItemProps> = ({
  service,
  password,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .then(() =>
        toast({
          title: "Текст успешно скопирован!",
        })
      )
      .catch((err) => {
        toast({
          title: "Ошибка при копировании текста!",
          description: err,
        });
      });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePassService(id)).unwrap();
      toast({
        title: "Успешно удалено!",
      });
    } catch (e: any) {
      toast({
        title: "Ошибка удаления, попробуйте ещё!",
      });
    }
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="border-b-2 px-2 border-primary py-2">
      <h3>
        {id}.{service}
      </h3>
      <div className="relative w-full  h-full flex items-center">
        <Input
          type={isVisible ? "text" : "password"}
          onChange={() => null}
          value={password}
        />
        <Button
          onClick={() => handleCopy(password)}
          variant="ghost"
          className="h-min absolute right-20 transition-all transform -translate-y-1/2 top-1/2 p-0 text-muted-foreground bg-transparent"
        >
          {copied ? <CopyCheck /> : <Copy />}
        </Button>

        <Button
          type="button"
          onClick={toggleVisibility}
          variant="ghost"
          className="h-min absolute right-10 transition-all transform -translate-y-1/2 top-1/2 p-0 text-muted-foreground bg-transparent"
          aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}
        >
          {isVisible ? (
            <span role="img" aria-hidden="true">
              <Eye />
            </span>
          ) : (
            <span role="img" aria-hidden="true">
              <EyeClosed />
            </span>
          )}
        </Button>
        <Button
          onClick={() => handleDelete()}
          type="button"
          variant="ghost"
          className="h-min absolute right-2 transition-all transform -translate-y-1/2 top-1/2 p-0 text-muted-foreground bg-transparent"
        >
          <Delete />
        </Button>
      </div>
    </div>
  );
};

export { PasswordServiceItem };
