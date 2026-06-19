// app/admin/users/actions.js
"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function makeRecruiterAction(userId) {
  await auth.api.setRole({
    body: { userId, role: "recruiter" },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}

export async function makeSeekerAction(userId) {
  await auth.api.setRole({
    body: { userId, role: "seeker" },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}

export async function makeAdminAction(userId) {
  await auth.api.setRole({
    body: { userId, role: "admin" },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}

export async function suspendUserAction(userId) {
  await auth.api.banUser({
    body: { userId, banReason: "Suspended by admin" },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}

export async function unsuspendUserAction(userId) {
  await auth.api.unbanUser({
    body: { userId },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}

export async function archiveUserAction(userId) {
  await auth.api.adminUpdateUser({
    body: { userId, data: { archived: true } },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}

export async function deleteUserAction(userId) {
  await auth.api.removeUser({
    body: { userId },
    headers: await headers(),
  })
  revalidatePath("/admin/users")
}