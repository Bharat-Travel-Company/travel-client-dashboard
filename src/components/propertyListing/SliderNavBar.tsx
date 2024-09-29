import { Button } from "@/components/ui/button";
import {tabItems} from "@/data/propertyListing/tabItems"
type SliderNavBarProps = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
export const SliderNavBar = ({
  activeTab,
  setActiveTab,
}: SliderNavBarProps) => {
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
