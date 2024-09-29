import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RoomListingProps {
  setFormData: React.Dispatch<React.SetStateAction<RoomData[]>>;
}

type RoomData = {
  roomType: string;
  roomTypeNumber: string;
  bedType: string;
  bedTypeNumber: string;
  guestCapacity: string;
  roomSize: string;
  basePrice: string;
};

type RoomTypes = {
  value: string;
  label: string;
};

const roomTypes: RoomTypes[] = [
  { value: "single_room", label: "Single Room" },
  { value: "double_room", label: "Double Room" },
  { value: "triple_room", label: "Triple Room" },
  { value: "quad_room", label: "Quad Room" },
  { value: "queen_room", label: "Queen Room" },
  { value: "king_room", label: "King Room" },
  { value: "twin_room", label: "Twin Room" },
  { value: "suite", label: "Suite" },
  { value: "deluxe_room", label: "Deluxe Room" },
  { value: "villa", label: "Villa" },
];

type BedTypes = {
  name: string;
  dimensions: string;
};

const bedTypes: BedTypes[] = [
  { name: "Single Bed", dimensions: "190 cm x 91 cm to 190 cm x 99 cm" },
  { name: "Double Bed", dimensions: "190 cm x 130 cm to 190 cm x 137 cm" },
  { name: "Queen Bed", dimensions: "203 cm x 152 cm to 203 cm x 157 cm" },
  { name: "King Bed", dimensions: "203 cm x 193 cm to 203 cm x 198 cm" },
  { name: "Twin Beds", dimensions: "190 cm x 91 cm to 190 cm x 99 cm each" },
  {
    name: "Hollywood Twin",
    dimensions: "190 cm x 91 cm to 190 cm x 99 cm each",
  },
  {
    name: "Bunk Bed",
    dimensions: "190 cm x 91 cm to 190 cm x 99 cm for each mattress",
  },
  {
    name: "Sofa Bed",
    dimensions: "190 cm x 137 cm to 203 cm x 152 cm when extended",
  },
  {
    name: "Futon",
    dimensions: "190 cm x 137 cm to 203 cm x 152 cm when unfolded",
  },
  {
    name: "Murphy Bed",
    dimensions: "190 cm x 137 cm to 203 cm x 152 cm when pulled down",
  },
];

const guestCapacityOptions: string[] = [
  "1 Adult",
  "2 Adults",
  "1 Adult, 1 Child",
  "2 Adults, 1 Child",
  "2 Adults, 2 Children",
  "3 Adults",
  "4 Adults",
  "5+ Guests",
];

export const RoomListing: React.FC<RoomListingProps> = ({
  setFormData: setParentFormData,
}) => {
  const [rooms, setRooms] = useState<RoomData[]>([
    {
      roomType: "",
      roomTypeNumber: "",
      bedType: "",
      bedTypeNumber: "",
      guestCapacity: "",
      roomSize: "",
      basePrice: "",
    },
  ]);

  const handleChange = (index: number, field: string) => (value: string) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], [field]: value };
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    if (rooms.length < 5) {
      setRooms([
        ...rooms,
        {
          roomType: "",
          roomTypeNumber: "",
          bedType: "",
          bedTypeNumber: "",
          guestCapacity: "",
          roomSize: "",
          basePrice: "",
        },
      ]);
    }
    return false;
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const updatedRooms = rooms.filter((_, i) => i !== index);
      setRooms(updatedRooms);
    }
  };

  useEffect(() => {
    setParentFormData(rooms);
  }, [rooms, setParentFormData]);

  return (
    <form>
      {rooms.map((room, index) => (
        <div key={index} className="space-y-4 mb-8 pb-8 border-b">
          <div className="w-full flex justify-between">
            <h3 className="text-lg font-semibold">Room {index + 1}</h3>
            {rooms.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeRoom(index)}
              >
                Remove Room
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`roomType-${index}`}>
              Please Select Your Room Type
            </Label>
            <Select
              onValueChange={handleChange(index, "roomType")}
              value={room.roomType}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((roomType) => (
                  <SelectItem key={roomType.value} value={roomType.value}>
                    {roomType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`numberOfRooms-${index}`}>
              Number of Rooms of this Type
            </Label>
            <Select
              onValueChange={handleChange(index, "roomTypeNumber")}
              value={room.roomTypeNumber}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "15+"].map(
                  (number) => (
                    <SelectItem key={number} value={number.toString()}>
                      {number}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`bedTypes-${index}`}>
              What Kind Of Bed Available in this Room
            </Label>
            <Select
              onValueChange={handleChange(index, "bedType")}
              value={room.bedType}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Bed Type" />
              </SelectTrigger>
              <SelectContent>
                {bedTypes.map((bed) => (
                  <SelectItem key={bed.name} value={bed.name}>
                    {bed.name + ` ( ${bed.dimensions} )`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`numberOfBeds-${index}`}>
              Number of Beds of this Type
            </Label>
            <Select
              onValueChange={handleChange(index, "bedTypeNumber")}
              value={room.bedTypeNumber}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, "5+"].map((number) => (
                  <SelectItem key={number} value={number.toString()}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`guestCapacity-${index}`}>
              Number of Guests Can Stay in This Room
            </Label>
            <Select
              onValueChange={handleChange(index, "guestCapacity")}
              value={room.guestCapacity}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select Guest Capacity" />
              </SelectTrigger>
              <SelectContent>
                {guestCapacityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor={`roomSize-${index}`}>Room Size</Label>
            <Input
              type="number"
              id={`roomSize-${index}`}
              min={100}
              max={500}
              placeholder="Room Size (in Square ft)"
              value={room.roomSize}
              onChange={(e) => handleChange(index, "roomSize")(e.target.value)}
            />
          </div>

          <div className="space-y-2 ">
            <Label htmlFor={`basePrice-${index}`}>
              Base Price Per Night Per Person
              <span className="text-xs text-red-500 block">
                (This is the lowest price that automatically applies to this
                room for all dates. Before your property goes live, you can set
                seasonal pricing on your property dashboard)
              </span>
            </Label>
            <Input
              type="number"
              id={`basePrice-${index}`}
              min={499}
              max={10000}
              placeholder="Room Base Price Per Night (in Rs.)"
              value={room.basePrice}
              onChange={(e) => handleChange(index, "basePrice")(e.target.value)}
            />
          </div>
        </div>
      ))}
      <Button type="button" onClick={addRoom} disabled={rooms.length >= 5}>
        Add Another Room
      </Button>
    </form>
  );
};
