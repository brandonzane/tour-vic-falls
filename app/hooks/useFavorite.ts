import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let req;
        if (hasFavorited) {
          req = () =>
            fetch(`/api/favorites/${listingId}`, {
              method: "DELETE",
            });
        } else {
          req = () =>
            fetch(`/api/favorites/${listingId}`, {
              method: "POST",
            });
        }
        await req();
        router.refresh();
        toast.success("Success");
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, loginModal, router, listingId]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
