// utils.ts

import { CarProps, FilterProps } from "@types";

// Function to calculate car rent based on mileage and year
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0); // Return as a string with no decimal places
};

// Function to update search parameters in the URL
export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Construct the new URL with the updated search parameter
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

// Function to delete a search parameter from the URL
export const deleteSearchParams = (type: string) => {
  // Get the current URL search params
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

// Function to fetch cars from the API using provided filters
export const fetchCars = async (filters: FilterProps) => {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "e20b54ec08msha1ed27147b3a93ap1cb610jsn9f195411e1dd", // Use environment variable or fallback to provided API key
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Construct the API request URL with filters
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
};

// Function to generate the car image URL based on car properties and angle
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  // Ensure that model name is safe from splitting errors
  const modelFamily = model.includes(" ") ? model.split(" ")[0] : model;

  // Append query parameters to the URL
  url.searchParams.append("customer", "vk-IE3gP24rqXjbhbqKBD0fxKDZnKwCgARahzhhG3IMzGMqfF"); // Imagin API key provided
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", modelFamily);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle || 'default'}`); // Use default if no angle provided

  return `${url}`;
};
