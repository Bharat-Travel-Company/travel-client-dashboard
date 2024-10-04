import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SliderNavBar } from "@/components/SliderNavBar";
import { tabItems } from "@/data/carlisiting/tabItems";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  // Driver Details
  name: string;
  aadharNumber: string;
  panNumber: string;
  licenseNumber: string;
  dob: string;
  address: string;
  experience: string;
  phoneNumber: string;
  email: string;

  // Car Information
  carModel: string;
  registrationNumber: string;
  fuelType: string;
  mileage: string;
  seats: string;
  features: string[];

  // Trip and Pricing Details
  tripType: string;
  operationLocations: string[];
  pricePerKm: string;
  pricePerDay: string;

  // Inclusions and Exclusions
  inclusions: string[];
  exclusions: string[];
}
interface FormErrors {
  [key: string]: string;
}

interface DriverDetailsProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

interface CarInformationProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (
    group: keyof FormData,
    item: string,
    checked: boolean
  ) => void;
}

interface TripPricingDetailsProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (
    group: keyof FormData,
    item: string,
    checked: boolean
  ) => void;
}

interface InclusionsExclusionsProps {
  formData: FormData;
  handleCheckboxChange: (
    group: keyof FormData,
    item: string,
    checked: boolean
  ) => void;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  formData,
  handleInputChange,
  errors,
}) => (
  <>
    <div className="space-y-2">
      <Label htmlFor="name">Driver Name</Label>
      <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="aadharNumber">Aadhar Card Number</Label>
      <Input
        id="aadharNumber"
        name="aadharNumber"
        value={formData.aadharNumber}
        onChange={handleInputChange}
        required
        maxLength={12}
      />
      {errors.aadharNumber && (
        <p className="text-red-500 text-sm">{errors.aadharNumber}</p>
      )}
    </div>
    <div className="space-y-2">
      <Label htmlFor="panNumber">PAN Card Number</Label>
      <Input
        id="panNumber"
        name="panNumber"
        value={formData.panNumber}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="licenseNumber">License Number</Label>
      <Input
        id="licenseNumber"
        name="licenseNumber"
        value={formData.licenseNumber}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="dob">Date of Birth</Label>
      <Input
        id="dob"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleInputChange}
        required
        max={new Date().toISOString().split("T")[0]}
      />
      {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
    </div>
    <div className="space-y-2">
      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="experience">Experience in years</Label>
      <Input
        id="experience"
        name="experience"
        type="number"
        value={formData.experience}
        onChange={handleInputChange}
        required
        min="0"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
    </div>
  </>
);

const carModels = [
  "Indica",
  "Swift",
  "Dzire",
  "Etios",
  "Xylo",
  "Ertiga",
  "Toyota Innova",
  "Innova Crysta",
  "Ford Fiesta",
  "Honda Civic",
  "Ford E-350 Wagon",
  "Toyota Camry",
  "Mahindra Marazzo",
  "Honda Amaze",
  "Hyundai Aura",
  "Renault Triber",
  "Tata Tigor",
  "Tata Tiago",
  "Maruti Suzuki Wagon R",
  "Maruti Suzuki Celerio",
  "Maruti Suzuki Alto K10",
];

const CarInformation: React.FC<CarInformationProps> = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  const handleSelectChange = (name: string, value: string) => {
    const customEvent = {
      target: {
        name,
        value,
        type: "select",
        checked: false,
        // Add other properties of HTMLInputElement as needed
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(customEvent);
  };
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="carModel">Car Model</Label>
        <Select
          name="carModel"
          onValueChange={(value) => handleSelectChange("carModel", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select car model" />
          </SelectTrigger>
          <SelectContent>
            {carModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="registrationNumber">Car Registration Number</Label>
        <Input
          id="registrationNumber"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fuelType">Fuel Type</Label>
        <Select
          name="fuelType"
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "fuelType", value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="CNG">CNG</SelectItem>
            <SelectItem value="Petrol+CNG">Petrol+CNG</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mileage">Average Mileage (kmpl)</Label>
        <Input
          id="mileage"
          name="mileage"
          type="number"
          value={formData.mileage}
          onChange={handleInputChange}
          required
          min="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seats">Number of Seats</Label>
        <Select
          name="seats"
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "seats", value },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select number of seats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 Seats</SelectItem>
            <SelectItem value="5">5 Seats</SelectItem>
            <SelectItem value="6">6 Seats</SelectItem>
            <SelectItem value="7">7 Seats</SelectItem>
            <SelectItem value="7-8">7-8 Seats</SelectItem>
            <SelectItem value="8">8 Seats</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Additional Features</Label>
        <div className="flex space-x-4">
          <Checkbox
            id="ac"
            name="features"
            value="AC"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("features", "AC", checked)
            }
          />
          <Label htmlFor="ac">AC</Label>
          <Checkbox
            id="heater"
            name="features"
            value="Heater"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("features", "Heater", checked)
            }
          />
          <Label htmlFor="heater">Heater</Label>
          <Checkbox
            id="roofCarrier"
            name="features"
            value="Roof Carrier"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("features", "Roof Carrier", checked)
            }
          />
          <Label htmlFor="roofCarrier">Roof Carrier</Label>
        </div>
      </div>
    </>
  );
};

const TripPricingDetails: React.FC<TripPricingDetailsProps> = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  const statesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <>
      <div className="space-y-2">
        <Label>Trip Type</Label>
        <RadioGroup
          name="tripType"
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "tripType", value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single">Single Trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round" id="round" />
            <Label htmlFor="round">Round Trip</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label>Operation Locations</Label>
        <div className="flex space-x-4">
          <div className="grid grid-cols-3 gap-2">
            {statesAndUTs.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location.toLowerCase().replace(/\s+/g, "-")}
                  name="operationLocations"
                  value={location}
                  onCheckedChange={(checked:boolean) =>
                    handleCheckboxChange(
                      "operationLocations",
                      location,
                      checked
                    )
                  }
                />
                <Label htmlFor={location.toLowerCase().replace(/\s+/g, "-")}>
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pricePerKm">Price per km</Label>
        <Input
          id="pricePerKm"
          name="pricePerKm"
          type="number"
          value={formData.pricePerKm}
          onChange={handleInputChange}
          required
          min="0"
        />
      </div>
      {formData.tripType === "round" && (
        <div className="space-y-2">
          <Label htmlFor="pricePerDay">Price per day</Label>
          <Input
            id="pricePerDay"
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
      )}
    </>
  );
};

const InclusionsExclusions: React.FC<InclusionsExclusionsProps> = ({
  handleCheckboxChange,
}) => (
  <>
    <div className="space-y-2">
      <Label>Inclusions</Label>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="parking"
            name="inclusions"
            value="Parking"
            onCheckedChange={(checked:boolean) =>
              handleCheckboxChange("inclusions", "Parking", checked)
            }
            defaultChecked
          />
          <Label htmlFor="parking">Parking</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="toll"
            name="inclusions"
            value="Toll"
            onCheckedChange={(checked:boolean) =>
              handleCheckboxChange("inclusions", "Toll", checked)
            }
            defaultChecked
          />
          <Label htmlFor="toll">Toll</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="149km"
            name="inclusions"
            value="149 Kms"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("inclusions", "149 Kms", checked)
            }
            defaultChecked
          />
          <Label htmlFor="149km">149 Kms</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="driverAllowance"
            name="inclusions"
            value="Driver Allowance"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("inclusions", "Driver Allowance", checked)
            }
            defaultChecked
          />
          <Label htmlFor="driverAllowance">Driver Allowance</Label>
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <Label>Exclusions</Label>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fareBeyond149"
            name="exclusions"
            value="Fare beyond 149 km"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("exclusions", "Fare beyond 149 km", checked)
            }
          />
          <Label htmlFor="fareBeyond149">Fare beyond 149 km</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="extraDriverCharges"
            name="exclusions"
            value="Extra Driver Charges"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(
                "exclusions",
                "Extra Driver Charges",
                checked
              )
            }
          />
          <Label htmlFor="extraDriverCharges">Extra Driver Charges</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="stateBorderTax"
            name="exclusions"
            value="State Border Tax"
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange("exclusions", "State Border Tax", checked)
            }
          />
          <Label htmlFor="stateBorderTax">State Border Tax</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="additionalStops"
            name="exclusions"
            value="Additional Stops"
            onCheckedChange={(checked:boolean) =>
              handleCheckboxChange("exclusions", "Additional Stops", checked)
            }
          />
          <Label htmlFor="additionalStops">Additional Stops</Label>
        </div>
      </div>
    </div>
  </>
);

const IndividualCarListing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    aadharNumber: "",
    panNumber: "",
    licenseNumber: "",
    dob: "",
    address: "",
    experience: "",
    phoneNumber: "",
    email: "",
    carModel: "",
    registrationNumber: "",
    fuelType: "",
    mileage: "",
    seats: "",
    features: [],
    tripType: "",
    operationLocations: [],
    pricePerKm: "",
    pricePerDay: "",
    inclusions: [],
    exclusions: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCheckboxChange = (
    group: keyof FormData,
    item: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [group]: checked
        ? [...(prev[group] as string[]), item]
        : (prev[group] as string[]).filter((i) => i !== item),
    }));
  };

  const validateField = (name: string, value: string) => {
    const newErrors: FormErrors = { ...errors };
    switch (name) {
      case "aadharNumber":
        if (!/^\d{12}$/.test(value)) {
          newErrors.aadharNumber = "Aadhar number must be 12 digits";
        } else {
          delete newErrors.aadharNumber;
        }
        break;
      case "dob":{
       const age = calculateAge(new Date(value));
        if (age < 18) {
          newErrors.dob = "Driver must be at least 18 years old";
        } else {
          delete newErrors.dob;
        }
        break;
      }
    }
    setErrors(newErrors);
  };

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <DriverDetails
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <CarInformation
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 2:
        return (
          <TripPricingDetails
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 3:
        return (
          <InclusionsExclusions
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <SliderNavBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabItems={tabItems}
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">{renderTabContent()}</div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
          disabled={activeTab === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (activeTab < tabItems.length - 1) {
              setActiveTab((prev) => prev + 1);
            } else {
              handleSubmit(new Event("submit") as unknown as React.FormEvent);
            }
          }}
        >
          {activeTab === tabItems.length - 1 ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IndividualCarListing;
