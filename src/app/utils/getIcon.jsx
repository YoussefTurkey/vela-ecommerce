import { Palette } from "lucide-react";
import { ICON_MAP } from "../data/categoryGridData";

export function getIcon(slug) {
  const found = ICON_MAP.find((m) => m.match.test(slug));
  return found ? found.icon : Palette;
}
