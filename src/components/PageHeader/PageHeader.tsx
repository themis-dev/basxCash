import React from 'react'
import styled from 'styled-components'

interface PageHeaderProps {
  icon?: string,
  subtitle?: string,
  title?: string,
  titleA?:string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title, titleA }) => {
  return (
    <StyledPageHeader>
        <img src={icon} alt="home icon"/>
      {/*<StyledIcon>{icon}</StyledIcon>*/}
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}{titleA && <StyledLink2 href="https://app.daoswap.pro/#/swap" target="_blank">{titleA}</StyledLink2>}</StyledSubtitle>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  padding-top: ${props => props.theme.spacing[6]}px;
  max-width: 512px;
  width: 100%;
  margin: 0 auto;
  text-align:center;
  @media (max-width: 768px) {
    padding-bottom: 60px;
    padding-top: 60px
  }
`

const StyledIcon = styled.div`
  font-size: 96px;
  height: 96px;
  line-height: 96px;
  text-align: center;
  width: 96px;
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`
const StyledLink2 = styled.a`
  color: #f4dc27;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    color: #eeb006;
  }
  &.active {
    color: #eeb006;
  }
`

export default PageHeader