import "server-only";
import { getRoleById } from "@lib/services/prismaServices";
import { auth } from "@/auth";

export const getUserResources = async () => {
  const session = await auth();
  console.log("sessionauthfromrole", session);
  const roleId = session?.user?.roleId;
  if (!roleId) return null;

  try {
    const role = await getRoleById(roleId);

    return role?.resources?.map((res) => res.name) ?? [];
  } catch (error) {
    console.log("Failed to fetch role");
    return null;
  }
};
