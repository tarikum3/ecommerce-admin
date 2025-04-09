"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Icon,
  styled,
} from "@mui/material";
import { CloudUpload, Star, Delete } from "@mui/icons-material";

interface ImageType {
  id: string;
  url: string;
  featured?: boolean;
}

interface UploadImageProps {
  defaultImages?: ImageType[];
  onUpload?: (file: File) => Promise<string>; // Returns image URL
  onDelete?: (id: string) => void;
  onSetFeatured?: (id: string) => void;
  title?: string;
  maxImages?: number;
}

const StyledUploadArea = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 128,
  height: 128,
  borderRadius: 16,
  margin: theme.spacing(1),
  overflow: "hidden",
  cursor: "pointer",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const StyledImageItem = styled(Paper)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 128,
  height: 128,
  borderRadius: 16,
  margin: theme.spacing(1),
  overflow: "hidden",
  cursor: "pointer",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
  "&.featured": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const FeaturedStar = styled(Icon)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  color: theme.palette.warning.main,
}));

const UploadImage = ({
  defaultImages = [],
  onUpload,
  onDelete,
  onSetFeatured,
  title = "Images",
  maxImages,
}: UploadImageProps) => {
  const [images, setImages] = useState<ImageType[]>(defaultImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || (maxImages && images.length >= maxImages)) return;

    setIsUploading(true);
    try {
      if (onUpload) {
        const imageUrl = await onUpload(file);
        const newImage = {
          id: Date.now().toString(),
          url: imageUrl,
        };
        setImages((prev) => [...prev, newImage]);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = {
            url: event.target?.result as string,
            id: Date.now().toString(), // Simple ID generation
          };
          //setValue("images", [...images, newImage]);
          setImages((prev: any) => {
            return [...prev, newImage];
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSetFeatured = (id: string) => {
    if (!onSetFeatured) return;

    onSetFeatured(id);
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        featured: img.id === id,
      }))
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* Upload Button - only show if not at max images */}
        {(!maxImages || images.length < maxImages) && (
          <StyledUploadArea>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="generic-image-upload"
              type="file"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            <label htmlFor="generic-image-upload">
              <IconButton component="span" disabled={isUploading}>
                {isUploading ? (
                  <Icon fontSize="large">hourglass_empty</Icon>
                ) : (
                  <CloudUpload fontSize="large" />
                )}
              </IconButton>
            </label>
          </StyledUploadArea>
        )}

        {/* Image Gallery */}
        {images.map((image) => (
          <StyledImageItem
            key={image.id}
            className={image.featured ? "featured" : ""}
            onClick={() => onSetFeatured && handleSetFeatured(image.id)}
          >
            {image.featured && onSetFeatured && (
              <FeaturedStar>
                <Star />
              </FeaturedStar>
            )}
            <img
              src={image.url}
              alt="Uploaded content"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            <IconButton
              sx={{ position: "absolute", bottom: 8, right: 8 }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(image.id);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </StyledImageItem>
        ))}
      </Box>
    </Box>
  );
};

export default UploadImage;
