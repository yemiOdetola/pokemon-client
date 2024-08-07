import { BoxSelect, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getOrganizationDetails } from "@/store/slice/organization";
import { useEffect } from "react";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.auth.user);
  const organization: any = useAppSelector((state) => state.organization.organizationInfo);

  useEffect(() => {
    if (user && user.organizationId) {
      dispatch(getOrganizationDetails(user.organizationId));
    }
  }, [user, dispatch]);

  console.log({ organization });


  return (
    <nav className="sticky top-0 left-0 hidden h-screen border-r pt-16 md:block w-80">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="block">
            <span className="relative overflow-hidden mb-4 block">
              <User size={80} className="mx-auto" />
            </span>
            <div className=" mb-8 text-center">
              <p className="text-sm font-medium leading-none">Current login</p>
              <p className="text-sm text-muted-foreground">{user?.email || 'yemiotola@gmail.com'}</p>
            </div>
            <div className="flex items-center mb-8">
              <span className="relative overflow-hidden">
                <BoxSelect size={40} />
              </span>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Organization</p>
                <p className="text-sm text-muted-foreground capitalize">{organization.name}</p>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <span className="relative overflow-hidden">
                <BoxSelect size={40} />
              </span>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none"></p>
                <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}