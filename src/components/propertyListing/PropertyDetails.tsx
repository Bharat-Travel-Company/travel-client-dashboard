import { useState, useMemo, useCallback, useEffect } from "react";
import { Country, State, City } from "country-state-city";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
interface PropertyType {
  value: string;
  label: string;
}
const propertyTypes: PropertyType[] = [
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "hostel", label: "Hostel" },
];
type PropertyDetailsProps = {
  setFormData: (data: FormData) => void;
};
type FormData = {
  propertyType: string;
  propertyName: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  phoneNumber: string;
  email: string;
};

export const PropertyDetails = ({
  setFormData: setParentFormData,
}: PropertyDetailsProps) => {
  const [formData, setLocalFormData] = useState<FormData>({
    propertyType: "",
    propertyName: "",
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    phoneNumber: "",
    email: "",
  });

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (formData.country ? State.getStatesOfCountry(formData.country) : []),
    [formData.country]
  );
  const cities = useMemo(
    () =>
      formData.country && formData.state
        ? City.getCitiesOfState(formData.country, formData.state)
        : [],
    [formData.country, formData.state]
  );

  const handlePropertyTypeSelect = (value: string) => {
    setLocalFormData((prevData) => ({ ...prevData, propertyType: value }));
  };
  const handleCountrySelect = (value: string) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      country: value,
      state: "",
      city: "",
    }));
  };

  const handleStateSelect = (value: string) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      state: value,
      city: "",
    }));
  };

  const handleCitySelect = (value: string) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      city: value,
    }));
  };

  const handleInputChange = useCallback((id: string, value: string) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  useEffect(() => {
    setParentFormData(formData);
  }, [formData, setParentFormData]);
  // console.log(formData);
  return (
    <form action="">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="Property Type">Property Type</Label>
          <Select onValueChange={handlePropertyTypeSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="Property Name">Property Name</Label>
          <Input
            id="propertyName"
            placeholder="Property Name"
            value={formData.propertyName}
            onChange={(e) => handleInputChange("propertyName", e.target.value)}
          />{" "}
        </div>

        <div className="w-full flex gap-x-2">
          <div className="space-y-2 w-full">
            <Label htmlFor="Country">Country</Label>
            <Select onValueChange={handleCountrySelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="State">State</Label>
            <Select
              onValueChange={handleStateSelect}
              disabled={!formData.country}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="City">City</Label>
            <Select onValueChange={handleCitySelect} disabled={!formData.state}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="Property Address">Street Address</Label>
          <Input
            id="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
          />{" "}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Phone Number">Phone Number</Label>
          <Input
            id="phoneNumber"
            placeholder="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />{" "}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />{" "}
        </div>
      </div>
    </form>
  );
};
