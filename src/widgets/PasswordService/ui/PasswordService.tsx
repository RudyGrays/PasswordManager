"use client";
import { getPassServiceData } from "@/entities/PasswordService/model/selectors/selectors";
import { IPasswordServiceItem } from "@/entities/PasswordService/model/types/types";
import { PasswordServiceList } from "@/entities/PasswordService/ui/PasswordServiceList/PasswordServiceList";
import { PasswordServiceModal } from "@/entities/PasswordService/ui/PasswordServiceModal/ui/PasswordServiceModal";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const PasswordService = () => {
  const [serviceModal, setServiceModal] = useState(false);
  const [filteredItems, setFilteredItems] = useState<IPasswordServiceItem[]>(
    []
  );
  const items = useSelector(getPassServiceData.selectAll);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(1000, (value: string) => {
    if (value == "") return setFilteredItems([]);
    const filtered = items.filter((item) =>
      item.service.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered.toReversed());
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="w-[400px] max-h-[500px]  border-primary border-2 rounded p-5">
      <PasswordServiceModal isOpen={serviceModal} setIsOpen={setServiceModal} />
      <div>
        <div className="flex justify-between gap-4">
          <Input
            onChange={(e) => handleInput(e)}
            value={searchValue}
            type="search"
            className="border-primary"
            placeholder="Поиск..."
          />
          <Button onClick={() => setServiceModal(true)}>Добавить сервис</Button>
        </div>
        <PasswordServiceList searchItems={filteredItems} items={items} />
      </div>
    </div>
  );
};

export default PasswordService;
