// app/admin/users/_components/ConfirmDialog.jsx
"use client"

import { AlertDialog, Button } from "@heroui/react"

const ConfirmDialog = ({
  trigger,
  heading,
  description,
  confirmLabel = "Confirm",
  status = "default",
  onConfirm,
}) => (
  <AlertDialog>
    {trigger}
    <AlertDialog.Backdrop>
      <AlertDialog.Container size="sm">
        <AlertDialog.Dialog>
          <AlertDialog.Header>
            <AlertDialog.Icon status={status} />
            <AlertDialog.Heading>{heading}</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>{description}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              Cancel
            </Button>
            <Button
              slot="close"
              variant={status === "danger" ? "danger" : "primary"}
              onPress={onConfirm}
            >
              {confirmLabel}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
)

export default ConfirmDialog