import { useEffect, useState } from "react";

import clsx from "clsx";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import MainContainer from "@/src/components/ui/MainContainer";
import RootButton from "@/src/components/ui/RootButton";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { switchMainFilterOpenState } from "@/src/store/slices/mainFilter";

import { ApplyButton } from "./_components/ApplyButton";
import BrandField from "./_components/BrandField";
import ColorField from "./_components/ColorField";
import SizeField from "./_components/SizeField";
import SliderField from "./_components/SliderField";

import s from "./MainFilter.module.scss";

const MainFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const isOpen = useAppSelector((state) => state.mainFilter.isOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onHandleClick = () => {
    if (selectedFilter) {
      setSelectedFilter("");
      return;
    }

    dispatch(switchMainFilterOpenState());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <MainContainer className={s.wrapper}>
      <div className={s.header}>
        <RootButton className={s.link} aria-label="Назад" onClick={onHandleClick}>
          <RootIcon name="arrowLeft" />
        </RootButton>
        <h1 className={s.title}>Фильтры</h1>
      </div>
      <div className={s.filters}>
        <RootButton className={s.item} onClick={() => setSelectedFilter("color")}>
          <div className={s.name}>Цвет</div>
          <div className={s.sort}>Все {">"}</div>
        </RootButton>
        <RootButton className={s.item} onClick={() => setSelectedFilter("size")}>
          <div className={s.name}>Размер</div>
          <div className={s.sort}>Все {">"}</div>
        </RootButton>
        <RootButton className={s.item} onClick={() => setSelectedFilter("brand")}>
          <div className={s.name}>Бренд</div>
          <div className={s.sort}>Все {">"}</div>
        </RootButton>
        <div className={clsx(s.subFilter, !!selectedFilter && s.active)}>
          {selectedFilter === "color" && <ColorField />}
          {selectedFilter === "size" && <SizeField />}
          {selectedFilter === "brand" && <BrandField />}
        </div>
        <SliderField />
      </div>
      <ApplyButton />
    </MainContainer>
  );
};

export default MainFilter;
