import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  variant: "Normal" | "Reverse";
}

export interface Props {
  /**
   * @format html
   */
  title: string;
  description?: string;
  image: ImageWidget;
  placement: "left" | "right";
  cta: CTA[];
  width: number;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  title = "Hero",
  description = "",
  image,
  placement,
  cta,
}: Props) {
  return (
    <div>
      <div class="mx-auto flex flex-col items-center gap-8">
        <div
          class={`flex w-full xl:mx-auto z-10`}
        >
          {image && (
            <Image
              class="w-full object-fit h-[100vw] lg:h-[auto]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              width={1920}
              decoding="async"
              loading="lazy"
            />
          )}
          <div
            class={`mx-6 lg:mx-auto space-y-4  absolute left-[45%] top-[40%] lg:top-1/2 lg:left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center flex-col items-center w-[90%] lg:w-full`}
          >
            <div
              class="inline-block lg:text-[80px] leading-[100%] font-medium tracking-[-2.4px] text-[48px] efeito-vidro px-4 py-2 lg:px-0 lg:py-0"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            >
            </div>
            <p class="text-zinc-400 md:text-[18px] leading-[150%] text-center">
              {description}
            </p>
            <div class="flex flex-col items-center lg:items-start lg:flex-row">
              {cta?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item?.href.includes("http") ? "_blank" : "_self"}
                  class={`group relative overflow-hidden rounded-full hover:bg-gradient-to-r px-6 py-2 lg:px-8 lg:py-3 transition-all duration-300 ease-out ${
                    item.variant === "Reverse"
                      ? "bg-secondary text-white"
                      : "bg-accent text-black"
                  }`}
                >
                  <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40">
                  </span>
                  <span class="relative font-medium lg:text-[20px]">
                    {item?.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
