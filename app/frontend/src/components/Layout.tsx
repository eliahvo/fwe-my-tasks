import React from "react";
import styled, { css } from "styled-components/macro";

const headerHeight = "85px";
const footerHeight = "50px";

export const MaxWidthCSS = css`
  max-width: 860px;
  margin: auto;
`;
const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const Main = styled.main`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  padding: 0 25px;
  ${MaxWidthCSS}
`;

const Footer = styled.footer`
  height: ${footerHeight};
  padding: 0 25px;
  padding-top: 5rem;
  ${MaxWidthCSS};
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <div
          css={`
            font-size: 25px;
            letter-spacing: 2.3px;
            flex: 1;
          `}
        >
          <span
            css={`
              text-decoration: underline overline;
            `}
          >
            MyTasks
          </span>
        </div>
      </Header>
      <Main>{children}</Main>
      <Footer>© 2020 Eliah Vogel</Footer>
    </>
  );
};
