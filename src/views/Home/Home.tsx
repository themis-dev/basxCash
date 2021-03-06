import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import Notice from '../../components/Notice';
import welcome from '../../assets/img/welcome.png'

const Home: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);
    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInDAI = '-';
    }
    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash]);

  const cashAddr = useMemo(() => basisCash?.BAC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.BAS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.BAB.address, [basisCash]);

  return (
    <Page>
      <PageHeader
        icon={welcome}
        subtitle="Buy, sell, and provide liquidity for BasisX Cash and BasisX Shares on"
        titleA=" Mdex."
        title="Welcome to BasisX!"
        titleHome='Security audit report will be online soon.'
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="BasisX Cash"
          symbol="BAC"
          color="#facf09"
          supplyLabel="Circulating Supply"
          // address=''
          address={cashAddr}
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard
          title="BasisX Share"
          symbol="BAS"
          color="#EEA7ED"
          // address=''
          address={shareAddr}
          stat={share}
        />
        <Spacer size="lg" />
        <HomeCard
          title="BasisX Bond"
          symbol="BAB"
          color="#ECF25C"
          // address=''
          address={bondAddr}
          stat={bond}
        />
        <Spacer size="lg" />
        <HomeCard
            title="BasisX BTC"
            symbol="BTC"
            color="#59B9EB"
            address='airdrop'
        />
      </CardWrapper>
    </Page>
  );
};

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledNoticeContainer = styled.div`
  max-width: 768px;
  width: 90vw;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

export default Home;
