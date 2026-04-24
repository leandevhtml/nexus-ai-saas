"use server";

import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { revalidatePath } from "next/cache";

export async function createPlan(formData: any) {
  await dbConnect();
  try {
    await Plan.create(formData);
    // Limpeza profunda de cache
    revalidatePath("/", "layout"); 
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePlan(id: string, formData: any) {
  await dbConnect();
  try {
    // Garantir que os dados numéricos sejam números
    if (formData.price) formData.price = parseFloat(formData.price);
    
    await Plan.findByIdAndUpdate(id, formData);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePlan(id: string) {
  await dbConnect();
  try {
    await Plan.findByIdAndDelete(id);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function togglePlanStatus(id: string, currentStatus: boolean) {
  await dbConnect();
  try {
    await Plan.findByIdAndUpdate(id, { active: !currentStatus });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
