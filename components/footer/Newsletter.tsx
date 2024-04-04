import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4",
        tiled && "lg:flex-row lg:w-full lg:justify-between",
      )}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h4 class={tiled ? "text-2xl lg:text-3xl text-white" : "text-lg"}>
            {content?.title}
          </h4>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 border-2 border-[#f47320]">
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content bg-transparent"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn disabled:loading bg-[#f47320] uppercase text-white rounded-none hover:bg-[#009B67]"
              style="border:none;"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
