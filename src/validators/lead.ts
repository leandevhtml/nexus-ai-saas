import { z } from "zod";

export const LeadInputSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome contém caracteres inválidos"),
  email: z
    .string()
    .email("Email inválido")
    .max(254, "Email muito longo")
    .transform((val) => val.toLowerCase().trim()),
  origem_da_campanha: z
    .enum(["landing-page", "social", "referral", "ads", "other"])
    .default("landing-page"),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;
