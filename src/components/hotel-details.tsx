import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect } from "react";
import {
  MapPin,
  Building,
  Bed,
  Coffee,
  Image,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Upload,
  X,
  Wifi,
  Waves,
  Dumbbell,
  PawPrint,
  Bus,
  Paintbrush,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

const ROOM_TYPES = [
  "Single",
  "Double",
  "Twin",
  "Suite",
  "Deluxe",
  "Executive",
  "Family",
  "Accessible",
];

const AMENITIES = [
  { icon: <Wifi className="h-4 w-4" />, label: "Free Wi-Fi" },
  { icon: <MapPin className="h-4 w-4" />, label: "Parking" },
  { icon: <Waves className="h-4 w-4" />, label: "Swimming Pool" },
  { icon: <Dumbbell className="h-4 w-4" />, label: "Fitness Center" },
  { icon: <Coffee className="h-4 w-4" />, label: "Restaurant" },
  { icon: <Paintbrush className="h-4 w-4" />, label: "Room Service" },
  { icon: <Coffee className="h-4 w-4" />, label: "Spa" },
  { icon: <Coffee className="h-4 w-4" />, label: "Business Center" },
  { icon: <PawPrint className="h-4 w-4" />, label: "Pet Friendly" },
  { icon: <Bus className="h-4 w-4" />, label: "Airport Shuttle" },
];

interface ImageFile extends File {
  preview: string;
}

export default function HotelDetails() {
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState("");
  const [locationSet, setLocationSet] = useState(false);
  const [roomList, setRoomList] = useState([
    { type: "", beds: "", size: "", rate: 500 },
  ]);
  const [charges, setCharges] = useState({ adult: "", child: "" });
  const [yearBuilt, setYearBuilt] = useState<Date | null>(null);
  const [totalRooms, setTotalRooms] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [amenities, setAmenities] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          setLocationSet(true);
        },
        (error) => {
          console.log(error);
          alert(
            "Unable to retrieve your location. Please allow location access and try again."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleAddRoom = () => {
    setRoomList([...roomList, { type: "", beds: "", size: "", rate: 500 }]);
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRooms = roomList.filter((_, i) => i !== index);
    setRoomList(updatedRooms);
  };

  const handleRoomChange = (index: number, field: string, value: any) => {
    const updatedRooms = roomList.map((room, i) =>
      i === index ? { ...room, [field]: value } : room
    );
    setRoomList(updatedRooms);
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenities((currentAmenities) => ({
      ...currentAmenities,
      [amenity]: !currentAmenities[amenity],
    }));
  };

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharges({
      ...charges,
      [e.target.name]: e.target.value,
    });
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prevImages: ImageFile[]) => {
      const newImages = [
        ...prevImages,
        ...acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as ImageFile
        ),
      ];
      localStorage.setItem("hotelImages", JSON.stringify(newImages));
      return newImages;
    });
  }, []);

  useEffect(() => {
    const storedImages = localStorage.getItem("hotelImages");
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      setImages(
        parsedImages.map((img: any) =>
          Object.assign(new File([], img.name), {
            preview: img.preview,
          })
        )
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      localStorage.setItem("hotelImages", JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setYearBuilt(date);
  };

  const steps = [
    { title: "Basic Info", icon: <Building className="h-5 w-5" /> },
    { title: "Property Details", icon: <MapPin className="h-5 w-5" /> },
    { title: "Rooms", icon: <Bed className="h-5 w-5" /> },
    { title: "Amenities", icon: <Coffee className="h-5 w-5" /> },
    { title: "Photos", icon: <Image className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto flex pt-4">
      <Card className="w-full  mx-auto h-full border-none shadow-none flex flex-col justify-start min-h-screen">
        <CardHeader className="pt-0">
          <CardTitle>List Your Hotel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center cursor-pointer ${
                  currentStep === index
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="mt-2 text-sm">{step.title}</span>
              </div>
            ))}
          </div>

          <form className="space-y-6">
            {currentStep === 0 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hotel Name</label>
                    <Input type="text" placeholder="Enter your hotel's name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tagline</label>
                    <Input
                      type="text"
                      placeholder="A short, catchy description"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe your hotel's unique features and atmosphere"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      type="text"
                      placeholder="Full address of your hotel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={location}
                        onClick={!locationSet ? getCurrentLocation : undefined}
                        readOnly={locationSet}
                        placeholder={
                          locationSet
                            ? "Location set"
                            : "Click to get current location"
                        }
                      />
                      {!locationSet && (
                        <Button
                          type="button"
                          onClick={getCurrentLocation}
                          variant="outline"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Location
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Hotel",
                          "Resort",
                          "Boutique Hotel",
                          "Apartment Hotel",
                          "Villa",
                          "Guesthouse",
                          "Hostel",
                        ].map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year Built</label>
                    <Input
                      type="date"
                      value={yearBuilt ? format(yearBuilt, "yyyy-MM-dd") : ""}
                      onChange={handleYearChange}
                      max={format(new Date(), "yyyy-MM-dd")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Number of Floors
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Number of Floors" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((floor) => (
                          <SelectItem key={floor} value={floor.toString()}>
                            {floor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total Rooms</label>
                    <Select onValueChange={setTotalRooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or enter total rooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 20, 30, 40, 50, 75, 100, 150, 200, "Custom"].map(
                          (rooms) => (
                            <SelectItem key={rooms} value={rooms.toString()}>
                              {rooms}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    {totalRooms === "Custom" && (
                      <Input
                        type="number"
                        placeholder="Enter total rooms"
                        className="mt-2"
                        min={1}
                        max={500}
                        onChange={(e) => setTotalRooms(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {roomList.map((room, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">
                        Room {index + 1}
                      </CardTitle>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveRoom(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Room Type</label>
                        <Select
                          value={room.type}
                          onValueChange={(value) =>
                            handleRoomChange(index, "type", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Room Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROOM_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Number of Beds
                        </label>
                        <Select
                          value={room.beds}
                          onValueChange={(value) =>
                            handleRoomChange(index, "beds", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Number of Beds" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4].map((beds) => (
                              <SelectItem key={beds} value={beds.toString()}>
                                {beds}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Room Size (sq ft)
                        </label>
                        <Input
                          type="number"
                          value={room.size}
                          onChange={(e) =>
                            handleRoomChange(index, "size", e.target.value)
                          }
                          placeholder="Enter room size"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Room Rate (₹{room.rate})
                        </label>
                        <Slider
                          min={500}
                          max={10000}
                          step={100}
                          value={[room.rate]}
                          onValueChange={(value) =>
                            handleRoomChange(index, "rate", value[0])
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button type="button" onClick={handleAddRoom} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room Type
                </Button>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {AMENITIES.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`amenity-${index}`}
                            checked={!!amenities[amenity.label]}
                            onCheckedChange={() =>
                              handleAmenityChange(amenity.label)
                            }
                          />
                          <label
                            htmlFor={`amenity-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="flex items-center space-x-2">
                              {amenity.icon}
                              <span>{amenity.label}</span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Additional Charges
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Extra Adult (per night)
                        </label>
                        <Input
                          type="number"
                          name="adult"
                          value={charges.adult}
                          onChange={handleChargeChange}
                          placeholder="Enter charge for extra adult"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Extra Child (per night)
                        </label>
                        <Input
                          type="number"
                          name="child"
                          value={charges.child}
                          onChange={handleChargeChange}
                          placeholder="Enter charge for extra child"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Upload Hotel Photos
                    </label>
                    <div
                      {...getRootProps()}
                      className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                        isDragActive
                          ? "border-primary"
                          : "border-muted-foreground"
                      )}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </div>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {images.map((file, index) => (
                        <div
                          key={file.preview}
                          className="relative aspect-square bg-muted rounded-md overflow-hidden group"
                        >
                          <img
                            src={file.preview}
                            alt={`Hotel Image ${index + 1}`}
                            className=" object-fill w-full h-full"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              removeImage(index);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Upload high-quality images of your hotel's exterior, rooms,
                    amenities, and common areas. These photos will be displayed
                    on your listing page.
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 4}
              >
                {currentStep === 4 ? "Submit Listing" : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
