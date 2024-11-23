import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";
import { PasswordServiceForm } from "@/entities/PasswordService/ui/PasswordServiceForm/ui/PasswordServiceForm";

import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface PasswordServiceModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PasswordServiceModal: FC<PasswordServiceModalProps> = memo(
  ({ isOpen, setIsOpen }) => {
    const [canClose, setCanClose] = useState(false);

    const closeHandler = useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (isOpen) {
        setCanClose(false);
        timer = setTimeout(() => {
          setCanClose(true);
        }, 1000);
      }

      return () => clearTimeout(timer);
    }, [isOpen]);

    return (
      <Dialog open={isOpen} onOpenChange={canClose ? setIsOpen : () => null}>
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle>Добавить пароль для сервиса</DialogTitle>
            <DialogDescription>
              Форма создания и добавления пароля для сервиса.
            </DialogDescription>
          </VisuallyHidden>
          <PasswordServiceForm closeHandler={closeHandler} />
          <DialogClose />
        </DialogContent>
      </Dialog>
    );
  }
);

export { PasswordServiceModal };
