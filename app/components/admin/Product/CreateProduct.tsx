// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Controller,
//   useForm,
//   useFieldArray,
//   FormProvider,
// } from "react-hook-form";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import Autocomplete from "@mui/material/Autocomplete";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Typography from "@mui/material/Typography";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "@lib/admin/store/services/product.service";
// import ProductOptions from "./ProductOptions";
// import ProductVariant from "./ProductVariant";
// import ProductImages from "./ProductImages";
// import UploadImage from "./UploadImage";
// const categoryList = [
//   "Electronics",
//   "Apparel",
//   "Home",
//   "Beauty",
//   "Sports",
//   "Books",
//   "Toys",
// ];

// const productSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   sku: z.string().optional(),
//   vendor: z.string().optional(),
//   tags: z.array(z.string()).optional(),
//   category: z.string().optional(),
//   slug: z.string().min(1, "Slug is required"),
//   availableForSale: z.boolean().default(false),
//   price: z.object({
//     amount: z.number().min(0, "Price must be positive"),
//     currency: z.string().min(1, "Currency is required"),
//   }),
//   images: z
//     .array(z.string().url("Invalid URL"))
//     .min(1, "At least one image is required"),
//   options: z.array(
//     z.object({
//       name: z.string().min(1, "Option name is required"),
//       values: z
//         .array(z.string().min(1, "Option value is required"))
//         .min(1, "At least one value is required"),
//     })
//   ),
//   variants: z.array(
//     z.object({
//       name: z.string().min(1, "Variant name is required"),
//       price: z.number().min(0, "Price must be positive"),
//       quantity: z.number().min(0, "Quantity must be positive"),
//       availableForSale: z.boolean().default(false),
//       selectedOptions: z.array(
//         z.object({
//           optionName: z.string(),
//           value: z.string(),
//         })
//       ),
//     })
//   ),
// });

// export type ProductFormData = z.infer<typeof productSchema>;

// const CreateProduct = () => {
//   const [createProduct, { isLoading }] = useCreateProductMutation();
//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [imageInput, setImageInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const methods = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       slug: "",
//       availableForSale: false,
//       price: {
//         amount: 0,
//         currency: "USD",
//       },
//       images: [],
//       options: [],
//       variants: [],
//     },
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//     getValues,
//   } = methods;
//   const {
//     fields: variantFields,
//     append: appendVariant,
//     remove: removeVariant,
//   } = useFieldArray({
//     control,
//     name: "variants",
//   });

//   const options = watch("options");
//   const variants = watch("variants");

//   useEffect(() => {
//     if (options && options.length > 0) {
//       const newVariants = generateVariants(options, variants);
//       setValue("variants", newVariants);
//       console.log("optionssssvariantsnewVariantsss", newVariants);
//     }
//     console.log("optionssss", options);
//     console.log("optionssssvariants", variants);
//   }, [options]);

//   const generateVariants = (options: any[], existingVariants: any[] = []) => {
//     console.log("optionsssscombinationsoptions", options);
//     if (options.length === 0) return [];

//     const combinations = options.reduce((acc, option) => {
//       if (!acc.length) {
//         return option.values.map((value: string) => [
//           {
//             optionName: option.name,
//             value: value,
//           },
//         ]);
//       }
//       if (!option.values.length) {
//         return acc;
//       }
//       return acc.flatMap((combo: any[]) => {
//         return option.values.map((value: string) => [
//           ...combo,
//           { optionName: option.name, value: value },
//         ]);
//       });
//     }, []);
//     console.log("optionsssscombinations", combinations);
//     return combinations.map((options: any[], index: number) => {
//       const existingVariant = existingVariants.find(
//         (variant) =>
//           variant.selectedOptions.length === options.length &&
//           variant.selectedOptions.every(
//             (opt: any, i: number) =>
//               opt.optionName === options[i].optionName &&
//               opt.value === options[i].value
//           )
//       );

//       const variantName = options.map((opt) => opt.value).join(" / ");

//       return (
//         existingVariant || {
//           name: variantName,
//           price: getValues("price.amount"),
//           quantity: 0,
//           availableForSale: getValues("availableForSale"),
//           selectedOptions: options,
//         }
//       );
//     });
//   };

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       await createProduct(data as any).unwrap();
//       // Handle success (e.g., show notification, redirect)
//     } catch (error) {
//       // Handle error
//       console.error("Failed to create product:", error);
//     }
//   };

//   const handleUpload = async (file: File) => {
//     try {
//       const result = await uploadProductImage({ image: file });
//       console.log("imageresult", result);
//       if ("data" in result) {
//         return result.data.url; // Extract and return just the URL string
//       }
//       throw new Error(result.error.toString()); // Convert error case to rejection
//     } catch (error) {
//       throw error; // Re-throw to maintain Promise<string> return type
//     }
//   };

//   const handleAddTag = () => {
//     if (tagInput) {
//       const currentTags = getValues("tags") || [];
//       setValue("tags", [...currentTags, tagInput]);
//       setTagInput("");
//     }
//   };

//   const handleRemoveTag = (index: number) => {
//     const currentTags = getValues("tags") || [];
//     setValue(
//       "tags",
//       currentTags.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <FormProvider {...methods}>
//       <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Create New Product
//         </Typography>

//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Basic Information
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="name"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Product Name"
//                     fullWidth
//                     error={!!errors.name}
//                     helperText={errors.name?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="slug"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Slug"
//                     fullWidth
//                     error={!!errors.slug}
//                     helperText={errors.slug?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Controller
//                 name="description"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Description"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     error={!!errors.description}
//                     helperText={errors.description?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="sku"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="SKU"
//                     fullWidth
//                     error={!!errors.sku}
//                     helperText={errors.sku?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="vendor"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Vendor"
//                     fullWidth
//                     error={!!errors.vendor}
//                     helperText={errors.vendor?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="category"
//                 control={control}
//                 render={({ field }) => (
//                   <Autocomplete
//                     {...field}
//                     options={categoryList}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Category"
//                         error={!!errors.category}
//                         helperText={errors.category?.message}
//                       />
//                     )}
//                     onChange={(_, value) => field.onChange(value)}
//                     value={field.value || null}
//                     freeSolo
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="availableForSale"
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={field.value}
//                         onChange={(e) => field.onChange(e.target.checked)}
//                       />
//                     }
//                     label="Available for Sale"
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </Paper>

//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Pricing
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="price.amount"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Price"
//                     type="number"
//                     fullWidth
//                     error={!!errors.price?.amount}
//                     helperText={errors.price?.amount?.message}
//                     onChange={(e) => field.onChange(parseFloat(e.target.value))}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="price.currency"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Currency"
//                     fullWidth
//                     error={!!errors.price?.currency}
//                     helperText={errors.price?.currency?.message}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Images
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               {watch("images")?.map((image, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     mb: 1,
//                   }}
//                 >
//                   <img
//                     src={image}
//                     alt={`Preview ${index}`}
//                     style={{ width: 50, height: 50, marginRight: 10 }}
//                   />
//                   <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                     {image}
//                   </Typography>
//                   <IconButton onClick={() => handleRemoveImage(index)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Grid>
//             <Grid item xs={12} sm={10}>
//               <TextField
//                 value={imageInput}
//                 onChange={(e) => setImageInput(e.target.value)}
//                 label="Image URL"
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               <Button
//                 variant="contained"
//                 onClick={handleAddImage}
//                 fullWidth
//                 startIcon={<AddIcon />}
//               >
//                 Add
//               </Button>
//             </Grid>
//           </Grid>
//           {errors.images && (
//             <Typography color="error" variant="body2">
//               {errors.images.message}
//             </Typography>
//           )}
//         </Paper> */}

//         {/* <ProductImages /> */}
//         <UploadImage onUpload={handleUpload} />

//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Tags
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               {watch("tags")?.map((tag, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                     {tag}
//                   </Typography>
//                   <IconButton onClick={() => handleRemoveTag(index)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Grid>
//             <Grid item xs={12} sm={10}>
//               <TextField
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 label="Tag"
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               <Button
//                 variant="contained"
//                 onClick={handleAddTag}
//                 fullWidth
//                 startIcon={<AddIcon />}
//               >
//                 Add
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>

//         <ProductOptions control={control} />

//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">
//               Variants ({variants?.length || 0})
//             </Typography>
//           </Box>

//           {variants?.length > 0 ? (
//             <Grid container spacing={2}>
//               {variants.map((variant, variantIndex) => (
//                 <Grid item xs={12} sm={6} md={4} key={variantIndex}>
//                   <ProductVariant
//                     control={control}
//                     variantIndex={variantIndex}
//                     options={options || []}
//                     onRemove={() => removeVariant(variantIndex)}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               Add options to generate variants
//             </Typography>
//           )}
//         </Paper>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             size="large"
//             disabled={isLoading}
//           >
//             {isLoading ? "Creating..." : "Create Product"}
//           </Button>
//         </Box>
//       </Box>
//     </FormProvider>
//   );
// };

// export default CreateProduct;

"use client";

import React, { useState, useEffect } from "react";
import {
  Controller,
  useForm,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "@lib/admin/store/services/product.service";
import ProductOptions from "./ProductOptions";
import ProductVariant from "./ProductVariant";
import UploadImage from "./UploadImage";

const categoryList = [
  "Electronics",
  "Apparel",
  "Home",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
];

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  sku: z.string().optional(),
  vendor: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  availableForSale: z.boolean().default(false),
  price: z.object({
    amount: z.number().min(0, "Price must be positive"),
    currency: z.string().min(1, "Currency is required"),
  }),
  images: z
    .array(z.string().url("Invalid URL"))
    .min(1, "At least one image is required"),
  options: z.array(
    z.object({
      name: z.string().min(1, "Option name is required"),
      values: z
        .array(z.string().min(1, "Option value is required"))
        .min(1, "At least one value is required"),
    })
  ),
  variants: z.array(
    z.object({
      name: z.string().min(1, "Variant name is required"),
      price: z.number().min(0, "Price must be positive"),
      quantity: z.number().min(0, "Quantity must be positive"),
      availableForSale: z.boolean().default(false),
      selectedOptions: z.array(
        z.object({
          optionName: z.string(),
          value: z.string(),
        })
      ),
    })
  ),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface ImageType {
  id: string;
  url: string;
}

const CreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      availableForSale: false,
      price: {
        amount: 0,
        currency: "USD",
      },
      images: [],
      options: [],
      variants: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = methods;

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const options = watch("options");
  const variants = watch("variants");

  useEffect(() => {
    if (options && options.length > 0) {
      const newVariants = generateVariants(options, variants);
      setValue("variants", newVariants);
    }
  }, [options]);

  useEffect(() => {
    const imageUrls = images.map((img) => img.url);
    setValue("images", imageUrls);
  }, [images, setValue]);

  const generateVariants = (options: any[], existingVariants: any[] = []) => {
    if (options.length === 0) return [];

    const combinations = options.reduce((acc, option) => {
      if (!acc.length) {
        return option.values.map((value: string) => [
          {
            optionName: option.name,
            value: value,
          },
        ]);
      }
      if (!option.values.length) {
        return acc;
      }
      return acc.flatMap((combo: any[]) => {
        return option.values.map((value: string) => [
          ...combo,
          { optionName: option.name, value: value },
        ]);
      });
    }, []);

    return combinations.map((options: any[], index: number) => {
      const existingVariant = existingVariants.find(
        (variant) =>
          variant.selectedOptions.length === options.length &&
          variant.selectedOptions.every(
            (opt: any, i: number) =>
              opt.optionName === options[i].optionName &&
              opt.value === options[i].value
          )
      );

      const variantName = options.map((opt) => opt.value).join(" / ");

      return (
        existingVariant || {
          name: variantName,
          price: getValues("price.amount"),
          quantity: 0,
          availableForSale: getValues("availableForSale"),
          selectedOptions: options,
        }
      );
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data as any).unwrap();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleUpload = async (file: File): Promise<string> => {
    try {
      const result = await uploadProductImage({ image: file });
      if ("data" in result) {
        return result.data.url;
      }
      throw new Error(result.error.toString());
    } catch (error) {
      throw error;
    }
  };

  const handleImagesChange = (newImages: ImageType[]) => {
    setImages(newImages);
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAddTag = () => {
    if (tagInput) {
      const currentTags = getValues("tags") || [];
      setValue("tags", [...currentTags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    const currentTags = getValues("tags") || [];
    setValue(
      "tags",
      currentTags.filter((_, i) => i !== index)
    );
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Product
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Slug"
                    fullWidth
                    error={!!errors.slug}
                    helperText={errors.slug?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="SKU"
                    fullWidth
                    error={!!errors.sku}
                    helperText={errors.sku?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="vendor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Vendor"
                    fullWidth
                    error={!!errors.vendor}
                    helperText={errors.vendor?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={categoryList}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        error={!!errors.category}
                        helperText={errors.category?.message}
                      />
                    )}
                    onChange={(_, value) => field.onChange(value)}
                    value={field.value || null}
                    freeSolo
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="availableForSale"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Available for Sale"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="price.amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    error={!!errors.price?.amount}
                    helperText={errors.price?.amount?.message}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="price.currency"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Currency"
                    fullWidth
                    error={!!errors.price?.currency}
                    helperText={errors.price?.currency?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <UploadImage
            defaultImages={images}
            onUpload={handleUpload}
            onDelete={handleDeleteImage}
            onChange={handleImagesChange}
            title="Product Images"
            maxImages={10}
          />
          {errors.images && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.images.message}
            </Typography>
          )}
        </Paper>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {watch("tags")?.map((tag, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {tag}
                  </Typography>
                  <IconButton onClick={() => handleRemoveTag(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                label="Tag"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                onClick={handleAddTag}
                fullWidth
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <ProductOptions control={control} />

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">
              Variants ({variants?.length || 0})
            </Typography>
          </Box>

          {variants?.length > 0 ? (
            <Grid container spacing={2}>
              {variants.map((variant, variantIndex) => (
                <Grid item xs={12} sm={6} md={4} key={variantIndex}>
                  <ProductVariant
                    control={control}
                    variantIndex={variantIndex}
                    options={options || []}
                    onRemove={() => removeVariant(variantIndex)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Add options to generate variants
            </Typography>
          )}
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default CreateProduct;
