import { useDispatch, useSelector } from "react-redux";

// App-wide aliases — swap for typed hooks if/when the project moves to TypeScript.
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
