"use client";

import { useState } from "react";
import { Check, Plus, X, ChevronsUpDown } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { agencyFormSchema, type AgencyFormValues } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { generateUniqueFileName } from "@/lib/utils/file";
import { skills } from "@/lib/skills";
import { categories } from "@/lib/categories";
import { roles } from "@/lib/roles";
import { countries } from "@/lib/countries";
import { ImageUpload } from "@/components/ui/image-upload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AgencyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("agencyForm");

  const form = useForm<AgencyFormValues>({
    resolver: zodResolver(agencyFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      categories: [],
      skills: [],
      team: [{ fullname: "", job_role: "", twitter: "" }],
      portfolio: [{ title: "", url: "" }],
      founded: "",
      projects_completed: "",
      linkedin: "",
      twitter: "",
      pitch_video_url: "",
      telephone: "",
      location: "",
      starting_budget: "",
      team_size: "",
    },
  });

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({ control: form.control, name: "team" });

  const {
    fields: portfolioFields,
    append: appendPortfolio,
    remove: removePortfolio,
  } = useFieldArray({ control: form.control, name: "portfolio" });

  const onSubmit = async (data: AgencyFormValues) => {
    try {
      setIsLoading(true);

      const isValid = await form.trigger();

      if (!isValid) {
        toast.error(t("messages.error"));
        return;
      }

      const formData = new FormData();

      // Add all basic fields
      formData.append("title", data.title);
      formData.append("shortDescription", data.shortDescription);
      formData.append("fullDescription", data.fullDescription);
      formData.append("email", data.email);
      formData.append("website", data.website);
      formData.append("location", data.location!);

      // Add optional fields with checks
      if (data.twitter) formData.append("twitter", data.twitter);
      if (data.linkedin) formData.append("linkedin", data.linkedin);
      if (data.telephone) formData.append("telephone", data.telephone);
      if (data.founded) formData.append("founded", data.founded);
      if (data.team_size) formData.append("team_size", data.team_size);
      if (data.starting_budget)
        formData.append("starting_budget", data.starting_budget);

      if (data.projects_completed)
        formData.append("projects_completed", data.projects_completed);
      if (data.pitch_video_url)
        formData.append("pitch_video_url", data.pitch_video_url);

      // Add arrays and objects as JSON strings
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("skills", JSON.stringify(data.skills));
      formData.append("team", JSON.stringify(data.team));
      formData.append("portfolio", JSON.stringify(data.portfolio));

      // Add files
      if (data.logo) formData.append("logo", data.logo);

      const response = await fetch("/api/agencies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create agency");
      }
      const result = await response.json();

      toast.success(t("messages.success"));

      router.push(`/${locale}/create/checkout?reference=${result.reference}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container flex max-w-5xl flex-col items-center gap-4 py-10 px-4 text-center mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
              {t("cardTitle")}
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {t("cardSubtitle")}
          </p>
        </div>
      </div>
      <div>
        <Card className="py-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-8 rounded-lg">
              <div className="space-y-2 w-full md:max-w-[300px] ">
                <Label className="text-md text-pink-300">{t("form.logo.label")}</Label>
                <ImageUpload
                  onChange={(file) => {
                    if (file) {
                      const uniqueFile = generateUniqueFileName(
                        file as File,
                        "logo"
                      );
                      form.setValue("logo", uniqueFile);
                    }
                  }}
                  value={form.watch("logo")}
                  maxSize={2} // 2MB limit for logos
                  helpText={t("form.logo.maxSize")}
                />
                {form.formState.errors.logo && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.logo.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-md text-pink-300" htmlFor="title">
                  {t("form.name.label")}
                </Label>
                <Input
                  id="title"
                  placeholder={t("form.name.placeholder")}
                  className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                  {...form.register("title")}
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  className="text-md text-pink-300"
                  htmlFor="shortDescription"
                >
                  {t("form.shortDescription.label")}
                </Label>
                <Textarea
                  id="shortDescription"
                  placeholder={t("form.shortDescription.placeholder")}
                  className="bg-black/20 border-gray-800 focus:border-gray-700 text-white min-h-[100px]"
                  {...form.register("shortDescription")}
                />
                {form.formState.errors.shortDescription && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.shortDescription.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  className="text-md text-pink-300"
                  htmlFor="fullDescription"
                >
                  {t("form.fullDescription.label")}
                </Label>
                <Textarea
                  id="fullDescription"
                  placeholder={t("form.fullDescription.placeholder")}
                  className="bg-black/20 border-gray-800 focus:border-gray-700 text-white min-h-[200px]"
                  {...form.register("fullDescription")}
                />
                {form.formState.errors.fullDescription && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.fullDescription.message}
                  </p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="founded">
                    {t("form.founded.label")}
                  </Label>
                  <select
                    id="founded"
                    className="w-full h-10 rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    {...form.register("founded")}
                  >
                    <option value="">{t("form.founded.placeholder")}</option>
                    {Array.from(
                      { length: new Date().getFullYear() - 1980 + 1 },
                      (_, i) => (
                        <option key={1980 + i} value={1980 + i}>
                          {1980 + i}
                        </option>
                      )
                    ).reverse()}
                  </select>
                  {form.formState.errors.founded && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.founded.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-md text-pink-300"
                    htmlFor="projects_completed"
                  >
                    {t("form.projects_completed.label")}
                  </Label>
                  <select
                    id="projects_completed"
                    className="w-full h-10 rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    {...form.register("projects_completed")}
                  >
                    <option value="">{t("form.projects_completed.placeholder")}</option>
                    {[...Array(9)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                    <option value="10+">10+</option>
                  </select>
                  {form.formState.errors.projects_completed && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.projects_completed.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="email">
                    {t("form.email.label")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("form.email.placeholder")}
                    className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="telephone">
                    {t("form.telephone.label")}
                  </Label>
                  <div className="phone-input-container">
                    <PhoneInput
                      country={"us"}
                      value={form.watch("telephone")}
                      onChange={(value) => {
                        form.setValue("telephone", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      inputProps={{
                        id: "telephone",
                        name: "telephone",
                        "aria-label": t("form.telephone.label"),
                      }}
                      specialLabel=""
                      containerClass="phone-input"
                      inputClass="!w-full !h-10 !bg-black !text-white !border-input"
                      buttonClass="!bg-black !border-input"
                      dropdownClass="!bg-black !text-white"
                      searchClass="!bg-black !text-white"
                      enableSearch={true}
                      countryCodeEditable={false}
                      preferredCountries={["us", "gb", "ca"]}
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        fontSize: "14px",
                        paddingLeft: "48px",
                      }}
                    />
                  </div>
                  {form.formState.errors.telephone && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.telephone.message}
                    </p>
                  )}
                  <style jsx global>{`
                    .phone-input .flag-dropdown {
                      background-color: black !important;
                      border-color: hsl(var(--input)) !important;
                    }
                    .phone-input .selected-flag:hover,
                    .phone-input .selected-flag:focus,
                    .phone-input .selected-flag.open {
                      background-color: rgba(255, 255, 255, 0.1) !important;
                    }
                    .phone-input .country-list {
                      background-color: black !important;
                      border-color: hsl(var(--input)) !important;
                    }
                    .phone-input .country-list .country:hover {
                      background-color: rgba(255, 255, 255, 0.1) !important;
                    }
                    .phone-input .country-list .country.highlight {
                      background-color: rgba(255, 255, 255, 0.2) !important;
                    }
                  `}</style>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="location">
                    {t("form.location.label")}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between bg-black/20 border-gray-800 hover:bg-black/30 hover:text-white"
                        )}
                      >
                        {form.watch("location")
                          ? countries.find(
                              (country) =>
                                country.value === form.watch("location")
                            )?.label
                          : t("form.location.placeholder")}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-black text-white">
                      <Command>
                        <CommandInput placeholder={t("form.location.searchPlaceholder")} />
                        <CommandEmpty>{t("form.location.notFound")}</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-y-auto">
                          {countries.map((country) => (
                            <CommandItem
                              value={country.label}
                              key={country.value}
                              onSelect={() => {
                                form.setValue("location", country.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country.value === form.watch("location")
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.location && (
                    <p className="text-xs text-red-500 mt-1">
                      {form.formState.errors.location.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="website">
                    {t("form.website.label")}
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder={t("form.website.placeholder")}
                    className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                    {...form.register("website")}
                  />
                  {form.formState.errors.website && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.website.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-md text-pink-300"
                    htmlFor="linkedin"
                  >
                    {t("form.social.linkedin.label")}
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder={t("form.social.linkedin.placeholder")}
                    className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                    {...form.register("linkedin")}
                  />
                  {form.formState.errors.linkedin && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.linkedin.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="twitter">
                    {t("form.social.twitter.label")}
                  </Label>

                  <div className="relative">
                    <div className="flex items-center">
                      <div className="absolute left-2 text-gray-400">
                        @
                      </div>
                      <Input
                        placeholder={t("form.social.twitter.placeholder")}
                        className="pl-7 bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                        {...form.register("twitter", {
                          pattern: {
                            value: /^[A-Za-z0-9_]{1,30}$/,
                            message: t("form.social.twitter.error"),
                          },
                          onChange: (e) => {
                            // Remove @ if user includes it
                            const value = e.target.value.replace("@", "");
                            // Remove any invalid characters
                            const sanitized = value.replace(
                              /[^A-Za-z0-9_]/g,
                              ""
                            );
                            // Truncate to 30 characters
                            e.target.value = sanitized.slice(0, 30);
                          },
                        })}
                      />
                    </div>
                    {form.formState.errors.twitter && (
                      <p className="text-xs text-red-500 mt-1">
                        {form.formState.errors.twitter?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-md text-pink-300">
                  {t("form.categories.label")}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.slug}
                      variant={
                        form.watch("categories")?.includes(category.slug)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => {
                        const currentCategories =
                          form.getValues("categories") || [];
                        const newCategories = currentCategories.includes(
                          category.slug
                        )
                          ? currentCategories.filter((c) => c !== category.slug)
                          : [...currentCategories, category.slug];
                        form.setValue("categories", newCategories);
                      }}
                    >
                      {form.watch("categories")?.includes(category.slug) && (
                        <Check className="h-3 w-3 text-pink-500" />
                      )}
                      {category.name}
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.categories && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.categories.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-md text-pink-300">
                  {t("form.skills.label")}
                </Label>
                <div className="flex flex-col space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full md:max-w-[200px] justify-between bg-black/20 border-gray-800 hover:bg-black/30 hover:text-white"
                      >
                        {t("form.skills.label")}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-black text-white">
                      <Command>
                        <CommandInput placeholder={t("form.skills.searchPlaceholder")} />
                        <CommandEmpty>{t("form.skills.notFound")}</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto bg-black text-white">
                          {skills.map((skill) => (
                            <CommandItem
                              key={skill}
                              onSelect={() => {
                                const currentSkills =
                                  form.getValues("skills") || [];
                                const newSkills = currentSkills.includes(skill)
                                  ? currentSkills.filter((s) => s !== skill)
                                  : [...currentSkills, skill];
                                form.setValue("skills", newSkills);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form.watch("skills")?.includes(skill)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {skill}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <div className="flex flex-wrap gap-2">
                    {form.watch("skills")?.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentSkills =
                              form.getValues("skills") || [];
                            form.setValue(
                              "skills",
                              currentSkills.filter((s) => s !== skill)
                            );
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                {form.formState.errors.skills && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.skills.message}
                  </p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label className="text-md text-pink-300" htmlFor="team_size">
                    {t("form.team_size.label")}
                  </Label>
                  <select
                    id="team_size"
                    className="bg-black/20 border-gray-800 focus:border-gray-700 text-white rounded-md"
                    {...form.register("team_size")}
                  >
                    <option value="">{t("form.team_size.placeholder")}</option>
                    <option value="1-5">{t("form.team_size.options.1-5")}</option>
                    <option value="6-10">{t("form.team_size.options.6-10")}</option>
                    <option value="11-20">{t("form.team_size.options.11-20")}</option>
                    <option value="21-50">{t("form.team_size.options.21-50")}</option>
                    <option value="51-100">{t("form.team_size.options.51-100")}</option>
                    <option value="100+">{t("form.team_size.options.100+")}</option>
                  </select>
                  {form.formState.errors.team_size && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.team_size.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-md text-pink-300"
                    htmlFor="starting_budget"
                  >
                    {t("form.starting_budget.label")}
                  </Label>
                  <select
                    id="starting_budget"
                    className="w-full h-10 rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    {...form.register("starting_budget")}
                  >
                    <option value="">{t("form.starting_budget.placeholder")}</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={500 * (i + 1)} value={500 * (i + 1)}>
                        ${500 * (i + 1)}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.starting_budget && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.starting_budget.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  className="text-md text-pink-300"
                  htmlFor="pitch_video_url"
                >
                  {t("form.pitchVideo.label")}
                </Label>
                <Input
                  id="pitch_video_url"
                  type="url"
                  placeholder={t("form.pitchVideo.placeholder")}
                  className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                  {...form.register("pitch_video_url")}
                />
                <p className="text-sm text-muted-foreground">
                  {t("form.pitchVideo.helper")}{" "}
                  <Link
                    className="underline"
                    href="https://www.loom.com/"
                    target="_blank"
                  >
                    Loom
                  </Link>
                </p>
                {form.formState.errors.pitch_video_url && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.pitch_video_url.message}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-md text-pink-300">
                    {t("form.team.label")}
                  </Label>
                </div>
                {teamFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <div className="relative">
                        <div className="flex items-center">
                          <div className="absolute left-3 flex items-center pointer-events-none text-pink-500">
                            @
                          </div>
                          <Input
                            width={"full"}
                            placeholder={t("form.team.twitter.placeholder")}
                            className="pl-7 bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                            {...form.register(`team.${index}.twitter`, {
                              pattern: {
                                value: /^[A-Za-z0-9_]{1,30}$/,
                                message: t("form.team.twitter.error"),
                              },
                              onChange: (e) => {
                                // Remove @ if user includes it
                                const value = e.target.value.replace("@", "");
                                // Remove any invalid characters
                                const sanitized = value.replace(
                                  /[^A-Za-z0-9_]/g,
                                  ""
                                );
                                // Truncate to 30 characters
                                e.target.value = sanitized.slice(0, 30);
                              },
                            })}
                          />
                        </div>
                        {form.formState.errors.team?.[index]?.twitter && (
                          <p className="text-xs text-red-500 mt-1">
                            {
                              form.formState.errors.team[index]?.twitter
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <Input
                        placeholder={t("form.team.name.placeholder")}
                        className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                        {...form.register(`team.${index}.fullname`)}
                      />
                      {form.formState.errors.team?.[index]?.fullname && (
                        <p className="text-xs text-red-500 mt-1">
                          {form.formState.errors.team[index]?.fullname?.message}
                        </p>
                      )}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between bg-black/20 border-gray-800 hover:bg-black/30 hover:text-white"
                          >
                            {form.watch(`team.${index}.job_role`)
                              ? roles.find(
                                  (role) =>
                                    role.slug ===
                                    form.watch(`team.${index}.job_role`)
                                )?.name
                              : t("form.team.role.label")}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 bg-black text-white">
                          <Command>
                            <CommandInput placeholder={t("form.team.role.searchPlaceholder")} />
                            <CommandEmpty>{t("form.team.role.notFound")}</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto bg-black text-white">
                              {roles.map((role) => (
                                <CommandItem
                                  key={role.slug}
                                  onSelect={() => {
                                    form.setValue(
                                      `team.${index}.job_role`,
                                      role.slug
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.watch(`team.${index}.job_role`) ===
                                        role.slug
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {role.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.team?.[index]?.job_role && (
                        <p className="text-xs text-red-500 mt-1">
                          {form.formState.errors.team[index]?.job_role?.message}
                        </p>
                      )}
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTeam(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700"
                    size="sm"
                    onClick={() => appendTeam({ fullname: "", job_role: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("form.team.addMember")}
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-md text-pink-300">
                    * {t("form.portfolio.label")}
                  </Label>
                </div>
                {portfolioFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-4 p-4 border rounded-lg"
                  >
                    <div className="space-y-2">
                      <Input
                        placeholder={t("form.portfolio.title.placeholder")}
                        className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                        {...form.register(`portfolio.${index}.title`)}
                      />
                      {form.formState.errors.portfolio?.[index]?.title && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.portfolio?.[index]?.message}
                        </p>
                      )}
                      <Input
                        placeholder={t("form.portfolio.url.placeholder")}
                        type="url"
                        className="bg-black/20 border-gray-800 focus:border-gray-700 text-white"
                        {...form.register(`portfolio.${index}.url`)}
                      />
                      {form.formState.errors.portfolio?.[index]?.url && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.portfolio?.[index]?.message}
                        </p>
                      )}
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePortfolio(index)}
                        className="ml-auto block"
                      >
                        {t("form.portfolio.remove")}
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700"
                  size="sm"
                  onClick={() =>
                    appendPortfolio({
                      title: "",
                      url: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("form.portfolio.add")}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-10">
              <Button
                className="py-8 px-4 text-4xl font-bold bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-800 hover:to-purple-800 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? t("form.submitting") : t("form.submit")}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                <span className="px-4 py-2 rounded-full bg-black">
                  ⏰ {t("form.listedWithin")}
                </span>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}