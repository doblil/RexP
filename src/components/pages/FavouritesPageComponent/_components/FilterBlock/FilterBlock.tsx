/* eslint-disable react/jsx-no-bind */
import Image from "next/image";

import BasketAndFavoriteFilter from "@/src/components/layout/_components/BasketAndFavoriteFilter";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { useFilter } from "@/src/hooks/useFilter";
import { addFiltersToFavoritesPage } from "@/src/store/slices/filter";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import type { FilterCartsType } from "@/src/types/Filter/filter.types";

export const FilterBlock = () => {
  const dispatch = useAppDispatch();

  const { isOpen, toggleOpen } = useFilter();

  const filters = useAppSelector((state) => state.filter.favoritesPage);

  function changeFilters(newFilters: Partial<FilterCartsType>) {
    dispatch(addFiltersToFavoritesPage(newFilters));
  }

  function applyFilters() {
    dispatch(getFavoritesThunk(filters));
  }

  return (
    <div className="flex items-center justify-between mb-3">
      <div />

      <button onClick={toggleOpen}>
        <Image src="/images/icons/filters.svg" width={25} height={25} alt="filters icon" />
      </button>

      {isOpen && (
        <BasketAndFavoriteFilter
          applyFilters={applyFilters}
          filters={filters}
          changeFilters={changeFilters}
          toggleOpen={toggleOpen}
        />
      )}
    </div>
  );
};
