"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

type Props = {
  isOpen: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ExcluirPopUp({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={onCancel}>
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 z-10 flex items-center justify-center px-4">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6 text-center shadow">
          <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <p className="mt-3 text-sm text-gray-700">{message}</p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              onClick={onCancel}
              className="rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white cursor-pointer"
            >
              Não
            </Button>
            <Button
              onClick={onConfirm}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white cursor-pointer"
            >
              Sim
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}