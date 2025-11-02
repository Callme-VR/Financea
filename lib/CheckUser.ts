import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  const userData = {
    clerkUserId: user.id,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0]?.emailAddress,
  };

  const existingUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (!existingUser) {
    // Create new user if they don't exist
    const newUser = await db.user.create({
      data: userData,
    });
    return newUser;
  }

  // Update existing user
  const updatedUser = await db.user.update({
    where: {
      clerkUserId: user.id,
    },
    data: userData,
  });
  
  return updatedUser;
};
