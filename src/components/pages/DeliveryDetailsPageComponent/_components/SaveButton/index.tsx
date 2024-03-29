import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { ACTIVE_ADDRESSES_LS_KEY, ADDRESSES_LS_KEY, MAX_ADDRESSES } from "@/src/constants";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { generateId } from "@/src/utils/generateId";

import s from "./SaveButton.module.scss";

const SaveButton = () => {
  const activeFilter = useAppSelector((state) => state.filters.deliveryDetailsPage.activeFilter);
  const [addressesValue, setAddresses] = useLocalStorage({ key: ADDRESSES_LS_KEY, defaultValue: "" });
  const [addressActiveValue, setAddressesActive] = useLocalStorage({ key: ACTIVE_ADDRESSES_LS_KEY, defaultValue: "" });
  const delivery = useAppSelector((state) => state.delivery);
  const id = generateId();
  const router = useRouter();

  const onHandleClick = () => {
    if (
      Object.keys(delivery)
        .filter((key) =>
          activeFilter === "Пункт выдачи заказа" ? !["street", "house", "flat"].includes(key) : key !== "pvzAddress"
        )
        .some((value) => !delivery[value])
    ) {
      toast.error("Заполните все поля");
      return;
    }

    if (!addressesValue) {
      setAddresses(JSON.stringify([{ ...delivery, id, deliveryType: activeFilter }]));
      setAddressesActive(id);
      return;
    }

    const addresses = JSON.parse(addressesValue);
    const length = addresses.length ?? 0;

    if (!length) {
      return;
    }

    if (length >= MAX_ADDRESSES) {
      toast.error(`Максимальное количество адресов: ${MAX_ADDRESSES}`);
    } else {
      let newAddresses = addresses;
      if (router.query.id) {
        newAddresses = addresses.filter((address) => address.id !== router.query.id);
      }
      
      setAddresses(JSON.stringify([...newAddresses, { ...delivery, id, deliveryType: activeFilter }]));
    }
  };

  return (
    <Button className={s.button} onClick={onHandleClick}>
      Сохранить данные доставки
    </Button>
  );
};

export default SaveButton;
