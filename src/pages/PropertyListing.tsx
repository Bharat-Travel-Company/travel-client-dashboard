import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { PropertyDetails } from "@/components/propertyListing/PropertyDetails";
import { Amenities } from "@/components/propertyListing/Amenities";
import { RoomListing } from "@/components/propertyListing/RoomListing";
import { PropertyImages } from "@/components/propertyListing/PropertyImages";
interface TabItem {
  icon: JSX.Element;
  label: string;
  subheading: string;
}

const tabItems: TabItem[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Zm240-240q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm240 40h320v-160q0-33-23.5-56.5T760-640H520v240ZM280-520q17 0 28.5-11.5T320-560q0-17-11.5-28.5T280-600q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-40Zm240-80v240-240Z" />
      </svg>
    ),
    label: "Property Details",
    subheading: "Key information about the property",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M120-120v-80h80v-640h400v40h160v240h-80v-160h-80v240h-80v-280H280v560h200v80H120Zm560 40-12-60q-12-5-22.5-11T625-165l-58 20-40-69 45-40q-2-15-2-25.5t2-25.5l-45-40 40-69 58 20q10-8 20.5-14.5T668-420l12-60h80l12 60q12 5 22.5 11t20.5 14l58-20 40 69-45 40q2 15 2 25.5t-2 25.5l45 40-40 69-58-19q-10 8-20.5 14T772-140l-12 60h-80Zm40-120q33 0 56.5-23.5T800-280q0-33-23.5-56.5T720-360q-33 0-56.5 23.5T640-280q0 33 23.5 56.5T720-200ZM440-440q-17 0-28.5-11.5T400-480q0-17 11.5-28.5T440-520q17 0 28.5 11.5T480-480q0 17-11.5 28.5T440-440ZM280-200v-560 560Z" />
      </svg>
    ),
    label: "Amenities",
    subheading: "Features and facilities available",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M200-280h60v-60h440v60h60v-154q0-21-8-39.5T730-506v-94q0-33-23.5-56.5T650-680H520q-11 0-21 3t-19 9q-9-6-19-9t-21-3H310q-33 0-56.5 23.5T230-600v94q-14 14-22 32.5t-8 39.5v154Zm60-120v-40q0-17 11.5-28.5T300-480h360q17 0 28.5 11.5T700-440v40H260Zm30-140v-80h160v80H290Zm220 0v-80h160v80H510ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0 0v-640 640Z" />
      </svg>
    ),
    label: "Room Details",
    subheading: "Specifics of individual rooms",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Zm140-360q25 0 42.5-17.5T400-620q0-25-17.5-42.5T340-680q-25 0-42.5 17.5T280-620q0 25 17.5 42.5T340-560Z" />
      </svg>
    ),
    label: "Property Images",
    subheading: "Visual tour of the property",
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
      </svg>
    ),
    label: "Documents and Certifications",
    subheading: "Legal and official paperwork",
  },
];

type SliderNavBarProps = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
const SliderNavBar = ({ activeTab, setActiveTab }: SliderNavBarProps) => {
  return (
    <div className="w-full">
      <div className="flex gap-x-2 overflow-x-auto">
        {tabItems.map((item, index) => (
          <Button
            key={index}
            className={`flex items-center gap-x-1 whitespace-nowrap transition-colors ${
              activeTab === index
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
type PropertyImagesSliderProps = {
  propertyImages: { images: { preview: string; name: string }[] };
};
export const PropertyImagesSlider = ({
  propertyImages,
}: PropertyImagesSliderProps) => {
  const [scrollDirection, setScrollDirection] = useState("right");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 224; // size-56 (224px) + gap (8px)

      if (scrollDirection === "right") {
        container.scrollLeft += scrollAmount;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          setScrollDirection("left");
        }
      } else {
        container.scrollLeft -= scrollAmount;
        if (container.scrollLeft <= 0) {
          setScrollDirection("right");
        }
      }
    }
  };

  return (
    <div className="relative">
      {propertyImages?.images?.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="flex w-full overflow-x-scroll max-w-96 gap-2 no-scrollbar"
        >
          {propertyImages.images.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-secondary rounded-lg size-56 flex-shrink-0"
            >
              <img
                src={image.preview}
                alt={image.name}
                className="aspect-square bg-secondary rounded-lg size-56 object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full overflow-x-scroll max-w-96 gap-2 no-scrollbar">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-secondary rounded-lg size-56 flex-shrink-0"
            ></div>
          ))}
        </div>
      )}
      <button
        className="absolute -right-2 z-40 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full"
        onClick={handleScroll}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className={`text-primary transform ${
            scrollDirection === "left" ? "rotate-180" : ""
          }`}
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </button>
    </div>
  );
};
interface ImageFile extends File {
  preview: string;
}

type PropertyImages = {
  images: ImageFile[];
};

const PropertyListing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [propertyDetailsData, setPropertyDetailsData] = useState<
    Record<string, unknown>
  >({});
  const [amenities, setAmenities] = useState({});
  const [roomDetails, setRoomDetails] = useState({});
  const [propertyImages, setPropertyImages] = useState<PropertyImages>({
    images: [],
  });

  const handleSubmit = () => {
    console.log("Form submitted", propertyDetailsData, amenities, roomDetails);
    setActiveTab((prevTab) => prevTab + 1);
  };

  useEffect(() => {
    console.log(propertyImages.images);
  }, [propertyImages]);

  return (
    <div className="h-full p-4 flex flex-row gap-4">
      <section className="">
        <Card className="mx-auto h-full">
          <CardHeader>
            <CardTitle>
              <SliderNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </CardTitle>
            <CardDescription>{tabItems[activeTab].subheading}</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              switch (activeTab) {
                case 0:
                  return (
                    <PropertyDetails setFormData={setPropertyDetailsData} />
                  );
                case 1:
                  return <Amenities setFormData={setAmenities} />;
                case 2:
                  return <RoomListing setFormData={setRoomDetails} />;
                case 3:
                  return <PropertyImages setFormData={setPropertyImages} />;

                default:
                  return null;
              }
            })()}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button onClick={handleSubmit}>Next</Button>
          </CardFooter>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>
            <h1 className="text-xl">Preview </h1>
          </CardHeader>
          <CardContent>
            <PropertyImagesSlider
              propertyImages={propertyImages}
            ></PropertyImagesSlider>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PropertyListing;
