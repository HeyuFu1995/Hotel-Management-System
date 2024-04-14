import styled from "styled-components";
import { useSelector } from "react-redux";
import { getMode } from "../context/styleSlice";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const mode = useSelector(getMode);
  const isDarkMode = mode === "dark-mode";
  return (
    <StyledLogo>
      <Img src={`/logo-${isDarkMode ? "dark" : "light"}.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
