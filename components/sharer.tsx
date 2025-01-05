"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useLocale, useTranslations } from "next-intl";
import config from "@/config";

export default function Sharer() {
  const t = useTranslations("sharer");
  const locale = useLocale();
  const shareBaseURL = `${config.baseURL}/${locale}`;
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">{t("title")}</p>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-white hover:text-black transition-colors"
          onClick={() =>
            window.open(
              `mailto:?subject=List%20Your%20Agency%20on%20Our%20Directory&body=Check%20out%20this%20amazing%20AI%20agency%20directory%3A%20${encodeURIComponent(
                shareBaseURL
              )}`,
              "_blank"
            )
          }
        >
          <Mail className="h-4 w-4" />
          {t("email")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-white hover:text-black transition-colors"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareBaseURL
              )}`,
              "_blank"
            )
          }
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          {t("linkedin")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-white hover:text-black transition-colors"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20AI%20agency%20directory!&url=${encodeURIComponent(
                shareBaseURL
              )}`,
              "_blank"
            )
          }
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
          {t("twitter")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-white hover:text-black transition-colors"
          onClick={() =>
            window.open(
              `https://t.me/share/url?url=${encodeURIComponent(
                shareBaseURL
              )}&text=Check%20out%20this%20amazing%20AI%20agency%20directory!`,
              "_blank"
            )
          }
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          {t("telegram")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-white hover:text-black transition-colors"
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?text=Check%20out%20this%20amazing%20AI%20agency%20directory!%20${encodeURIComponent(
                shareBaseURL
              )}`,
              "_blank"
            )
          }
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("whatsapp")}
        </Button>
      </div>
    </div>
  );
}
