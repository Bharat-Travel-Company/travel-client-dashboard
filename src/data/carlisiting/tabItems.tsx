interface TabItem {
  icon: JSX.Element;
  label: string;
  subheading: string;
}

export const tabItems: TabItem[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
      </svg>
    ),
    label: "Driver Details",
    subheading: "Essential information about the driver",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" />
      </svg>
    ),
    label: "Car Information",
    subheading: "Details about the vehicle for the service",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M260-320q25 0 42.5-17.5T320-380q0-25-17.5-42.5T260-440q-25 0-42.5 17.5T200-380q0 25 17.5 42.5T260-320Zm360 0q20 0 36-12t21-31q-20-4-38-13.5T606-401l-25-25q-10 8-15.5 20t-5.5 26q0 25 17.5 42.5T620-320Zm-460 40v-200 200Zm40 80v40q0 17-11.5 28.5T160-120h-40q-17 0-28.5-11.5T80-160v-320l84-240q6-18 21.5-29t34.5-11h140v55q0 6 .5 12.5T362-680H234l-42 120h255l80 80H160v200h560v-81q22-2 42.5-11t37.5-25v237q0 17-11.5 28.5T760-120h-40q-17 0-28.5-11.5T680-160v-40H200Zm400-520q17 0 28.5-11.5T640-760q0-17-11.5-28.5T600-800q-17 0-28.5 11.5T560-760q0 17 11.5 28.5T600-720Zm62 262L458-662q-8-8-13-19.5t-5-23.5v-155q0-25 17.5-42.5T500-920h155q12 0 23.5 5t19.5 13l204 204q17 17 17 42.5T902-613L747-458q-17 17-42.5 17T662-458Zm43-70 127-127-185-185H520v127l185 185Zm-29-156Z" />
      </svg>
    ),
    label: "Trip and Pricing Details",
    subheading: "Information about the trip and associated costs",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560L200-200Zm481-120H481v-60h200v60ZM220-600h80v80h60v-80h80v-60h-80v-80h-60v80h-80v60Z" />
      </svg>
    ),
    label: "Inclusions and Exclusions",
    subheading: "What's included and not included in the service",
  },
];
