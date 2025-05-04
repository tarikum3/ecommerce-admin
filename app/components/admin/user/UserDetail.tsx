// "use client";

// import React, { useEffect } from "react";
// import { useForm, Controller, FormProvider } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Box,
//   Paper,
//   Autocomplete,
//   CircularProgress,
// } from "@mui/material";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
// } from "@/lib/admin/store/services/user.service";
// import { useGetRolesQuery } from "@/lib/admin/store/services/role.service";

// const schema = z.object({
//   id: z.string(),
//   email: z.string().email("Invalid email"),
//   firstName: z.string().optional(),
//   lastName: z.string().optional(),
//   phone: z.string().optional(),
//   roleId: z.string().optional(),
//   role: z
//     .object({
//       id: z.string(),
//       name: z.string(),
//     })
//     .optional(),
// });

// type FormData = z.infer<typeof schema>;

// const UserDetail: React.FC<{ userId: string }> = ({ userId }) => {
//   // Fetch user data
//   const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
//   // Fetch roles
//   const { data: rolesData = [], isLoading: isRolesLoading } = useGetRolesQuery(
//     {}
//   );
//   // Update mutation
//   const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

//   const defaultValues: FormData = {
//     id: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     roleId: "",
//     role: undefined,
//   };

//   const methods = useForm<FormData>({
//     defaultValues,
//     resolver: zodResolver(schema),
//   });

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = methods;
//   console.log("rolesDatauser", rolesData);
//   // Reset form when user data is loaded
//   useEffect(() => {
//     if (user) {
//       const currentRole = rolesData.find((role) => role.id === user.roleId);
//       reset({
//         id: user.id,
//         email: user.email || "",
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         phone: user.phone || "",
//         roleId: user.roleId || "",
//         role: currentRole
//           ? { id: currentRole.id, name: currentRole.name }
//           : undefined,
//       });
//     }
//   }, [user, rolesData, reset]);

//   const onSubmit = async (data: FormData) => {
//     try {
//       const payload = {
//         id: data.id,
//         roleId: data.role?.id || null, // Send null to remove role
//       };
//       await updateUser(payload).unwrap();
//     } catch (err) {
//       console.error("Failed to update user role:", err);
//     }
//   };

//   if (isUserLoading) {
//     return (
//       <Box display="flex" justifyContent="center" p={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <FormProvider {...methods}>
//       <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           User Role Management
//         </Typography>

//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Grid container spacing={3}>
//             {/* Disabled Fields */}
//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Email"
//                     fullWidth
//                     disabled
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="phone"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Phone"
//                     fullWidth
//                     disabled
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="firstName"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="First Name"
//                     fullWidth
//                     disabled
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Controller
//                 name="lastName"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Last Name"
//                     fullWidth
//                     disabled
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* Role Assignment Field */}
//             <Grid item xs={12}>
//               <Controller
//                 name="role"
//                 control={control}
//                 render={({ field }) => (
//                   <Autocomplete
//                     options={rolesData}
//                     getOptionLabel={(option) => option.name}
//                     value={field.value || null}
//                     onChange={(_, value) => field.onChange(value)}
//                     loading={isRolesLoading}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Assign Role"
//                         placeholder="Select a role"
//                         error={!!errors.role}
//                         helperText={errors.role?.message}
//                       />
//                     )}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </Paper>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             disabled={isUpdating}
//             startIcon={isUpdating ? <CircularProgress size={20} /> : null}
//           >
//             {isUpdating ? "Saving..." : "Save Role Assignment"}
//           </Button>
//         </Box>
//       </Box>
//     </FormProvider>
//   );
// };

// export default UserDetail;

"use client";

import React, { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/lib/admin/store/services/user.service";
import { useGetRolesQuery } from "@/lib/admin/store/services/role.service";

const schema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  roleId: z.string().optional().nullable(),
});

type FormData = z.infer<typeof schema>;

const UserDetail: React.FC<{ userId: string }> = ({ userId }) => {
  // Fetch user data
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
  // Fetch roles
  const { data: rolesData = [], isLoading: isRolesLoading } = useGetRolesQuery(
    {}
  );
  // Update mutation
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const defaultValues: FormData = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    roleId: null,
  };

  const methods = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // Reset form when user data is loaded
  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        roleId: user.roleId || null,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        id: data.id,
        roleId: data.roleId, // Just send the roleId directly
      };
      await updateUser(payload).unwrap();
    } catch (err) {
      console.error("Failed to update user role:", err);
    }
  };

  if (isUserLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Role Management
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            {/* Disabled Fields */}
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            {/* Role Assignment Field */}
            <Grid item xs={12}>
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={rolesData}
                    getOptionLabel={(option) => option.name}
                    value={
                      rolesData.find((role) => role.id === field.value) || null
                    }
                    onChange={(_, value) => field.onChange(value?.id || null)}
                    loading={isRolesLoading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Assign Role"
                        placeholder="Select a role"
                        error={!!errors.roleId}
                        helperText={errors.roleId?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isUpdating}
            startIcon={isUpdating ? <CircularProgress size={20} /> : null}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default UserDetail;
