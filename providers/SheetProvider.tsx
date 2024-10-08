"use client";
import { useMountedState } from "react-use";
import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";
import EditAccountSheet from "@/features/accounts/components/EditAccountSheet";

export default function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
}
