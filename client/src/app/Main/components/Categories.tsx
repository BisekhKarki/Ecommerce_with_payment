import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const filter = [
  {
    icon: <Smartphone />,
    name: "Phones",
  },
  {
    icon: <Laptop />,
    name: "Computers",
  },
  {
    icon: <Watch />,
    name: "Watch",
  },
  {
    icon: <Camera />,
    name: "Camera",
  },
  {
    icon: <Headphones />,
    name: "HeadPhones",
  },
  {
    icon: <Gamepad2 />,
    name: "Gaming",
  },
];

const Categories = () => {
  const [selectCategory, setSelectCategory] = useState<String | null>("");
  console.log(selectCategory);
  const router = useRouter();

  return (
    <div className="p-12">
      <div className="flex items-center gap-3 ">
        <div className="w-4 bg-red-500 h-12 rounded-sm" />
        <div>
          <p className="text-red-700 font-semibold">Categories</p>
        </div>
      </div>
      <h1 className="text-4xl mt-2">Browser by collection</h1>
      <div className="flex justify-between mt-10">
        {filter.map((filters, index) => (
          <div
            onClick={() => {
              setSelectCategory(filters.name);
              router.push(`/Category/${filters.name}`);
            }}
            key={index}
            className="p-20 flex flex-col  items-center gap-2 border border-gray-500 shadow hover:bg-red-600 cursor-pointer hover:text-white"
          >
            <p className="text-4xl">{filters.icon}</p>
            <p>{filters.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
