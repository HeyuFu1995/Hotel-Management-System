import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useSelector, useDispatch } from "react-redux";
import { changeMode, getMode } from "../context/styleSlice";
import { useEffect } from "react";

function DarkModeToggle() {
    const mode = useSelector(getMode);
    const isDarkMode = mode === "dark-mode";
    const dispatch = useDispatch();
    useEffect(function () {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);
    return (
        <ButtonIcon onClick={() => dispatch(changeMode())}>
            {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
