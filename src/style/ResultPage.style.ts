import styled from "styled-components";
import IBackdropContainer from "@/types/IBackdropContainer";
import { GoPrimitiveDot } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";

export const Container = styled.div``;

export const BackdropContainer = styled.div<IBackdropContainer>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;

  @media screen and (max-width: 1024px) {
    position: relative;

    height: 420px;
    min-height: 420px;
    max-height: 420px;
  }

  @media screen and (min-width: 1024px) {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.6755077030812324) 0%,
        rgba(0, 0, 0, 0.7035189075630253) 52%,
        rgba(0, 0, 0, 0.17130602240896353) 73%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }
`;

export const Backdrop = styled(Image)`
  object-fit: cover;
  object-position: center;
  display: block;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1024px) {
    height: 420px;
    min-height: 420px;
    max-height: 420px;
  }
`;

export const Main = styled.div`
  height: 100%;

  @media screen and (min-width: 1024px) {
    min-height: 100vh;
  }

  > div {
    width: 60%;
    padding: 48px 48px 24px 48px;

    @media screen and (max-width: 1024px) {
      width: 100%;
      padding-bottom: 0;
    }
  }

  h1 {
    font-size: 48px;
  }
`;

export const BackButton = styled(Link)`
  color: white;
  text-decoration: underline;
  cursor: pointer;
`;

export const MovieMeta = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  p {
    display: inline-block;
    font-size: 18px;
  }

  svg {
    margin: 0 8px;
  }
`;

export const Description = styled.p`
  font-size: 21px;
  max-width: 700px;
  margin-bottom: 16px;
`;

export const MoreInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Rating = styled.div`
  display: inline-flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export const Separator = styled(GoPrimitiveDot)`
  margin: 0 8px;
`;

export const Links = styled.div`
  display: flex;
  column-gap: 8px;

  a {
    display: flex;
    color: white;
  }

  img {
    width: 32px;
    height: 32px;
  }
`;
