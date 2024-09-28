import { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
type AmenitiesTypes = {
  label: string;
  icon: JSX.Element;
};
const amenities: AmenitiesTypes[] = [
  {
    label: "Free Wi-Fi",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z" />
      </svg>
    ),
  },
  {
    label: "Parking",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M240-120v-720h280q100 0 170 70t70 170q0 100-70 170t-170 70H400v240H240Zm160-400h128q33 0 56.5-23.5T608-600q0-33-23.5-56.5T528-680H400v160Z" />
      </svg>
    ),
  },
  {
    label: "Swimming Pool",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M80-120v-80q38 0 57-20t75-20q56 0 77 20t57 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 57-20t77-20q56 0 75 20t57 20v80q-59 0-77.5-20T748-160q-36 0-57 20t-77 20q-56 0-77-20t-57-20q-36 0-57 20t-77 20q-56 0-77-20t-57-20q-36 0-54.5 20T80-120Zm0-180v-80q38 0 57-20t75-20q56 0 77.5 20t56.5 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 57-20t77-20q56 0 75 20t57 20v80q-59 0-77.5-20T748-340q-36 0-55.5 20T614-300q-57 0-77.5-20T480-340q-38 0-56.5 20T346-300q-59 0-78.5-20T212-340q-36 0-54.5 20T80-300Zm196-204 133-133-40-40q-33-33-70-48t-91-15v-100q75 0 124 16.5t96 63.5l256 256q-17 11-33 17.5t-37 6.5q-36 0-57-20t-77-20q-56 0-77 20t-57 20q-21 0-37-6.5T276-504Zm392-336q42 0 71 29.5t29 70.5q0 42-29 71t-71 29q-42 0-71-29t-29-71q0-41 29-70.5t71-29.5Z" />
      </svg>
    ),
  },
  {
    label: "Fitness Center",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="m536-84-56-56 142-142-340-340-142 142-56-56 56-58-56-56 84-84-56-58 56-56 58 56 84-84 56 56 58-56 56 56-142 142 340 340 142-142 56 56-56 58 56 56-84 84 56 58-56 56-58-56-84 84-56-56-58 56Z" />
      </svg>
    ),
  },
  {
    label: "Restaurant",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z" />
      </svg>
    ),
  },
  {
    label: "Room Service",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M80-200v-80h800v80H80Zm40-120v-40q0-128 78.5-226T400-710v-10q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720v10q124 26 202 124t78 226v40H120Zm82-80h556q-14-104-93-172t-185-68q-106 0-184.5 68T202-400Zm278 0Z" />
      </svg>
    ),
  },
  {
    label: "Spa",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M480-80q-73-9-145-39.5T206.5-207Q150-264 115-351T80-560v-40h40q51 0 105 13t101 39q12-86 54.5-176.5T480-880q57 65 99.5 155.5T634-548q47-26 101-39t105-13h40v40q0 122-35 209t-91.5 144q-56.5 57-128 87.5T480-80Zm-2-82q-11-166-98.5-251T162-518q11 171 101.5 255T478-162Zm2-254q15-22 36.5-45.5T558-502q-2-57-22.5-119T480-742q-35 59-55.5 121T402-502q20 17 42 40.5t36 45.5Zm78 236q37-12 77-35t74.5-62.5q34.5-39.5 59-98.5T798-518q-94 14-165 62.5T524-332q12 32 20.5 70t13.5 82Zm-78-236Zm78 236Zm-80 18Zm46-170ZM480-80Z" />
      </svg>
    ),
  },
  {
    label: "Business Center",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z" />
      </svg>
    ),
  },
  {
    label: "Pet Friendly",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
      </svg>
    ),
  },
  {
    label: "Airport Shuttle",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M240-200q-50 0-85-35t-35-85H40v-360q0-33 23.5-56.5T120-760h560l240 240v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm360-360h160L640-680h-40v120Zm-240 0h160v-120H360v120Zm-240 0h160v-120H120v120Zm120 290q21 0 35.5-14.5T290-320q0-21-14.5-35.5T240-370q-21 0-35.5 14.5T190-320q0 21 14.5 35.5T240-270Zm480 0q21 0 35.5-14.5T770-320q0-21-14.5-35.5T720-370q-21 0-35.5 14.5T670-320q0 21 14.5 35.5T720-270ZM120-400h32q17-18 39-29t49-11q27 0 49 11t39 29h304q17-18 39-29t49-11q27 0 49 11t39 29h32v-80H120v80Zm720-80H120h720Z" />
      </svg>
    ),
  },
  {
    label: "Bar/Lounge",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z" />
      </svg>
    ),
  },
  {
    label: "Laundry Service",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640H240v640Zm240-40q83 0 141.5-58.5T680-400q0-83-58.5-141.5T480-600q-83 0-141.5 58.5T280-400q0 83 58.5 141.5T480-200Zm0-68q-26 0-50.5-9.5T386-306l188-188q19 19 28.5 43.5T612-400q0 55-38.5 93.5T480-268ZM320-680q17 0 28.5-11.5T360-720q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720q0 17 11.5 28.5T320-680Zm120 0q17 0 28.5-11.5T480-720q0-17-11.5-28.5T440-760q-17 0-28.5 11.5T400-720q0 17 11.5 28.5T440-680ZM240-160v-640 640Z" />
      </svg>
    ),
  },
  {
    label: "Concierge",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M400-80v-80h520v80H400Zm40-120q0-81 51-141.5T620-416v-25q0-17 11.5-28.5T660-481q17 0 28.5 11.5T700-441v25q77 14 128.5 74.5T880-200H440Zm105-81h228q-19-27-48.5-43.5T660-341q-36 0-66 16.5T545-281Zm114 0ZM40-440v-440h240v58l280-78 320 100v40q0 50-35 85t-85 35h-80v24q0 25-14.5 45.5T628-541L358-440H40Zm80-80h80v-280h-80v280Zm160 0h64l232-85q11-4 17.5-13.5T600-640h-71l-117 38-24-76 125-42h247q9 0 22.5-6.5T796-742l-238-74-278 76v220Z" />
      </svg>
    ),
  },
  {
    label: "Air Conditioning",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M440-80v-166L310-118l-56-56 186-186v-80h-80L174-254l-56-56 128-130H80v-80h166L118-650l56-56 186 186h80v-80L254-786l56-56 130 128v-166h80v166l130-128 56 56-186 186v80h80l186-186 56 56-128 130h166v80H714l128 130-56 56-186-186h-80v80l186 186-56 56-130-128v166h-80Z" />
      </svg>
    ),
  },
  {
    label: "Elevator",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M280-240h120v-160h40v-100q0-33-23.5-56.5T360-580h-40q-33 0-56.5 23.5T240-500v100h40v160Zm60-380q21 0 35.5-14.5T390-670q0-21-14.5-35.5T340-720q-21 0-35.5 14.5T290-670q0 21 14.5 35.5T340-620Zm180 100h200L620-680 520-520Zm100 240 100-160H520l100 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Z" />
      </svg>
    ),
  },
  {
    label: "Luggage Storage",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-440q0-33 23.5-56.5T280-720h80v-80q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v80h80q33 0 56.5 23.5T760-640v440q0 33-23.5 56.5T680-120q0 17-11.5 28.5T640-80q-17 0-28.5-11.5T600-120H360q0 17-11.5 28.5T320-80q-17 0-28.5-11.5T280-120Zm0-80h400v-440H280v440Zm80-40h80v-360h-80v360Zm160 0h80v-360h-80v360Zm-80-480h80v-80h-80v80Zm40 300Z" />
      </svg>
    ),
  },
  {
    label: "Non-Smoking Rooms",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M792-56 528-320H80v-120h328L56-792l56-56 736 736-56 56Zm-38-264-34-34v-86h60v120h-26Zm66 0v-120h60v120h-60Zm-140-74-46-46h46v46Zm40-86v-52q0-39-23-59.5T642-612h-62q-56 0-95-39t-39-95q0-56 39-95t95-39v60q-30 0-52 21t-22 53q0 32 22 53t52 21h62q56 0 97 36t41 90v66h-60Zm100 0v-90q0-66-46-114t-114-48v-60q30 0 52-22t22-52h60q0 29-11 52.5T754-770q56 26 91 80t35 120v90h-60Z" />
      </svg>
    ),
  },
  {
    label: "Wheelchair Accessible",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM680-80v-200H480q-33 0-56.5-23.5T400-360v-240q0-33 23.5-56.5T480-680q24 0 41.5 10.5T559-636q55 66 99.5 90.5T760-520v80q-53 0-107-23t-93-55v138h120q33 0 56.5 23.5T760-300v220h-80Zm-280 0q-83 0-141.5-58.5T200-280q0-72 45.5-127T360-476v82q-35 14-57.5 44.5T280-280q0 50 35 85t85 35q39 0 69.5-22.5T514-240h82q-14 69-69 114.5T400-80Z" />
      </svg>
    ),
  },
  {
    label: "Conference Facilities",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm160-640v560-560Zm160 320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-200h240v-560H280v560Z" />
      </svg>
    ),
  },
  {
    label: "Cleaning Services",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M120-40v-280q0-83 58.5-141.5T320-520h40v-320q0-33 23.5-56.5T440-920h80q33 0 56.5 23.5T600-840v320h40q83 0 141.5 58.5T840-320v280H120Zm80-80h80v-120q0-17 11.5-28.5T320-280q17 0 28.5 11.5T360-240v120h80v-120q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240v120h80v-120q0-17 11.5-28.5T640-280q17 0 28.5 11.5T680-240v120h80v-200q0-50-35-85t-85-35H320q-50 0-85 35t-35 85v200Zm320-400v-320h-80v320h80Zm0 0h-80 80Z" />
      </svg>
    ),
  },
];

type AmenitiesProps = {
  setFormData: (data: {
    amenities: string[];
    checkInTime: { from: string; to: string };
    checkOutTime: { from: string; to: string };
  }) => void;
};
type AmenitiesState = {
  amenities: string[];
  checkInTime: { from: string; to: string };
  checkOutTime: { from: string; to: string };
};

export const Amenities = ({
  setFormData: setParentFormData,
}: AmenitiesProps) => {
  const timeSlots = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const hour = i >> 1;
      const minute = i & 1 ? "30" : "00";
      const ampm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minute} ${ampm}`;
    });
  }, []);
  const [formData, setLocalFormData] = useState<AmenitiesState>({
    amenities: [],
    checkInTime: { from: "", to: "" },
    checkOutTime: { from: "", to: "" },
  });

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setLocalFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          amenities: [...prevData.amenities, amenity],
        };
      } else {
        return {
          ...prevData,
          amenities: prevData.amenities.filter((item) => item !== amenity),
        };
      }
    });
  };

  const HandleCheckInAndOutTimeChange = (
    type: "checkInTime" | "checkOutTime",
    index: number,
    value: string
  ) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [index === 0 ? "from" : "to"]: value,
      },
    }));
  };

  useEffect(() => {
    setParentFormData(formData);
  }, [formData, setParentFormData]);
  console.log(formData);

  return (
    <form>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="Amenities">Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenities.map((amenity) => (
              <div key={amenity.label} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.label}
                  checked={formData.amenities.includes(amenity.label)}
                  onCheckedChange={(checked) =>
                    handleAmenityChange(amenity.label, checked as boolean)
                  }
                />
                {amenity.icon}
                <Label htmlFor={amenity.label}>{amenity.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Check In Time">Check In Time</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(event) =>
                HandleCheckInAndOutTimeChange("checkInTime", 0, event)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(event) =>
                HandleCheckInAndOutTimeChange("checkInTime", 1, event)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Check Out Time">Check Out Time</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(event) =>
                HandleCheckInAndOutTimeChange("checkOutTime", 0, event)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(event) =>
                HandleCheckInAndOutTimeChange("checkOutTime", 1, event)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </form>
  );
};
