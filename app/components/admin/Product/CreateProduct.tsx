// "use client";

// import React from "react";
// import { Controller, useForm } from "react-hook-form";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import Autocomplete from "@mui/material/Autocomplete";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Typography from "@mui/material/Typography";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Icon from "@mui/material/Icon";
// import { useCreateProductMutation } from "@lib/admin/store/services/product.service";

// const categoryList = [
//   "Electronics",
//   "Apparel",
//   "Home",
//   "Beauty",
//   "Sports",
//   "Books",
//   "Toys",
// ];

// const schema = z.object({
//   name: z.string().nonempty("Product Name is required."),
//   description: z.string().optional(),
//   slug: z.string().nonempty("Slug is required."),
//   sku: z.string().optional(),
//   category: z.string().optional(),
//   vendor: z.string().optional(),
//   tags: z.array(z.string()).optional(),
//   availableForSale: z.boolean(),
// });

// const defaultValues = {
//   name: "",
//   description: "",
//   slug: "",
//   sku: "",
//   category: "",
//   vendor: "",
//   tags: [],
//   availableForSale: true,
// };

// const CreateProduct: React.FC = () => {
//   const { handleSubmit, register, control, formState } = useForm({
//     defaultValues,
//     mode: "all",
//     resolver: zodResolver(schema),
//   });

//   const { errors } = formState;
//   const [createProduct] = useCreateProductMutation();

//   const handleFormSubmit = async (data: Record<string, any>) => {
//     try {
//       console.log("Submitting data...", data);
//       const response = await createProduct(data as any);
//       console.log("Data submitted successfully:", response);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <div className="flex w-full max-w-screen-md justify-start items-start ">
//       <form
//         className="w-full text-primary space-y-10 p-5 m-5"
//         onSubmit={handleSubmit(handleFormSubmit)}
//       >
//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Product Name"
//                 variant="outlined"
//                 error={!!errors.name}
//                 helperText={errors?.name?.message}
//                 required
//                 fullWidth
//               />
//             )}
//             name="name"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 variant="outlined"
//                 multiline
//                 rows={4}
//                 fullWidth
//               />
//             )}
//             name="description"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Slug"
//                 variant="outlined"
//                 error={!!errors.slug}
//                 helperText={errors?.slug?.message}
//                 required
//                 fullWidth
//               />
//             )}
//             name="slug"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField {...field} label="SKU" variant="outlined" fullWidth />
//             )}
//             name="sku"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <Autocomplete
//                 {...field}
//                 options={categoryList}
//                 getOptionLabel={(option) => option}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Category"
//                     variant="outlined"
//                     fullWidth
//                   />
//                 )}
//                 onChange={(_, value) => field.onChange(value)}
//               />
//             )}
//             name="category"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Vendor"
//                 variant="outlined"
//                 fullWidth
//               />
//             )}
//             name="vendor"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <Autocomplete
//                 {...field}
//                 multiple
//                 options={[]}
//                 freeSolo
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Tags"
//                     variant="outlined"
//                     fullWidth
//                   />
//                 )}
//                 onChange={(_, value) => field.onChange(value)}
//               />
//             )}
//             name="tags"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <FormControlLabel
//                 control={<Checkbox {...field} checked={field.value} />}
//                 label="Available For Sale"
//               />
//             )}
//             name="availableForSale"
//             control={control}
//           />
//         </div>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           size="large"
//           fullWidth
//         >
//           Create Product
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;

// "use client";

// import React, { useState, useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
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
// import { useCreateProductMutation } from "@lib/admin/store/services/product.service";

// const categoryList = [
//   "Electronics",
//   "Apparel",
//   "Home",
//   "Beauty",
//   "Sports",
//   "Books",
//   "Toys",
// ];

// // Zod schema for validation
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
//   images: z.array(z.string().url("Invalid URL")).min(1, "At least one image is required"),
//   options: z.array(
//     z.object({
//       name: z.string().min(1, "Option name is required"),
//       values: z.array(z.string().min(1, "Option value is required")).min(1, "At least one value is required"),
//     })
//   ),
//   variants: z.array(
//     z.object({
//       name: z.string().min(1, "Variant name is required"),
//       price: z.number().min(0, "Price must be positive"),
//       quantity: z.number().min(0, "Quantity must be positive"),
//       availableForSale: z.boolean().default(false),
//       options: z.array(
//         z.object({
//           name: z.string(),
//           value: z.string(),
//         })
//       ),
//     })
//   ),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// const CreateProduct = () => {
//   const [createProduct, { isLoading }] = useCreateProductMutation();
//   const [imageInput, setImageInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//     getValues,
//     trigger,
//   } = useForm<ProductFormData>({
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

//   // Watch options to generate variants
//   const options = watch("options");
//   const variants = watch("variants");

//   // Generate variants when options change
//   useEffect(() => {
//     if (options && options.length > 0) {
//       const newVariants = generateVariants(options, variants);
//       setValue("variants", newVariants);
//     }
//   }, [options]);

//   const generateVariants = (options: any[], existingVariants: any[] = []) => {
//     if (options.length === 0) return [];

//     // Generate all possible combinations of option values
//     const combinations = options.reduce((acc, option) => {
//       if (!acc.length) {
//         return option.values.map((value: string) => [{
//           name: option.name,
//           value: value
//         }]);
//       }

//       return acc.flatMap((combo: any[]) =>
//         option.values.map((value: string) => [
//           ...combo,
//           { name: option.name, value: value }
//         ])
//       );
//     }, []);

//     // Create variant objects
//     return combinations.map((options: any[], index: number) => {
//       // Try to find existing variant with these options
//       const existingVariant = existingVariants.find(variant =>
//         variant.options.length === options.length &&
//         variant.options.every((opt: any, i: number) =>
//           opt.name === options[i].name && opt.value === options[i].value
//         )
//       );

//       // Generate variant name
//       const variantName = options.map(opt => opt.value).join(" / ");

//       return existingVariant || {
//         name: variantName,
//         price: getValues("price.amount"),
//         quantity: 0,
//         availableForSale: getValues("availableForSale"),
//         options: options,
//       };
//     });
//   };

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       await createProduct(data).unwrap();
//       // Handle success (e.g., show notification, redirect)
//     } catch (error) {
//       // Handle error
//       console.error("Failed to create product:", error);
//     }
//   };

//   const handleAddImage = () => {
//     if (imageInput) {
//       const currentImages = getValues("images") || [];
//       setValue("images", [...currentImages, imageInput]);
//       setImageInput("");
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     const currentImages = getValues("images") || [];
//     setValue(
//       "images",
//       currentImages.filter((_, i) => i !== index)
//     );
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

//   const handleAddOption = () => {
//     const currentOptions = getValues("options") || [];
//     setValue("options", [...currentOptions, { name: "", values: [] }]);
//   };

//   const handleRemoveOption = (index: number) => {
//     const currentOptions = getValues("options") || [];
//     setValue(
//       "options",
//       currentOptions.filter((_, i) => i !== index)
//     );
//   };

//   const handleAddOptionValue = (optionIndex: number) => {
//     const currentOptions = [...(getValues("options") || [])];
//     currentOptions[optionIndex].values.push("");
//     setValue("options", currentOptions);
//   };

//   const handleRemoveOptionValue = (optionIndex: number, valueIndex: number) => {
//     const currentOptions = [...(getValues("options") || [])];
//     currentOptions[optionIndex].values.splice(valueIndex, 1);
//     setValue("options", currentOptions);
//   };

//   const handleVariantChange = (variantIndex: number, field: string, value: any) => {
//     const currentVariants = [...(getValues("variants") || [])];
//     currentVariants[variantIndex][field] = value;
//     setValue("variants", currentVariants);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Create New Product
//       </Typography>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Basic Information
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="name"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Product Name"
//                   fullWidth
//                   error={!!errors.name}
//                   helperText={errors.name?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="slug"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Slug"
//                   fullWidth
//                   error={!!errors.slug}
//                   helperText={errors.slug?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="description"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Description"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   error={!!errors.description}
//                   helperText={errors.description?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="sku"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="SKU"
//                   fullWidth
//                   error={!!errors.sku}
//                   helperText={errors.sku?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="vendor"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Vendor"
//                   fullWidth
//                   error={!!errors.vendor}
//                   helperText={errors.vendor?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <Autocomplete
//                   {...field}
//                   options={categoryList}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Category"
//                       error={!!errors.category}
//                       helperText={errors.category?.message}
//                     />
//                   )}
//                   onChange={(_, value) => field.onChange(value)}
//                   value={field.value || null}
//                   freeSolo
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="availableForSale"
//               control={control}
//               render={({ field }) => (
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={field.value}
//                       onChange={(e) => field.onChange(e.target.checked)}
//                     />
//                   }
//                   label="Available for Sale"
//                 />
//               )}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Pricing
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="price.amount"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Price"
//                   type="number"
//                   fullWidth
//                   error={!!errors.price?.amount}
//                   helperText={errors.price?.amount?.message}
//                   onChange={(e) => field.onChange(parseFloat(e.target.value))}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="price.currency"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Currency"
//                   fullWidth
//                   error={!!errors.price?.currency}
//                   helperText={errors.price?.currency?.message}
//                 />
//               )}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Images
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             {watch("images")?.map((image, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <img
//                   src={image}
//                   alt={`Preview ${index}`}
//                   style={{ width: 50, height: 50, marginRight: 10 }}
//                 />
//                 <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                   {image}
//                 </Typography>
//                 <IconButton onClick={() => handleRemoveImage(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//           </Grid>
//           <Grid item xs={12} sm={10}>
//             <TextField
//               value={imageInput}
//               onChange={(e) => setImageInput(e.target.value)}
//               label="Image URL"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="contained"
//               onClick={handleAddImage}
//               fullWidth
//               startIcon={<AddIcon />}
//             >
//               Add
//             </Button>
//           </Grid>
//         </Grid>
//         {errors.images && (
//           <Typography color="error" variant="body2">
//             {errors.images.message}
//           </Typography>
//         )}
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Tags
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             {watch("tags")?.map((tag, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                   {tag}
//                 </Typography>
//                 <IconButton onClick={() => handleRemoveTag(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//           </Grid>
//           <Grid item xs={12} sm={10}>
//             <TextField
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               label="Tag"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="contained"
//               onClick={handleAddTag}
//               fullWidth
//               startIcon={<AddIcon />}
//             >
//               Add
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography variant="h6">Options</Typography>
//           <Button
//             variant="contained"
//             onClick={handleAddOption}
//             startIcon={<AddIcon />}
//           >
//             Add Option
//           </Button>
//         </Box>

//         {watch("options")?.map((option, optionIndex) => (
//           <Paper key={optionIndex} sx={{ p: 2, mb: 2 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Controller
//                 name={`options.${optionIndex}.name`}
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Option Name"
//                     sx={{ flexGrow: 1, mr: 2 }}
//                     error={!!errors.options?.[optionIndex]?.name}
//                     helperText={errors.options?.[optionIndex]?.name?.message}
//                   />
//                 )}
//               />
//               <IconButton onClick={() => handleRemoveOption(optionIndex)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle2">Values</Typography>
//               {option.values.map((value, valueIndex) => (
//                 <Box
//                   key={valueIndex}
//                   sx={{ display: "flex", alignItems: "center", mt: 1 }}
//                 >
//                   <Controller
//                     name={`options.${optionIndex}.values.${valueIndex}`}
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Value"
//                         sx={{ flexGrow: 1, mr: 2 }}
//                         error={
//                           !!errors.options?.[optionIndex]?.values?.[valueIndex]
//                         }
//                         helperText={
//                           errors.options?.[optionIndex]?.values?.[valueIndex]
//                             ?.message
//                         }
//                       />
//                     )}
//                   />
//                   <IconButton
//                     onClick={() =>
//                       handleRemoveOptionValue(optionIndex, valueIndex)
//                     }
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//               <Button
//                 variant="outlined"
//                 onClick={() => handleAddOptionValue(optionIndex)}
//                 startIcon={<AddIcon />}
//                 sx={{ mt: 1 }}
//               >
//                 Add Value
//               </Button>
//             </Box>
//           </Paper>
//         ))}
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography variant="h6">
//             Variants ({variants?.length || 0})
//           </Typography>
//         </Box>

//         {variants?.length > 0 ? (
//           <Grid container spacing={2}>
//             {variants.map((variant, variantIndex) => (
//               <Grid item xs={12} sm={6} md={4} key={variantIndex}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     {variant.name}
//                   </Typography>

//                   <Box sx={{ mb: 2 }}>
//                     {variant.options.map((option: any, index: number) => (
//                       <Typography key={index} variant="body2">
//                         <strong>{option.name}:</strong> {option.value}
//                       </Typography>
//                     ))}
//                   </Box>

//                   <TextField
//                     label="Price"
//                     type="number"
//                     fullWidth
//                     value={variant.price}
//                     onChange={(e) =>
//                       handleVariantChange(
//                         variantIndex,
//                         "price",
//                         parseFloat(e.target.value)
//                       )
//                     }
//                     sx={{ mb: 2 }}
//                   />

//                   <TextField
//                     label="Quantity"
//                     type="number"
//                     fullWidth
//                     value={variant.quantity}
//                     onChange={(e) =>
//                       handleVariantChange(
//                         variantIndex,
//                         "quantity",
//                         parseInt(e.target.value)
//                       )
//                     }
//                     sx={{ mb: 2 }}
//                   />

//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={variant.availableForSale}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             variantIndex,
//                             "availableForSale",
//                             e.target.checked
//                           )
//                         }
//                       />
//                     }
//                     label="Available"
//                   />
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="body1" color="textSecondary">
//             Add options to generate variants
//           </Typography>
//         )}
//       </Paper>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           size="large"
//           disabled={isLoading}
//         >
//           {isLoading ? "Creating..." : "Create Product"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CreateProduct;

// "use client";

// import React, { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
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
// import { useCreateProductMutation } from "@lib/admin/store/services/product.service";

// const categoryList = [
//   "Electronics",
//   "Apparel",
//   "Home",
//   "Beauty",
//   "Sports",
//   "Books",
//   "Toys",
// ];

// // Zod schema for validation
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

// type ProductFormData = z.infer<typeof productSchema>;

// const CreateProduct = () => {
//   const [createProduct, { isLoading }] = useCreateProductMutation();
//   const [imageInput, setImageInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//     getValues,
//   } = useForm<ProductFormData>({
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

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       await createProduct(data as any).unwrap();
//       // Handle success (e.g., show notification, redirect)
//     } catch (error) {
//       // Handle error
//       console.error("Failed to create product:", error);
//     }
//   };

//   const handleAddImage = () => {
//     if (imageInput) {
//       const currentImages = getValues("images") || [];
//       setValue("images", [...currentImages, imageInput]);
//       setImageInput("");
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     const currentImages = getValues("images") || [];
//     setValue(
//       "images",
//       currentImages.filter((_, i) => i !== index)
//     );
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

//   const handleAddOption = () => {
//     const currentOptions = getValues("options") || [];
//     setValue("options", [...currentOptions, { name: "", values: [] }]);
//   };

//   const handleRemoveOption = (index: number) => {
//     const currentOptions = getValues("options") || [];
//     setValue(
//       "options",
//       currentOptions.filter((_, i) => i !== index)
//     );
//   };

//   const handleAddOptionValue = (optionIndex: number) => {
//     const currentOptions = [...(getValues("options") || [])];
//     currentOptions[optionIndex].values.push("");
//     setValue("options", currentOptions);
//   };

//   const handleRemoveOptionValue = (optionIndex: number, valueIndex: number) => {
//     const currentOptions = [...(getValues("options") || [])];
//     currentOptions[optionIndex].values.splice(valueIndex, 1);
//     setValue("options", currentOptions);
//   };

//   const handleAddVariant = () => {
//     const currentVariants = getValues("variants") || [];
//     setValue("variants", [
//       ...currentVariants,
//       {
//         name: "",
//         price: 0,
//         quantity: 0,
//         availableForSale: false,
//         selectedOptions: [],
//       },
//     ]);
//   };

//   const handleRemoveVariant = (index: number) => {
//     const currentVariants = getValues("variants") || [];
//     setValue(
//       "variants",
//       currentVariants.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Create New Product
//       </Typography>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Basic Information
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="name"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Product Name"
//                   fullWidth
//                   error={!!errors.name}
//                   helperText={errors.name?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="slug"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Slug"
//                   fullWidth
//                   error={!!errors.slug}
//                   helperText={errors.slug?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="description"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Description"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   error={!!errors.description}
//                   helperText={errors.description?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="sku"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="SKU"
//                   fullWidth
//                   error={!!errors.sku}
//                   helperText={errors.sku?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="vendor"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Vendor"
//                   fullWidth
//                   error={!!errors.vendor}
//                   helperText={errors.vendor?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <Autocomplete
//                   {...field}
//                   options={categoryList}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Category"
//                       error={!!errors.category}
//                       helperText={errors.category?.message}
//                     />
//                   )}
//                   onChange={(_, value) => field.onChange(value)}
//                   value={field.value || null}
//                   freeSolo
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="availableForSale"
//               control={control}
//               render={({ field }) => (
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={field.value}
//                       onChange={(e) => field.onChange(e.target.checked)}
//                     />
//                   }
//                   label="Available for Sale"
//                 />
//               )}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Pricing
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="price.amount"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Price"
//                   type="number"
//                   fullWidth
//                   error={!!errors.price?.amount}
//                   helperText={errors.price?.amount?.message}
//                   onChange={(e) => field.onChange(parseFloat(e.target.value))}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Controller
//               name="price.currency"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Currency"
//                   fullWidth
//                   error={!!errors.price?.currency}
//                   helperText={errors.price?.currency?.message}
//                 />
//               )}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Images
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             {watch("images")?.map((image, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <img
//                   src={image}
//                   alt={`Preview ${index}`}
//                   style={{ width: 50, height: 50, marginRight: 10 }}
//                 />
//                 <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                   {image}
//                 </Typography>
//                 <IconButton onClick={() => handleRemoveImage(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//           </Grid>
//           <Grid item xs={12} sm={10}>
//             <TextField
//               value={imageInput}
//               onChange={(e) => setImageInput(e.target.value)}
//               label="Image URL"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="contained"
//               onClick={handleAddImage}
//               fullWidth
//               startIcon={<AddIcon />}
//             >
//               Add
//             </Button>
//           </Grid>
//         </Grid>
//         {errors.images && (
//           <Typography color="error" variant="body2">
//             {errors.images.message}
//           </Typography>
//         )}
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Tags
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             {watch("tags")?.map((tag, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                   {tag}
//                 </Typography>
//                 <IconButton onClick={() => handleRemoveTag(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//           </Grid>
//           <Grid item xs={12} sm={10}>
//             <TextField
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               label="Tag"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="contained"
//               onClick={handleAddTag}
//               fullWidth
//               startIcon={<AddIcon />}
//             >
//               Add
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography variant="h6">Options</Typography>
//           <Button
//             variant="contained"
//             onClick={handleAddOption}
//             startIcon={<AddIcon />}
//           >
//             Add Option
//           </Button>
//         </Box>

//         {watch("options")?.map((option, optionIndex) => (
//           <Paper key={optionIndex} sx={{ p: 2, mb: 2 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Controller
//                 name={`options.${optionIndex}.name`}
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Option Name"
//                     sx={{ flexGrow: 1, mr: 2 }}
//                     error={!!errors.options?.[optionIndex]?.name}
//                     helperText={errors.options?.[optionIndex]?.name?.message}
//                   />
//                 )}
//               />
//               <IconButton onClick={() => handleRemoveOption(optionIndex)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle2">Values</Typography>
//               {option.values.map((value, valueIndex) => (
//                 <Box
//                   key={valueIndex}
//                   sx={{ display: "flex", alignItems: "center", mt: 1 }}
//                 >
//                   <Controller
//                     name={`options.${optionIndex}.values.${valueIndex}`}
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Value"
//                         sx={{ flexGrow: 1, mr: 2 }}
//                         error={
//                           !!errors.options?.[optionIndex]?.values?.[valueIndex]
//                         }
//                         helperText={
//                           errors.options?.[optionIndex]?.values?.[valueIndex]
//                             ?.message
//                         }
//                       />
//                     )}
//                   />
//                   <IconButton
//                     onClick={() =>
//                       handleRemoveOptionValue(optionIndex, valueIndex)
//                     }
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//               <Button
//                 variant="outlined"
//                 onClick={() => handleAddOptionValue(optionIndex)}
//                 startIcon={<AddIcon />}
//                 sx={{ mt: 1 }}
//               >
//                 Add Value
//               </Button>
//             </Box>
//           </Paper>
//         ))}
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography variant="h6">Variants</Typography>
//           <Button
//             variant="contained"
//             onClick={handleAddVariant}
//             startIcon={<AddIcon />}
//           >
//             Add Variant
//           </Button>
//         </Box>

//         {watch("variants")?.map((variant, variantIndex) => (
//           <Paper key={variantIndex} sx={{ p: 2, mb: 2 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Typography variant="subtitle1">
//                 Variant #{variantIndex + 1}
//               </Typography>
//               <IconButton onClick={() => handleRemoveVariant(variantIndex)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Box>

//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12} md={6}>
//                 <Controller
//                   name={`variants.${variantIndex}.name`}
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Variant Name"
//                       fullWidth
//                       error={!!errors.variants?.[variantIndex]?.name}
//                       helperText={
//                         errors.variants?.[variantIndex]?.name?.message
//                       }
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Controller
//                   name={`variants.${variantIndex}.price`}
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Price"
//                       type="number"
//                       fullWidth
//                       error={!!errors.variants?.[variantIndex]?.price}
//                       helperText={
//                         errors.variants?.[variantIndex]?.price?.message
//                       }
//                       onChange={(e) =>
//                         field.onChange(parseFloat(e.target.value))
//                       }
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Controller
//                   name={`variants.${variantIndex}.quantity`}
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Quantity"
//                       type="number"
//                       fullWidth
//                       error={!!errors.variants?.[variantIndex]?.quantity}
//                       helperText={
//                         errors.variants?.[variantIndex]?.quantity?.message
//                       }
//                       onChange={(e) => field.onChange(parseInt(e.target.value))}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Controller
//                   name={`variants.${variantIndex}.availableForSale`}
//                   control={control}
//                   render={({ field }) => (
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={field.value}
//                           onChange={(e) => field.onChange(e.target.checked)}
//                         />
//                       }
//                       label="Available for Sale"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle2">Selected Options</Typography>
//               {watch("options")?.map((option, optionIndex) => (
//                 <Controller
//                   key={optionIndex}
//                   name={`variants.${variantIndex}.selectedOptions.${optionIndex}.value`}
//                   control={control}
//                   render={({ field }) => (
//                     <Autocomplete
//                       options={option.values}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label={option.name}
//                           fullWidth
//                           sx={{ mt: 1 }}
//                         />
//                       )}
//                       onChange={(_, value) => {
//                         const currentSelectedOptions = [
//                           ...(getValues(
//                             `variants.${variantIndex}.selectedOptions`
//                           ) || []),
//                         ];
//                         currentSelectedOptions[optionIndex] = {
//                           optionName: option.name,
//                           value: value || "",
//                         };
//                         setValue(
//                           `variants.${variantIndex}.selectedOptions`,
//                           currentSelectedOptions
//                         );
//                       }}
//                       value={
//                         getValues(
//                           `variants.${variantIndex}.selectedOptions.${optionIndex}`
//                         )?.value || null
//                       }
//                     />
//                   )}
//                 />
//               ))}
//             </Box>
//           </Paper>
//         ))}
//       </Paper>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           size="large"
//           disabled={isLoading}
//         >
//           {isLoading ? "Creating..." : "Create Product"}
//         </Button>
//       </Box>
//     </Box>
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
import { useCreateProductMutation } from "@lib/admin/store/services/product.service";
import ProductOptions from "./ProductOptions";
import ProductVariant from "./ProductVariant";
import ProductImages from "./ProductImages";
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

const CreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [imageInput, setImageInput] = useState("");
  const [tagInput, setTagInput] = useState("");

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
      console.log("optionssssvariantsnewVariantsss", newVariants);
    }
    console.log("optionssss", options);
    console.log("optionssssvariants", variants);
  }, [options]);

  const generateVariants = (options: any[], existingVariants: any[] = []) => {
    console.log("optionsssscombinationsoptions", options);
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

      return acc.flatMap((combo: any[]) =>
        option.values.map((value: string) => [
          ...combo,
          { optionName: option.name, value: value },
        ])
      );
    }, []);
    console.log("optionsssscombinations", combinations);
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
      // Handle success (e.g., show notification, redirect)
    } catch (error) {
      // Handle error
      console.error("Failed to create product:", error);
    }
  };

  const handleAddImage = () => {
    if (imageInput) {
      const currentImages = getValues("images") || [];
      setValue("images", [...currentImages, imageInput]);
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = getValues("images") || [];
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
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

        {/* <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {watch("images")?.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {image}
                  </Typography>
                  <IconButton onClick={() => handleRemoveImage(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                label="Image URL"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                onClick={handleAddImage}
                fullWidth
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {errors.images && (
            <Typography color="error" variant="body2">
              {errors.images.message}
            </Typography>
          )}
        </Paper> */}

        {/* <ProductImages /> */}
        <UploadImage />

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

        {/* <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Variants</Typography>
          <Button
            variant="contained"
            onClick={() =>
              appendVariant({
                name: "",
                price: 0,
                quantity: 0,
                availableForSale: false,
                selectedOptions: [],
              })
            }
            startIcon={<AddIcon />}
          >
            Add Variant
          </Button>
        </Box>

        {variantFields.map((field, index) => (
          <ProductVariant
            key={field.id}
            control={control}
            variantIndex={index}
            options={watch("options") || []}
            onRemove={() => removeVariant(index)}
          />
        ))}
      </Paper> */}

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
