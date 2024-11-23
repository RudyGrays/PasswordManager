import { FC, useCallback, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { getPassServiceData } from "../../model/selectors/selectors";
import { PasswordServiceItem } from "../PasswordServiceItem/PasswordServiceItem";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { IPasswordServiceItem } from "../../model/types/types";

interface PasswordServiceListProps {
  searchItems: IPasswordServiceItem[];
  items: IPasswordServiceItem[];
}

const PasswordServiceList: FC<PasswordServiceListProps> = ({
  searchItems,
  items,
}) => {
  const resultItems = useMemo(() => items.toReversed(), [items]);
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    count: resultItems.length,
    estimateSize: useCallback(() => 77, []),
    overscan: 0,
  });

  return (
    <div ref={parentRef} className="max-h-[400px] overflow-auto">
      {!!searchItems.length ? (
        searchItems.map(({ id, password, service }) => {
          return (
            <PasswordServiceItem
              key={id}
              id={id}
              password={password}
              service={service}
            />
          );
        })
      ) : (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "340px",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: virtualRow.start,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
              }}
            >
              <PasswordServiceItem
                key={resultItems[virtualRow.index].id}
                id={resultItems[virtualRow.index].id}
                password={resultItems[virtualRow.index].password}
                service={resultItems[virtualRow.index].service}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { PasswordServiceList };
