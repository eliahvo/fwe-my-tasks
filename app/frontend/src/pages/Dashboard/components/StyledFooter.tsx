import React from "react";
import styled from "styled-components";

export const StyledFooter = styled.div`
  height: 5rem;
          width: 100%;
          background-color: ${(props) => props.theme.colors.primary};
          position: fixed;
          bottom: 0;
          max-width: 810px;

    
    border-radius: 5px;
    border-color: #000000;
    border-width: 2px;
    border-style: solid;
    
`;

