import RootIcon from "@/src/components/ui/icons/RootIcon";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import RootTabs from "@/src/components/ui/RootTabs";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.status.data);

  const onHandleChange = (value: string) => dispatch(setActiveFilter({ value, filterName: "myOrdersPage" }));

  return (
    <>
      <div className={s.header}>
        <DefaultLink href="/profile" className={s.link} aria-label="Назад">
          <RootIcon name="arrowLeft" />
        </DefaultLink>
        <h1 className={s.title}>Мои заказы</h1>
      </div>
      <div className={s.wrapper}>
        <div className={s.tabs}>
          <RootTabs tabsList={status.map(({ name }) => name)} onSelectionChange={onHandleChange} />
        </div>
      </div>
    </>
  );
};

export default TabsBlock;
