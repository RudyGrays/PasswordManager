"use client";
import { Button } from "@/shared/ui/button";
import { PasswordServiceModal } from "@/entities/PasswordService/ui/PasswordServiceModal/ui/PasswordServiceModal";
import { useState } from "react";
import { PasswordServiceList } from "@/entities/PasswordService/ui/PasswordServiceList/PasswordServiceList";
import { PasswordService } from "@/widgets/PasswordService";

export default function App() {
  const [serviceModal, setServiceModal] = useState(false);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-3 items-center justify-center">
      <h1 className="text-xl">Password Manager</h1>
      <PasswordService />
    </div>
  );
}
