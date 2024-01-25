/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";

import { Button, Tabs, Tab } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import RootButton from "@/src/components/ui/RootButton";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { getCartsThunk } from "@/src/store/slices/getCarts/getCarts/getCarts";
import { getDeliveryThunk } from "@/src/store/slices/getDelivery/getDelivery/getDelivery";
import { wrapper } from "@/src/store/store";

const GocheckoutPage = () => {
  const carts = useAppSelector((state) => state.carts.data);

  const deliveryCarts = useAppSelector((state) => state.deliveryCarts.data);

  const router = useRouter();

  const [selectedCartsInfo, setSelectedCartsInfo] = useState<string | undefined>(undefined);

  useEffect(() => {
    const data = localStorage.getItem("selectedCartsInfo");

    if (!data) {
      return;
    }

    setSelectedCartsInfo(data);
  }, []);

  if (!selectedCartsInfo) {
    return null;
  }

  const { selectedCarts, totalPrice, totalPriceWithDiscount } = JSON.parse(selectedCartsInfo) as {
    selectedCarts: string[];
    totalPrice: number;
    totalPriceWithDiscount: number;
  };

  const neededCarts = carts.filter(({ id }) => selectedCarts.includes(String(id)));

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 21);
  const formattedDate = currentDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

  const findMainDelivery = deliveryCarts.find(({ isMain }) => isMain);

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="description" />
        <style />
      </Head>
      <div className="relative">
        <div className="fixed top-0 left-0 w-full z-10 flex justify-between items-center p-4 bg-white">
          <RootButton onClick={() => router.back()} aria-label="Назад">
            <RootIcon name="arrowLeft" />
          </RootButton>
          <p className="text-lg font-bold">Оформление заказа</p>
          <div />
        </div>
        <div className="px-4 pt-12 flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold mb-2">Способ получения</h2>
            <Tabs
              fullWidth
              classNames={{
                tabList: "w-full relative flex justify-between px-0",
                tab: "rounded-2xl px-0",
                tabContent: "group-data-[selected=true]:text-white",
              }}
              aria-label="Options"
            >
              <Tab className="text-base" key="punkt" title={<div>Пункт выдачи заказа</div>} />
              <Tab className="text-base" key="kuryer" title={<div>Курьером</div>} />
            </Tabs>
          </div>
          <div className="p-6 rounded-2xl bg-[#EEE] flex flex-col gap-4">
            <div className="border-b border-solid border-[rgba(142, 142, 142, 0.40)] pb-3 flex items-center justify-between">
              <h2 className="text-base font-medium">Данные доставки</h2>
              <button>
                <Image src="images/icons/pencil.svg" width={16} height={16} alt="Редактировать" />
              </button>
            </div>
            {!!findMainDelivery && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold">Адрес доставки</p>
                  <span className="text-[#535353]">{findMainDelivery.address}</span>
                  <span className="text-sm text-[#535353]">Срок хранения товара - 7 дней</span>
                  <span className="text-sm text-[#535353]">Вы можете продлить хранение ещё на 3 дня</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Получатель</p>
                  <span className="text-[#535353]">
                    {findMainDelivery.firstName} {findMainDelivery.lastName} {findMainDelivery.patronymic}
                  </span>
                  <span className="text-[#535353]">
                    {findMainDelivery.number.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5")}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 rounded-2xl bg-[#EEE] flex flex-col gap-4">
            <h2 className="border-b border-solid border-[rgba(142, 142, 142, 0.40)] pb-3 font-medium">
              Информация о заказе
            </h2>
            <p className="text-sm">
              <span className="text-sm font-semibold">Ожидаемая дата доставки</span>: {formattedDate}
            </p>
            <p className="text-sm font-semibold">
              {neededCarts.length} {neededCarts.length === 1 ? "товар" : "товара"} в заказе
            </p>
            <div className="flex flex-col gap-2">
              {neededCarts.map(({ id, product, productSize }) => (
                <div className="flex gap-4 bg-white p-3 rounded-xl" key={id}>
                  {product.images && product.images[0] && (
                    <Image
                      width={100}
                      height={70}
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${product.images[0].name}`}
                      alt={product.name}
                    />
                  )}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs">{product.name}</span>
                      <span className="text-[#8E8E8E] text-xs">размер: {productSize.size.name}</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {new Intl.NumberFormat("ru-RU").format(productSize.price)} ₽
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#EEE]">
            <p>Промокод</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#EEE] flex-col gap-3 flex">
            <div className="border-b border-solid border-[rgba(142, 142, 142, 0.40)] pb-3 flex justify-between items-center">
              <span className="font-semibold">Ваш заказ</span>
              <span className="text-[#535353]">
                {selectedCarts.length} {selectedCarts.length > 1 ? "товара" : "товар"}
              </span>
            </div>
            <div className="pb-3 flex justify-between items-center">
              <span className="font-semibold">Товары</span>
              <span className="text-[#535353]">{new Intl.NumberFormat("ru-RU").format(totalPrice)} ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Скидка</span>
                <span className="text-[#007AFF]">Подробнее</span>
              </div>
              <span className="text-[#D50000]">
                -{new Intl.NumberFormat("ru-RU").format(totalPrice - totalPriceWithDiscount)} ₽
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-solid border-[rgba(142, 142, 142, 0.40)]">
              <span className="font-semibold">Стоимость доставки</span>
              <span className="text-[#03A400]">Бесплатно</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Итого</span>
              <span className="text-[#535353] text-lg">
                {new Intl.NumberFormat("ru-RU").format(totalPriceWithDiscount)} ₽
              </span>
            </div>
            <Button className="w-full p-4 bg-black rounded-xl text-white text-base">Оплатить онлайн</Button>
            <p className="text-xs text-[rgba(83, 83, 83, 0.60)]">
              Нажимая на кнопку, вы соглашаетесь с Условиями обработки персональных данных, а также с Условиями продажи
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([dispatch(getCartsThunk({})), dispatch(getDeliveryThunk())]);

  return {
    props: {},
  };
});

export default GocheckoutPage;
