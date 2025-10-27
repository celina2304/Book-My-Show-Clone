import fs from "fs";
import path from "path";

export const loadTemplate = (templateName, variables = {}) => {
  const filePath = path.join(
    process.cwd(),
    "templates",
    `${templateName}.html`
  );

  let html = fs.readFileSync(filePath, "utf-8");

  // Replace {{variables}} in the template
  Object.keys(variables).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), variables[key]);
  });

  return html;
};
