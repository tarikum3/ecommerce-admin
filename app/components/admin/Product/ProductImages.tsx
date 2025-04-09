"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Icon,
  styled,
} from "@mui/material";
import { CloudUpload, Star, Delete } from "@mui/icons-material";
import { ProductFormData } from "./CreateProduct";

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

const ProductImages = () => {
  const { control, watch, setValue } = useFormContext<ProductFormData>();
  // const images = watch("images") || [];
  const [images, setImages] = useState<any>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
  };

  const handleRemoveImage = (id: string) => {
    // setValue(
    //   "images",
    //   images.filter((img) => img.id !== id)
    // );
    setImages((prev: any) => {
      return [...prev.filter((img: any) => img.id !== id)];
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Images
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* Upload Button */}
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <StyledUploadArea>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="product-image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="product-image-upload">
                <IconButton component="span">
                  <CloudUpload fontSize="large" />
                </IconButton>
              </label>
            </StyledUploadArea>
          )}
        />

        {/* Image Gallery */}
        {images.map((image: any) => (
          <StyledImageItem key={image.id}>
            {/* {image.featured && (
              <FeaturedStar>
                <Star />
              </FeaturedStar>
            )} */}
            <img
              src={image.url}
              alt="Product"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => handleRemoveImage(image.id)}
            >
              <Delete fontSize="small" color="primary" />
            </IconButton>
          </StyledImageItem>
        ))}
      </Box>
    </Box>
  );
};

export default ProductImages;
