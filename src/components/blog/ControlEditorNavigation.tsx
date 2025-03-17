"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Block } from "@/lib/types/blog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ControlEditorNavigationProps {
  title: string;
  description: string;
  tags: string[];
  blocks: Block[];
}

const ControlEditorNavigation = ({
  title,
  description,
  tags,
  blocks,
}: ControlEditorNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigationModalOpen, setIsNavigationModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const isDirtyRef = useRef(false);

  // Track form dirty state
  useEffect(() => {
    const isDirty =
      title.trim() !== "" ||
      description.trim() !== "" ||
      tags.length > 0 ||
      blocks.some((block) => block.content.trim() !== "");
    isDirtyRef.current = isDirty;
  }, [title, description, tags, blocks]);

  // Handle browser tab/window close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Handle in-app navigation attempts
  useEffect(() => {
    if (isDirtyRef.current) {
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLAnchorElement;
        if (target.href !== window.location.href) {
          e.preventDefault();
          setPendingNavigation(() => () => router.push(target.href));
          setIsNavigationModalOpen(true);
        }
      };

      const anchors = document.querySelectorAll("a");
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", handleAnchorClick);
      });

      return () => {
        anchors.forEach((anchor) => {
          anchor.removeEventListener("click", handleAnchorClick);
        });
      };
    }
  }, [pathname, searchParams, router]);

  // Handle Next.js client-side navigation (Link components)
  useEffect(() => {
    if (isDirtyRef.current) {
      const originalPush = router.push;
      const originalReplace = router.replace;

      router.push = (...args: Parameters<typeof router.push>) => {
        if (isDirtyRef.current) {
          setPendingNavigation(() => () => originalPush(...args));
          setIsNavigationModalOpen(true);
          return;
        }
        originalPush(...args);
      };

      router.replace = (...args: Parameters<typeof router.replace>) => {
        if (isDirtyRef.current) {
          setPendingNavigation(() => () => originalReplace(...args));
          setIsNavigationModalOpen(true);
          return;
        }
        originalReplace(...args);
      };

      return () => {
        router.push = originalPush;
        router.replace = originalReplace;
      };
    }
  }, [router, isDirtyRef.current]);

  const handleConfirmNavigation = () => {
    setIsNavigationModalOpen(false);
    pendingNavigation?.();
    setPendingNavigation(null);
  };

  const handleCancelNavigation = () => {
    setIsNavigationModalOpen(false);
    setPendingNavigation(null);
  };
  return (
    <>
      {/* Navigation Confirmation Dialog */}
      <AlertDialog
        open={isNavigationModalOpen}
        onOpenChange={setIsNavigationModalOpen}
      >
        <AlertDialogContent className="dark:bg-gray-900 dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-300">
              You have unsaved changes. Are you sure you want to leave? Your
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelNavigation}
              className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmNavigation}
              className="dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ControlEditorNavigation;
