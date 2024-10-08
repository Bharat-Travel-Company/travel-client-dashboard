import {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
} from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { SliderNavBar } from "@/components/SliderNavBar";
import { tabItems } from "@/data/propertyListing/tabItems";

const PropertyDetails = lazy(() =>
  import("@/components/propertyListing/PropertyDetails").then((module) => ({
    default: module.PropertyDetails,
  }))
);
const Amenities = lazy(() =>
  import("@/components/propertyListing/Amenities").then((module) => ({
    default: module.Amenities,
  }))
);
const RoomListing = lazy(() =>
  import("@/components/propertyListing/RoomListing").then((module) => ({
    default: module.RoomListing,
  }))
);
const PropertyImages = lazy(() =>
  import("@/components/propertyListing/PropertyImages").then((module) => ({
    default: module.PropertyImages,
  }))
);
const Documents = lazy(() =>
  import("@/components/propertyListing/Documents").then((module) => ({
    default: module.Documents,
  }))
);

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
          className="flex w-full overflow-x-scroll  gap-2 no-scrollbar "
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

interface MergedData {
  propertyName?: string;
  propertyType?: string;
  country?: string;
  state?: string;
  city?: string;
  amenities?: Record<string, unknown>;
  roomDetails?: Record<string, unknown>;
  propertyImages?: PropertyImages;
  documentDetails?: Record<string, unknown>;
}
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
  const [documentDetails, setDocumentDetails] = useState({});
  const [mergedData, setMergedData] = useState<MergedData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateMergedData = useCallback(() => {
    setMergedData((prevData) => ({
      ...prevData,
      ...propertyDetailsData,
      amenities,
      roomDetails,
      propertyImages,
      documentDetails,
    }));
  }, [
    propertyDetailsData,
    amenities,
    roomDetails,
    propertyImages,
    documentDetails,
  ]);

  useEffect(() => {
    updateMergedData();
  }, [updateMergedData]);

  const handleNext = async () => {
    if (activeTab < tabItems.length - 1) {
      setActiveTab((prevTab) => prevTab + 1);
    } else {
      try {
        // Safely map mergedData to the desired format with fallback values
        const formattedData = {
          Property_type: mergedData.propertyType ?? "", // Fallback to an empty string if undefined
          Property_name: mergedData.propertyName ?? "",
          Property_address: {
            country: mergedData.country ?? "",
            state: mergedData.state ?? "",
            city: mergedData.city ?? "",
            streetAddress: mergedData.streetAddress ?? "",
          },
          Property_phone: mergedData.phoneNumber ?? "", // Ensure this is captured from your form
          email: mergedData.email ?? "", // Ensure email is captured from your form
          Property_amenities: mergedData.amenities?.amenities ?? [], // Fallback to an empty array if undefined
          checkInTime: {
            from: mergedData.amenities?.checkInTime?.from ?? "",
            to: mergedData.amenities?.checkInTime?.to ?? "",
          },
          checkOutTime: {
            from: mergedData.amenities?.checkOutTime?.from ?? "",
            to: mergedData.amenities?.checkOutTime?.to ?? "",
          },
          property_room: Array.isArray(mergedData.roomDetails)
            ? mergedData.roomDetails.map((room: any) => ({
                RoomType: room.roomType ?? "",
                No_Rooms: room.roomTypeNumber ?? 0,
                bed_type: room.bedType ?? "",
                no_beds: room.beds ?? 0,
                no_guest: room.guests ?? "",
                room_size: room.size ?? 0,
                base_price: room.price ?? 0,
              }))
            : [],
          documents: {
            AadharCard: mergedData.documentDetails?.aadhar_card ?? "",
            PanCard: mergedData.documentDetails?.pan_card ?? "",
            FASSiCard: mergedData.documentDetails?.fassi_number ?? "",
            BankAccount: mergedData.documentDetails?.account_number ?? "",
          },
          Property_images: mergedData.propertyImages?.images ?? [], // Fallback to an empty array if undefined
        };
  
        console.log("Form submitted", formattedData);
  
        // Send formatted data to the API
        const response = await axios.post(
          "https://travel-backend-nwtf.onrender.com/api/v1/property/property-create",
          formattedData, // Send the correctly formatted data
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("Property submitted successfully:", response.data);
        setIsSubmitted(true);
      } catch (error) {
        console.error("There was an error submitting the property:", error);
        alert("An error occurred while submitting the property. Please try again.");
      }
    }
  };
  

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab((prevTab) => prevTab - 1);
    }
  };

  useEffect(() => {
    console.log(mergedData);
  }, [mergedData]);


  return (
    <div className="h-full p-4 flex flex-row gap-4">
      <section className="">
        <Card className="mx-auto h-full">
          <CardHeader>
            <CardTitle>
              <SliderNavBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabItems={tabItems}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Submission Successful!
                </h2>
                <p>Your property listing has been submitted successfully.</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <Card>
                    <Skeleton className="w-full h-full min-h-96"></Skeleton>
                  </Card>
                }
              >
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
                    case 4:
                      return <Documents setFormData={setDocumentDetails} />;
                    default:
                      return null;
                  }
                })()}
              </Suspense>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={activeTab === 0 || isSubmitted}
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={isSubmitted}>
              {activeTab === tabItems.length - 1 ? "Submit" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>
            <h1 className="text-xl">Preview </h1>
          </CardHeader>
          <CardContent>
            <PropertyImagesSlider propertyImages={propertyImages} />
            <div className="my-2.5">
              {mergedData.propertyName && activeTab > 0 ? (
                <div className="capitalize text-lg">
                  {mergedData.propertyName}
                </div>
              ) : (
                <Skeleton className="h-2.5 w-[250px] my-4" />
              )}
            </div>
            <div className="flex justify-between my-2">
              <div>
                {mergedData.propertyType && activeTab > 0 ? (
                  <div className="capitalize">{mergedData.propertyType}</div>
                ) : (
                  <Skeleton className="h-2.5 w-24" />
                )}
              </div>
              <div>
                {mergedData.country && activeTab > 0 ? (
                  <div className="capitalize">{`${mergedData.country},${mergedData.state},${mergedData.city}`}</div>
                ) : (
                  <Skeleton className="h-2.5 w-24" />
                )}
              </div>
            </div>
            <hr className="mt-6" />
            <div className="my-3 flex justify-between">
              {mergedData && activeTab > 1 && (
                <>
                  <div className="capitalize text-md">Room Type</div>
                  <div className="capitalize text-md">Number of Rooms</div>
                </>
              )}
            </div>
            {Array.isArray(mergedData?.roomDetails) &&
              mergedData.roomDetails.map((room) => (
                <div className="flex justify-between mb-1" key={room.roomType}>
                  <div className="capitalize text-sm">{room.roomType}</div>
                  <div className="capitalize text-sm">
                    {room.roomTypeNumber}
                  </div>
                </div>
              ))}
            <hr className="my-2" />
            <div className="flex justify-between mb-1">
              <div className="capitalize text-sm">Total Rooms</div>
              <div className="capitalize text-sm">
                {Array.isArray(mergedData?.roomDetails)
                  ? mergedData.roomDetails.reduce(
                      (total, room) =>
                        total + parseInt(room.roomTypeNumber, 10),
                      0
                    )
                  : 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
;}

export default PropertyListing;
