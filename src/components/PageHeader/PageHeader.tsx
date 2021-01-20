import React from 'react'
import styled from 'styled-components'

interface PageHeaderProps {
  icon?: string,
  subtitle?: string,
  subtitle1?: string,
  title?: string,
  titleA?:string,
  titleB?:string,
  titleC?:string,
  titleHome?:string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title, titleA, titleHome, titleB, titleC, subtitle1 }) => {
  return (
    <StyledPageHeader>
        <img src={icon} alt="home icon"/>
      {/*<StyledIcon>{icon}</StyledIcon>*/}
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
      <StyledSubtitle>{subtitle1}</StyledSubtitle>
      {titleA &&
       <div>
         <StyledLink2 href="https://ht.mdex.com/#/swap?outputCurrency=0x15F4c382926F8A083bC924AbD3aa84Ce3982CAa9&inputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a" target="_blank">{titleA} </StyledLink2> 
         <StyledLink2 href="https://ht.mdex.com/#/swap?outputCurrency=0xbe0e001A5553f4421DC250A20bBdAb0e735495e3&inputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a" target="_blank">{titleB} </StyledLink2> 
       </div>
       }
      {/* <StyledSubtitle>{subtitle}</StyledSubtitle> */}
      <StyledSubtitle>BasisX is<StyledLink3 href='https://github.com/basisx-io/contracts/blob/main/README.md'>{titleC}</StyledLink3> Stay tuned for security audit.</StyledSubtitle>
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
  // text-decoration: none;
  margin-left: 10px;
  &:hover {
    color: #eeb006;
  }
  &.active {
    color: #eeb006;
  }
`
const StyledLink3 = styled.a`
color: #f4dc27;
  font-weight: 700;
  // text-decoration: none;
  margin-left: 5px;
  &:hover {
    color: #eeb006;
  }
  &.active {
    color: #eeb006;
  }
  @media (max-width: 768px) {
    margin-left: 4px;
  }
`

export default PageHeader
