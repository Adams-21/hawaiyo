import { Globe, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { STATUS_META, VISIBILITY_META } from "@/lib/diary/meta";
import type {
  DiaryStatus,
  DiaryVisibility,
} from "@/lib/diary/types";

export function VisibilityBadge({
  visibility,
}: {
  visibility: DiaryVisibility;
}) {
  const meta = VISIBILITY_META[visibility];
  const Icon = visibility === "public" ? Globe : Lock;

  return (
    <Badge className={meta.chip}>
      <Icon className="size-3" aria-hidden />
      {meta.label}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: DiaryStatus }) {
  const meta = STATUS_META[status];

  return <Badge className={meta.chip}>{meta.label}</Badge>;
}