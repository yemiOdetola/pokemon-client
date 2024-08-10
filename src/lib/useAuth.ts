import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "./utils";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/pokemons");
    } else {
      router.replace("/login");
    }
  }, [router]);
};
