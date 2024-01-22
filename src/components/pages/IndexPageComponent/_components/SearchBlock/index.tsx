/* eslint-disable react/jsx-no-bind */
import { useRef } from "react";

import Image from "next/image";

import MainFilter from "@/src/components/layout/_components/MainFilter";
import { useAppDispatch } from "@/src/hooks/redux-hooks/redux-hooks";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import type { FilterType } from "@/src/types/Filter/filter.types";

import styles from "./styles.module.scss";

interface Props {
  toggleOpen: () => void;
  filters: FilterType;
  changeFilters: (values: Partial<FilterType>) => void;
  isOpen: boolean;
}

export const SearhBlock = ({ changeFilters, filters, toggleOpen, isOpen }: Props) => {
  const dispatch = useAppDispatch();

  const timeout = useRef<NodeJS.Timeout | null>(null);

  function handleInput(event: React.ChangeEvent) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      const { value } = event.target as HTMLInputElement;

      changeFilters({ name: value });
      dispatch(getProductsThunk({ filters: { ...filters, name: value } }));
    }, 300);
  }

  function applyFilters() {
    dispatch(getProductsThunk({ filters }));
    toggleOpen();
  }

  return (
    <div className={styles.wrapper}>
      <button>
        <Image src="/images/icons/search.svg" width={21} height={21} alt="search icon" />
      </button>
      <input onChange={handleInput} type="text" placeholder="Поиск по названию" className={styles.input} />
      <button onClick={toggleOpen}>
        <Image src="/images/icons/filters.svg" width={25} height={25} alt="filters icon" />
      </button>
      {isOpen && (
        <MainFilter
          applyFilters={applyFilters}
          filters={filters}
          changeFilters={changeFilters}
          toggleOpen={toggleOpen}
        />
      )}
    </div>
  );
};