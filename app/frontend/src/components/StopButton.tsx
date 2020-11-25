import React from "react";
import styled from "styled-components";

export const StopButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${(props) => props.theme.colors.primary};
    float: right;
    &:hover,
    &:focus {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  `;
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24">
          <rect width="100" height="100"/>
        </svg>
    </StyledButton >
  );
};
