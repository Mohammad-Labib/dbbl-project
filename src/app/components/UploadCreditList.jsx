"use client";

import { useEffect, useState } from "react";

export default function UploadCreditList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/credit-card`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card) => (
        <div
          key={card._id}
          className="bg-white shadow-lg rounded-xl p-5 border"
        >
          <h2 className="text-xl font-bold">
            {card["Bank Name"]}
          </h2>

          <div className="mt-4">
            <p>Card Number</p>
            <p className="font-semibold">
              {card["Card Number"]}
            </p>

            <p className="mt-3">Expiry Date</p>
            <p className="font-semibold">
              {card["Expiry Date"]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}