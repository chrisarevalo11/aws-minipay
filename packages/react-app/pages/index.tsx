import PrimaryButton from "@/components/Button";
import Image from "next/image";
import { useWeb3 } from "@/contexts/useWeb3";
import { useEffect, useState } from "react";

const FRUITS = [
  { name: "Apple", price: "0.1", image: "/images/apple.jpg" },
  { name: "Banana", price: "0.2", image: "/images/banana.jpg" },
  { name: "Orange", price: "0.3", image: "/images/orange.jpg" },
];

const FARMER_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";

export default function FruitMarketplace() {
  const { address, sendCUSD } = useWeb3();
  const [selectedFruit, setSelectedFruit] = useState<
    (typeof FRUITS)[number] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedFruit(FRUITS[0]); // Select the first fruit by default
  }, []);

  async function buyFruit() {
    if (!selectedFruit || !address) return;

    setLoading(true);
    try {
      await sendCUSD(FARMER_ADDRESS, selectedFruit.price);
      // Handle the transaction success
    } catch (error) {
      console.log(error);
      // Handle the transaction failure
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Welcome to the Fruit Marketplace!
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mt-7">
        {FRUITS.map((fruit) => (
          <div
            key={fruit.name}
            className={`p-2 border-[3px] border-colors-secondary rounded-xl cursor-pointer ${
              selectedFruit?.name === fruit.name ? "border-colors-primary" : ""
            }`}
            onClick={() => setSelectedFruit(fruit)}
          >
            <Image
              src={fruit.image}
              alt={fruit.name}
              width={200}
              height={200}
              className="w-20 h-20 object-cover"
            />
            <div className="text-center">{fruit.name}</div>
            <div className="text-center font-bold">{fruit.price} cUSD</div>
          </div>
        ))}
      </div>

      <div className="w-full px-3 mt-7">
        <PrimaryButton
          loading={loading}
          onClick={buyFruit}
          title={`Buy ${selectedFruit?.name} for ${selectedFruit?.price} cUSD`}
          widthFull
        />
      </div>
    </div>
  );
}
