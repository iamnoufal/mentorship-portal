import { utils, write } from "xlsx";

/**
 * 
 * @param data any - The data to export
 * @param filename string - The filename to export the data to
 * @returns void
 * @description Export data to an Excel file
 * @example
 * exportExcel(data, "filename.xlsx");
 * @see
 * https://www.npmjs.com/package/xlsx
 */
function exportExcel(data: any, filename: string) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 10);
}

export default exportExcel;
