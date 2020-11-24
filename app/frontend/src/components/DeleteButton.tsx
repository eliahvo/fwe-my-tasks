import React from "react";
import styled from "styled-components";

export const DeleteButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    width: 48px;
    border: 0px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
    background-color: ${(props) => props.theme.colors.primary};
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
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
      </svg>
    </StyledButton>
  );
};
