import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_FILE_SIZE = 10 * 1024; // 10KB
const MAX_IMAGES = 11;

interface ImageFile extends File {
  preview: string;
}

interface PropertyImagesProps {
  setFormData: React.Dispatch<React.SetStateAction<PropertyImages>>;
}

interface PropertyImages {
  images: ImageFile[];
}
export const PropertyImages: React.FC<PropertyImagesProps> = ({
  setFormData: setParentFormData,
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds the 5MB limit.`,
            variant: "destructive",
          });
          return false;
        }
        if (file.size < MIN_FILE_SIZE) {
          toast({
            title: "File too small",
            description: `${file.name} is smaller than 10KB.`,
            variant: "destructive",
          });
          return false;
        }
        if (images.some((img) => img.name === file.name)) {
          toast({
            title: "Duplicate file",
            description: `${file.name} has already been added.`,
            variant: "destructive",
          });
          return false;
        }
        return true;
      });

      if (images.length + newImages.length > MAX_IMAGES) {
        toast({
          title: "Too many images",
          description: `You can only upload a maximum of ${MAX_IMAGES} images.`,
          variant: "destructive",
        });
        newImages.splice(MAX_IMAGES - images.length);
      }

      setImages((prevImages) => [
        ...prevImages,
        ...(newImages.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ) as ImageFile[]),
      ]);
    },
    [images, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const removeImage = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  useEffect(() => {
    setParentFormData((prevState) => ({ ...prevState, images }));
  }, [images, setParentFormData]);

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  return (
    <form>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
                className="size-44 text-primary"
              >
                <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
              <span className="text-sm font-medium text-gray-500">
                {isDragActive
                  ? "Drop the files here"
                  : "Drag and drop images or click to browse"}
              </span>
              <span className="text-xs text-gray-500">
                Images Only (Max 5MB, Min 10KB)
              </span>
            </div>
            {images.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">
                  Uploaded Images Preview
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={file?.preview}
                        alt=""
                        className="h-48 w-full aspect-square object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                        {file?.name}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => removeImage(index, e)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </form>
  );
};
