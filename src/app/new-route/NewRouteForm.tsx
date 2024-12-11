"use client";

import { PropsWithChildren, useActionState } from "react";
import { createRouteAction } from "./create-route.action";

export function NewRouteForm(props: PropsWithChildren) {
  const [state, formAction] = useActionState<
    {
      error?: string;
      success?: boolean;
    } | null,
    FormData
  >(createRouteAction, null);
  return (
    <form action={formAction}>
      {state?.error && (
        <div className="my-2 rounded border bg-error p-2 text-sm font-bold text-contrast">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="my-2 rounded border bg-success p-2 text-sm font-bold text-contrast">
          Rota criada com sucesso!
        </div>
      )}
      {props.children}
    </form>
  );
}
