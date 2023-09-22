import { Typography } from "@mui/material";

/**
 * 
 * @param children string | string[] | undefined - The text to be displayed
 * @param align "inherit" | "left" | "center" | "right" | "justify" - The alignment of the text. "center" by default
 * @returns React.Component - A subheading with the text passed in
 * @example
 * <SubHeading align="center">Hello World</SubHeading>
 * <SubHeading align="left">Hello World</SubHeading>
 * <SubHeading align="right">Hello World</SubHeading>
 * <SubHeading align="justify">Hello World</SubHeading>
 * <SubHeading align="inherit">Hello World</SubHeading>
 * <SubHeading>Hello World</SubHeading>
 * @see
 * https://mui.com/components/typography/#component
 */
function SubHeading({
  children,
  align = "center",
}: {
  children: string | string[] | undefined;
  align?: "inherit" | "left" | "center" | "right" | "justify";
}) {
  return (
    <Typography variant="h6" textAlign={align}>
      {children}
    </Typography>
  );
}

export default SubHeading;
