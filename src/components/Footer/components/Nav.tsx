import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href= {buyBAS} target="_blank">Get BXS</StyledLink>
      <StyledLink href= {buyBAC} target="_blank">Get BXC</StyledLink>
      <StyledLink href="https://github.com/Basis-Cash" target="_blank">GitHub</StyledLink>
      {/* <StyledLink href="https://twitter.com/BasisCash" target="_blank">Twitter</StyledLink> */}
      <StyledLink href="https://t.me/basiscash" target="_blank">Telegram</StyledLink>
      {/* <StyledLink href="https://discord.gg/UEZq3HF5Eu" target="_blank">Discord</StyledLink> */}
      {/* <StyledLink href="https://medium.com/basis-cash" target="_blank">Medium</StyledLink> */}
      {/* <StyledLink href="https://www.dropbox.com/s/ed5vxvaple5e740/REP-Basis-Cash-06_11_2020.pdf?dl=0" target="_blank">Audit</StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[400]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  },
  display:inline-block;
  margin-bottom:10px
 
`
const buyBAS ="https://app.daoswap.pro/#/swap";
const buyBAC= "https://app.daoswap.pro/#/swap"
export default Nav
