import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import AccountForm from "./AccountForm";
import { insertAccountSchema } from "@/db/schema";
import { useOpenAccount } from "../hooks/useOpenAccount";
import { useGetAccount } from "../api/useGetAccount";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/useEditAccount";
import { useDeleteAccount } from "../api/useDeleteAccount";
import useConfirm from "@/hooks/useConfirm";

const formShema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formShema>;

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction.",
  );

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
