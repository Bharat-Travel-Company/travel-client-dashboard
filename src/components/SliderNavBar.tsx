import { Button } from "@/components/ui/button";

interface TabItem {
  icon: JSX.Element;
  label: string;
  subheading: string;
}

type SliderNavBarProps = {
  activeTab: number;
  setActiveTab: (index: number) => void;
  tabItems: TabItem[];
};
export const SliderNavBar = ({
  activeTab,
  setActiveTab,
  tabItems,
}: SliderNavBarProps) => {
  return (
    <div className="w-full flex flex-col">
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
      <p className="text-sm my-2 text-gray-700 font-normal">{tabItems[activeTab].subheading}</p>
    </div>
  );
};
