import { useContext } from "react";
import { AppContext } from "@/utils/context";
import NotAuthorized from "./NotAuthorized";

/**
 * 
 * @param children React.ReactNode - The children to be displayed
 * @param type string | string[] - The type of user that is authorized to view the page
 * @returns React.Component - children if the user is authorized, otherwise, it displays a NotAuthorized message
 * @example
 * <Protected type="admin">
 *   <div>Hello World</div>
 * </Protected>
 */
function Protected({
  children,
  type,
}: {
  children: React.ReactNode;
  type: string | string[];
}) {
  const { user } = useContext(AppContext);
  return (
    <>
      {user.type === "admin" ? (
        children
      ) : user.type === type ? (
        children
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}

export default Protected;
