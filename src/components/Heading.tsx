import { Typography } from "@mui/material";

/**
 * 
 * @param children string | string[] | undefined - The text to be displayed
 * @param align "inherit" | "left" | "center" | "right" | "justify" - The alignment of the text
 * @returns React.Component - A heading with the text passed in
 * @example
 * <Heading align="center">Hello World</Heading>
 * <Heading align="left">Hello World</Heading>
 * <Heading align="right">Hello World</Heading>
 * <Heading align="justify">Hello World</Heading>
 * <Heading align="inherit">Hello World</Heading>
 * <Heading>Hello World</Heading>
 * @see
 * https://mui.com/components/typography/#component
 */
function Heading({
  children,
  align = "center",
}: {
  children: string | string[] | undefined;
  align?: "inherit" | "left" | "center" | "right" | "justify";
}) {
  return (
    <Typography variant="h4" textAlign={align} fontFamily="Raleway">
      {children}
    </Typography>
  );
}

export default Heading;
