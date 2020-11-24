import React from "react";
import styled from "styled-components";

export const EditButton = (
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
    background-color: ${(props) => props.theme.colors.primary};
    &:hover,
    &:focus {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  `;
  return (
    <StyledButton {...props}>
      Edit
    </StyledButton>
  );
};
