import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useJobRealtime(dialogueUuid: string | null, onUpdate: (status: string) => void) {
  useEffect(() => {
    if (!dialogueUuid) return;

    const channel = supabase
      .channel("jobs-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "jobs",
          filter: `dialogue_uuid=eq.${dialogueUuid}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          console.log("🔁 Job status updated:", newStatus);
          onUpdate(newStatus);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dialogueUuid, onUpdate]);
}
