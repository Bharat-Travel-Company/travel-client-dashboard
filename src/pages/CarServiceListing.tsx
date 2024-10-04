import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ServiceType = "Individual" | "Company";

export default function CarServiceListing() {
  const navigate = useNavigate();

  const serviceTypes: { type: ServiceType; description: string }[] = [
    {
      type: "Individual",
      description: "For personal car services and individual drivers",
    },
    {
      type: "Company",
      description: "For cab companies and fleet management",
    },
  ];

  const handleSelectType = (type: string) => {
    if (type === "individual") {
      navigate("/car-service-listing/individual");
    } else if (type === "company") {
      navigate("/car-service-listing/company");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6 sm:p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Select Service Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {serviceTypes.map(({ type, description }) => (
            <Button
              key={type}
              variant="outline"
              className="w-full h-full flex flex-col items-center justify-center p-6 space-y-4 transition-all hover:bg-secondary"
              onClick={() => handleSelectType(type.toLowerCase())}
            >
              <svg
                className="size-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h100v-80h240v80h100q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" />
              </svg>{" "}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{type}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
