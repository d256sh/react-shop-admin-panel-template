import { useLocation } from "react-router-dom";
import {
  getResourceFromPath,
  resourceConfig,
} from "../utils/resourceConfig";

/**
 * Resolves the active CRUD resource (users | products | posts)
 * from the current URL — shared by List / Single / New.
 */
export const useResource = () => {
  const { pathname } = useLocation();
  const resource = getResourceFromPath(pathname);
  const config = resourceConfig[resource];

  return { resource, config, pathname };
};
