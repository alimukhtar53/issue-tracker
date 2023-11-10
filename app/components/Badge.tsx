import React from "react";
import { Badge as BadgeComponent } from "@radix-ui/themes";
import { Status } from "@prisma/client";

export const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const Badge = ({ status }: { status: Status }) => {
  return (
    <BadgeComponent color={statusMap[status].color}>
      {statusMap[status].label}
    </BadgeComponent>
  );
};

export default Badge;
