import { useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AREAS, type PropertyStatus, type PropertyType } from "@/data/properties";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { buildAgentSubmitMessage, buildWhatsAppUrl } from "@/utils/whatsapp";
import { Send } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";

const DEFAULT_PHONE = "6281234567890";

const normalizeDigits = (raw: string) => raw.replace(/[^\d+]/g, "").trim();

const schema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  whatsapp: z
    .string()
    .min(8, "Nomor WhatsApp wajib diisi")
    .transform((v) => v.trim()),
  propertyType: z.enum(["Villa", "Rumah", "Tanah"]).optional(),
  area: z.string().min(2, "Area wajib diisi"),
  priceIdr: z.coerce.number().min(1000000, "Harga minimal Rp 1.000.000"),
  status: z.enum(["Ready", "Off-plan", "Sold"]).optional(),
  ownership: z.enum(["Leasehold", "Freehold"]).optional(),
  mediaLink: z.string().url("Masukkan link yang valid").optional().or(z.literal("")),
  notes: z.string().max(1200, "Catatan terlalu panjang").optional(),
});

type Values = z.infer<typeof schema>;

export default function AgentSubmitListingForm({ className }: { className?: string }) {
  const { t } = useLocale();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      whatsapp: "",
      propertyType: undefined,
      area: "",
      priceIdr: undefined as unknown as number,
      status: undefined,
      ownership: undefined,
      mediaLink: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const statusOptions: PropertyStatus[] = useMemo(() => ["Ready", "Off-plan", "Sold"], []);
  const typeOptions: PropertyType[] = useMemo(() => ["Villa", "Rumah", "Tanah"], []);

  const onSubmit = (values: Values) => {
    const wa = normalizeDigits(values.whatsapp);
    const message = buildAgentSubmitMessage({
      name: values.name,
      whatsapp: wa,
      propertyType: values.propertyType,
      area: values.area,
      priceIdr: values.priceIdr,
      status: values.status,
      ownership: values.ownership,
      mediaLink: values.mediaLink?.trim() ? values.mediaLink.trim() : undefined,
      notes: values.notes,
    });

    const href = buildWhatsAppUrl({
      phone: DEFAULT_PHONE,
      message,
      utm: { utm_source: "artaniar_web_agent" },
    });

    toast({
      title: t("agent.form.toastTitle"),
      description: t("agent.form.toastDesc"),
    });

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("agent.form.namePh")}
                      className="rounded-2xl bg-white/70"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.wa")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={t("agent.form.waPh")}
                      className="rounded-2xl bg-white/70"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </FormControl>
                  <div className="mt-1 text-[11px] text-[hsl(var(--brand-ink)/0.62)]">{t("agent.form.waHint")}</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.type")}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="rounded-2xl bg-white/70">
                        <SelectValue placeholder={t("agent.form.optional")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.area")}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="rounded-2xl bg-white/70">
                        <SelectValue placeholder={t("agent.form.areaPh")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AREAS.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="priceIdr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.price")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={t("agent.form.pricePh")}
                      className="rounded-2xl bg-white/70"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <div className="mt-1 text-[11px] text-[hsl(var(--brand-ink)/0.62)]">{t("agent.form.priceHint")}</div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.status")}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-2xl bg-white/70">
                          <SelectValue placeholder={t("agent.form.optional")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.ownership")}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-2xl bg-white/70">
                          <SelectValue placeholder={t("agent.form.optional")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Leasehold">Leasehold</SelectItem>
                        <SelectItem value="Freehold">Freehold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="mediaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.media")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("agent.form.mediaPh")}
                      className="rounded-2xl bg-white/70"
                      inputMode="url"
                    />
                  </FormControl>
                  <div className="mt-1 text-[11px] text-[hsl(var(--brand-ink)/0.62)]">{t("agent.form.mediaHint")}</div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-[hsl(var(--brand-surface-2))] p-4">
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">{t("agent.form.responseTitle")}</div>
              <div className="mt-1 text-[12px] text-[hsl(var(--brand-ink)/0.72)] leading-relaxed">
                {t("agent.form.responseDesc")}
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[hsl(var(--brand-ink))]">{t("agent.form.notes")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t("agent.form.notesPh")}
                    className="min-h-[120px] rounded-2xl bg-white/70"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-[hsl(var(--brand-ink)/0.62)] leading-relaxed">
              {t("agent.form.disclaimer")}
            </div>

            <Button
              type="submit"
              className="h-12 rounded-full bg-[hsl(var(--brand-ink))] px-7 text-[hsl(var(--brand-ink-foreground))] hover:bg-[hsl(var(--brand-ink)/0.92)]"
            >
              <Send className="mr-2 h-4 w-4" />
              {t("agent.form.submit")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}