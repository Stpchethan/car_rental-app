import { Filterprops } from "@/types";


export async function fetchCars(fliters: Filterprops, p0: any, year: any, p1: any, fuel: any, p2: any, limit: any, p3: any, model: any, p4: any) {
    const headers = {
      "x-rapidapi-key": "422fae469fmsh724e7b477368887p1fe64fjsnc90df3c688bd",
      "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
    };
  
    const response =  await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera',{
      headers:headers,
    });
  
  
  
  const result = await response.json();
  
  return result;
  }
   export const calculateCarRent =( city_mpg :number, year :
    number)=>{

const basePricePerDay = 50;

const mileageFactor = 0.1;

const ageFactor = 0.05;

const mileageRate = city_mpg * mileageFactor;

const ageRate = (new Date().getFullYear()-year) * ageFactor;


const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;


return rentalRatePerDay.toFixed(0);

















    }

    