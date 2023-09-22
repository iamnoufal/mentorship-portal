import { useState } from "react";
import { IconButton } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

/**
 *
 * @param text string - The text to be copied
 * @returns React.Component - A button to copy the text passed in
 * @example
 * <CopyButton text="Hello World" />
 * @see
 * https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
 * https://mui.com/components/buttons/#icon-buttons
 * https://mui.com/components/material-icons/
 */

function CopyButton({ text }: { text: string }) {
  // state to handle copied action
  const [copied, setCopied] = useState<boolean>(false);

  // function to copy the text passed as an argument to this component
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      alert("Failed to copy text: " + err);
    }
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <IconButton onClick={handleCopy}>
      {copied ? <LibraryAddCheckIcon /> : <ContentCopyRoundedIcon />}
    </IconButton>
  );
}

export default CopyButton;
