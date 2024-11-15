"use client";
import React from "react";
import { useState, Fragment } from "react";
import Image from "next/image";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+g/, "")
            .includes(query.toLowerCase().replace(/\s+g/, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}
      >
        <Image
          src="/car-logo.svg"
          width={40}
          height={40}
          className="ml-14"
          alt="Car Logo"
        />

        <div className="relative w-full">
          <ComboboxButton
            className="absolute
             top-[14px]"
          ></ComboboxButton>

          <ComboboxInput
            className="search-manufacturer__input"
            placeholder="volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opactity-100"
            leaveTo="opacity-100"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <ComboboxOption
                  value={query}
                  className="search-manufacturer__options"
                >
                  Create "{query}"
                </ComboboxOption>
              ) : 
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    className={({ active }) => `         
relative search-manufacturer__option
 ${active ? "bg-primary-blue   text-white" : "text-gray-900"}  

`}
                    value={item}
                  >
                    
                    
                    {item}
                  </ComboboxOption>
                )
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
