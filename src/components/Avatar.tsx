import { Avatar } from "@mui/material";

/**
 * 
 * @param name string - The name to be displayed
 * @returns React.Component - An avatar with the name passed in
 * @example
 * <UserAvatar name="John Doe" />
 * @see
 * https://mui.com/components/avatars/
 */
function UserAvatar({ name }: { name: string }) {

  // function to generate a color based on the name passed in
  function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  // function to generate a string avatar based on the name passed in
  function stringAvatarProps(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 150,
        height: 150,
        fontSize: 50,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ").length>1 ? name.split(" ")[1][0] : ""}`,
    };
  }

  return <Avatar {...stringAvatarProps(name)} />;
}

export default UserAvatar;
