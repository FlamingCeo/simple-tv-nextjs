import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps {
  // Define any additional props if needed
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper: React.FC<P & WithAuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login page if not authenticated
          router.push("/");
          return;
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...(props as P)} />;
  };

  return Wrapper;
};

export default withAuth;
