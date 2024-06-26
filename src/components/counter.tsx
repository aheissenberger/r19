"use client"

import React, { useState, useTransition } from "react"
import { toast, Toaster } from "sonner"

export default ({ action }: { action: () => Promise<number> }) => {
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0)

  const handleAction = () =>
    // @ts-expect-error - async functions should be expected
    startTransition(async () => setCount(await action()))

  const choose = () => {
    switch (Math.floor(Math.random() * 5) + 1) {
      case 1:
        return toast.info("My first info toast")
      case 2:
        return toast.success("My first success toast")
      case 3:
        return toast.warning("My first warning toast")
      case 4:
        return toast.error("My first error toast")
      case 5:
        return toast("My first toast")
    }
  }

  return (
    <>
      <Toaster richColors closeButton />

      <button
        disabled={isPending}
        onClick={handleAction}
        className="relative h-14 w-full bg-blue-100 text-xl duration-150 hover:bg-blue-200 disabled:bg-red-100 disabled:opacity-50">
        {count}
        <small className="absolute bottom-1 right-1 text-xs opacity-50">
          (Server action w/ artificial delay)
        </small>
      </button>

      <button
        onClick={choose}
        className="relative  h-14 w-full border-l-4 border-dashed border-blue-400 bg-blue-100 text-xl hover:bg-blue-200">
        Toast! <small className="absolute bottom-1 right-1 text-xs opacity-50">(Client lib.)</small>
      </button>
    </>
  )
}
