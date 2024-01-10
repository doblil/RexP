import { useEffect } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

import { MAX_PRODUCTS_IN_HISTORY, PRODUCTS_IN_HISTORY_LS_KEY } from "@/src/constants";
import useClientSide from "@/src/hooks/useClientSide";

import AccordionBlock from "./_components/AccordionBlock";
import AddButton from "./_components/AddButton";
import InfoBlock from "./_components/InfoBlock";
import SizesBlock from "./_components/SizesBlock";
import SliderBlock from "./_components/SliderBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./ProductPageComponent.module.scss";

const ProductPageComponent = () => {
  const router = useRouter();
  const isClient = useClientSide();
  const [historyValue, setHistoryValue] = useLocalStorage({
    key: PRODUCTS_IN_HISTORY_LS_KEY,
    defaultValue: "",
  });

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        if (!historyValue) {
          setHistoryValue(JSON.stringify([router.query.id]));
          return;
        }
        const productsId = JSON.parse(historyValue!) as string[];

        if (productsId.filter((id) => id !== router.query.id).length === MAX_PRODUCTS_IN_HISTORY) {
          productsId.pop();
        }
        const newProductsId = [router.query.id, ...productsId.filter((id) => id !== router.query.id)];
        if (JSON.stringify(newProductsId) !== historyValue) {
          setHistoryValue(JSON.stringify(newProductsId));
        }
      }, 150);
    }
  }, [historyValue, isClient, router.query.id]);

  return (
    <MainContainer className={s.wrapper}>
      <SliderBlock />
      <InfoBlock />
      <SizesBlock />
      <AccordionBlock />
      <AddButton />
    </MainContainer>
  );
};

export default ProductPageComponent;
