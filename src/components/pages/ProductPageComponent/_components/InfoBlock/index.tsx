import HeartIcon from "@/src/components/ui/icons/HeartIcon";
import RootIcon from "@/src/components/ui/icons/RootIcon";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import s from "./InfoBlock.module.scss";

const InfoBlock = () => {
  const { id, price, discount, name } = useAppSelector((state) => state.product.data);
  const newPrice = +(price - (price * discount) / 100).toFixed(0);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s["price-block"]}>
          <div className={s.price}>
            {" "}
            {Number.isNaN(newPrice) ? newPrice : new Intl.NumberFormat("ru-RU").format(newPrice)} ₽
          </div>
          <div className={s["old-price"]}>
            {Number.isNaN(price) ? price : new Intl.NumberFormat("ru-RU").format(price)} ₽
          </div>
        </div>
        <div className={s["actions-block"]}>
          <HeartIcon productId={id} />
          <DefaultLink aria-label="Ссылка на оригинальную страницу" href="/">
            <RootIcon name="link" />
          </DefaultLink>
        </div>
      </div>
      <div className={s.name}>{name}</div>
    </div>
  );
};

export default InfoBlock;
