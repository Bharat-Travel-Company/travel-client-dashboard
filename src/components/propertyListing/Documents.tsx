import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PropertyDetailsProps = {
  setFormData: (data: FormData) => void;
};

type FormData = {
  aadhar_card: string;
  pan_card: string;
  fassi_number: string;
  account_number: string;
};

export const Documents = ({
  setFormData: setParentFormData,
}: PropertyDetailsProps) => {
  const [formData, setLocalFormData] = useState<FormData>({
    aadhar_card: "",
    pan_card: "",
    fassi_number: "",
    account_number: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateAadhar = (value: string) => {
    return /^\d{12}$/.test(value);
  };

  const validatePAN = (value: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
  };

  const validateFASSI = (value: string) => {
    return /^\d{14}$/.test(value);
  };

  const validateAccountNumber = (value: string) => {
    return /^\d{9,18}$/.test(value);
  };

  useEffect(() => {
    setParentFormData(formData);
  }, [formData, setParentFormData]);

  return (
    <form action="">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aadhar_card">Aadhar Card Number</Label>
          <Input
            id="aadhar_card"
            placeholder="Aadhar Card of Owner"
            value={formData.aadhar_card}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            maxLength={12}
          />
          {formData.aadhar_card && !validateAadhar(formData.aadhar_card) && (
            <p className="text-red-500">Aadhar number must be 12 digits</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pan_card">PAN Card Number</Label>
          <Input
            id="pan_card"
            placeholder="PAN Card of Owner"
            value={formData.pan_card}
            onChange={handleInputChange}
            maxLength={10}
          />
          {formData.pan_card && !validatePAN(formData.pan_card) && (
            <p className="text-red-500">Invalid PAN number format</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="fassi_number">FASSI Number</Label>
          <Input
            id="fassi_number"
            placeholder="FASSI Number"
            value={formData.fassi_number}
            onChange={handleInputChange}
            maxLength={14}
          />
          {formData.fassi_number && !validateFASSI(formData.fassi_number) && (
            <p className="text-red-500">FASSI number must be 14 digits</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="account_number">Account Number</Label>
          <Input
            id="account_number"
            placeholder="Your property bank account number"
            value={formData.account_number}
            onChange={handleInputChange}
            maxLength={18}
          />
          {formData.account_number &&
            !validateAccountNumber(formData.account_number) && (
              <p className="text-red-500">Account number must be 9-18 digits</p>
            )}
        </div>
      </div>
    </form>
  );
};
