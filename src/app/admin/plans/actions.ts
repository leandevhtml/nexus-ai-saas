"use server";

import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { revalidatePath } from "next/cache";

export async function createPlan(formData: any) {
  await dbConnect();
  try {
    await Plan.create(formData);
    // Limpa o cache de todas as páginas que mostram planos
    revalidatePath("/admin/plans");
    revalidatePath("/");
    revalidatePath("/precos");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePlan(id: string, formData: any) {
  await dbConnect();
  try {
    await Plan.findByIdAndUpdate(id, formData);
    revalidatePath("/admin/plans");
    revalidatePath("/");
    revalidatePath("/precos");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePlan(id: string) {
  await dbConnect();
  try {
    await Plan.findByIdAndDelete(id);
    revalidatePath("/admin/plans");
    revalidatePath("/");
    revalidatePath("/precos");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function togglePlanStatus(id: string, currentStatus: boolean) {
  await dbConnect();
  try {
    await Plan.findByIdAndUpdate(id, { active: !currentStatus });
    revalidatePath("/admin/plans");
    revalidatePath("/");
    revalidatePath("/precos");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
