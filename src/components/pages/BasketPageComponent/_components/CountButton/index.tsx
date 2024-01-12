import { useState } from "react";

import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { toast } from "sonner";

import { decreaseCart } from "@/src/utils/api/decreaseCart";
import { increaseCart } from "@/src/utils/api/increaseCart";

import s from "./CountButton.module.scss";

interface CountButtonProps {
  id: number;
  quantity: number;
}

const CountButton: React.FC<CountButtonProps> = ({ id, quantity }) => {
  const [quantityValue, setQuantityValue] = useState(quantity);

  const onHandleClick = (action: "decrement" | "increment") => {
    if (action === "increment") {
      increaseCart(id)
        .then(() => {
          setQuantityValue(quantityValue + 1);
        })
        .catch(({ response: { data } }) => {
          toast.error(data.message);
        });
    }

    if (action === "decrement" && quantityValue > 1) {
      decreaseCart(id).then(() => {
        setQuantityValue(quantityValue - 1);
      });
    }
  };

  return (
    <div className={s.wrapper}>
      <Button
        disabled={+quantityValue === 1}
        className={clsx(s.button, +quantityValue === 1 && s.disabled)}
        onClick={() => onHandleClick("decrement")}
      >
        -
      </Button>
      <div className={s.count}>{quantityValue}</div>
      <Button className={s.button} onClick={() => onHandleClick("increment")}>
        +
      </Button>
    </div>
  );
};

export default CountButton;
