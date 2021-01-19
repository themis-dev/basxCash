import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import axios from 'ts-axios-new'
import { apiUrl } from '../../basis-cash/config';
import { commify } from 'ethers/lib/utils';
import { OverviewData, LpPoolData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';

const Info: React.FC = () => {
    const basisCash = useBasisCash();
    const instance = axios.create();
  
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

    const [{ pool2, pool3 }, setPool] = useState<LpPoolData>({});
    const fetchLPPool = useCallback(async() => {
        const data = await instance.get(apiUrl + '/bxc/num')
        const pool2 = data.data.data[0].balance
        const pool3 = data.data.data[1].balance
        setPool({ pool2, pool3 })
    }, [setPool])

    const [arr, setApyTvl] = useState<Array<any>>([]);
    const fetchApyTvl = useCallback(async() => {
        const data = await instance.get(apiUrl + '/getInfo')
        const arr = data.data.data
        // arr.map((v: { apy: any; }) => {
        //     v.apy = v.apy
        // })
        console.log(arr)
        setApyTvl(arr)
    }, [setPool])

    useEffect(() => {
        if (basisCash) {
          fetchStats().catch((err) => console.error(err.stack));
          fetchLPPool()
          fetchApyTvl()
        }
      }, [basisCash]);

    return (
        <Page>
            <StyledInfo>
                <StyledBanner>
                    <StyledFlexBanner>
                        <StyledDiv>
                            <StyledSubtitle>Next Epoch:</StyledSubtitle>
                            <StyledMinTitle>There is expected to be no supply increase based onthe current BXC TWAP of $0.000 .</StyledMinTitle>
                            {/*<StyledMinTitle style="display: none;">The supply will be increased 0.000 based on the current BXC TWAP of $0.000 .Returning NaN BXC per BXS</StyledMinTitle>*/}
                        </StyledDiv>
                    </StyledFlexBanner>
                </StyledBanner>
                <StyledInfoBox>
                    <StyledTotalMsg>
                        <StyledTotalLeftLi>
                            <StyledSection>
                                <StyledInfoBoxH3>Next Epoch</StyledInfoBoxH3>
                                <StyledInfoBoxP>-</StyledInfoBoxP>
                            </StyledSection>
                            <StyledSection>
                                <StyledInfoBoxH3>BXC Spot Price</StyledInfoBoxH3>
                                <StyledInfoBoxPRight>${cash?.priceInDAI}</StyledInfoBoxPRight>
                            </StyledSection>
                        </StyledTotalLeftLi>
                        <StyledTotalRightLi>
                            <StyledSection>
                                <StyledInfoBoxH3>BXC TWAP Price</StyledInfoBoxH3>
                                <StyledInfoBoxP>-</StyledInfoBoxP>
                            </StyledSection>
                            <StyledSection>
                                <StyledInfoBoxH3>BXC Supply</StyledInfoBoxH3>
                                <StyledInfoBoxPRight>{cash?.totalSupply}</StyledInfoBoxPRight>
                            </StyledSection>
                        </StyledTotalRightLi>
                    </StyledTotalMsg>
                    <StyledOtherMsg>
                        <StyledLeftLi>
                            <StyledInfoBoxH3>Supply</StyledInfoBoxH3>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>BXS Supply:</StyledInfoBoxP>
                                <StyledInfoBoxNum>{share?.totalSupply}</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>BXB Supply:</StyledInfoBoxP>
                                <StyledInfoBoxNum>-</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                        </StyledLeftLi>
                        <StyledRightLi>
                            <StyledInfoBoxH3>Price</StyledInfoBoxH3>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>BXS Price:</StyledInfoBoxP>
                                <StyledInfoBoxNum>${share?.priceInDAI}</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>BXB Price:</StyledInfoBoxP>
                                <StyledInfoBoxNum>-</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                        </StyledRightLi>
                    </StyledOtherMsg>
                    <StyledOtherMsg>
                        <StyledLeftLi>
                            <StyledInfoBoxH3>BXC Metrics</StyledInfoBoxH3>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>Treasury BXC:</StyledInfoBoxP>
                                <StyledInfoBoxNum>-</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>Unstaked BXC:</StyledInfoBoxP>
                                <StyledInfoBoxNum>-</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                        </StyledLeftLi>
                        <StyledRightLi>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>BXC in BXC/USDT Pool:</StyledInfoBoxP>
                                <StyledInfoBoxNum>{(pool2)}</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                            <StyledOtherMsgSection>
                                {/* <StyledInfoBoxP>BXC in BXC/HBTC Pool:</StyledInfoBoxP>
                                <StyledInfoBoxNum> 0.000</StyledInfoBoxNum> */}
                            </StyledOtherMsgSection>
                        </StyledRightLi>
                    </StyledOtherMsg>
                    <StyledOtherMsg>
                        <StyledLeftLi>
                            <StyledInfoBoxH3>BXS Metrics</StyledInfoBoxH3>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>Boardroom BXS:</StyledInfoBoxP>
                                <StyledInfoBoxNum>-</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>Unstaked BXS:</StyledInfoBoxP>
                                <StyledInfoBoxNum>-</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                        </StyledLeftLi>
                        <StyledRightLi>
                            <StyledOtherMsgSection>
                                <StyledInfoBoxP>BXS in BXS/USDT Pool:</StyledInfoBoxP>
                                <StyledInfoBoxNum>{(pool3)}</StyledInfoBoxNum>
                            </StyledOtherMsgSection>
                            <StyledOtherMsgSection>
                                {/* <StyledInfoBoxP>BXS in BXS/HBTC Pool:</StyledInfoBoxP>
                                <StyledInfoBoxNum> 0.000</StyledInfoBoxNum> */}
                            </StyledOtherMsgSection>
                        </StyledRightLi>
                    </StyledOtherMsg>
                    <StyledH2>Mdex Pool Metrics</StyledH2>
                    <StyledOtherMsg>
                        {
                            arr.map((v, k) => 
                            <StyledLeftLi1 key={k}>
                                <StyledInfoBoxH3>{v.depositTokenName}</StyledInfoBoxH3>
                                <StyledOtherMsgSection>
                                    <StyledInfoBoxP>TVL:</StyledInfoBoxP>
                                    <StyledInfoBoxNum>${commify(v.tvl)}</StyledInfoBoxNum>
                                </StyledOtherMsgSection>
                                <StyledOtherMsgSection>
                                    <StyledInfoBoxP>Yield (D/Y)*:</StyledInfoBoxP>
                                    {
                                        v.depositTokenName.toUpperCase() === 'BXC_USDT(HECO)-LP' ||  v.depositTokenName.toUpperCase() === 'BXS_USDT(HECO)-LP' ?
                                        <StyledInfoBoxNum>{share ? (v.apy * Number(share?.priceInDAI) /365).toFixed(2) +'%/' + (v.apy * Number(share?.priceInDAI)).toFixed(2) + '%': '— %'}</StyledInfoBoxNum> :
                                        <StyledInfoBoxNum>{cash ? (v.apy * Number(share?.priceInDAI) /365).toFixed(2) +'%/' + (v.apy * Number(cash?.priceInDAI)).toFixed(2) + '%': '— %'}</StyledInfoBoxNum>
                                    }
                                    {/* <StyledInfoBoxNum>{v.apy/365}% /{v.apy* Number(cash?.priceInDAI)}%</StyledInfoBoxNum> */}
                                </StyledOtherMsgSection>
                                <StyledOtherMsgSection>
                                    <StyledInfoBoxP>Rewards Remaining:</StyledInfoBoxP>
                                    <StyledInfoBoxNum>{v.remain} BXS</StyledInfoBoxNum>
                                </StyledOtherMsgSection>
                            </StyledLeftLi1>
                            )
                        }
                    </StyledOtherMsg>
                </StyledInfoBox>
            </StyledInfo>
        </Page>
    );
};

const StyledDiv = styled.div`
`;
const StyledInfo = styled.div`
    width:100%;
    @media (max-width: 768px) {
        margin-top:60px
    }
`;

const StyledBanner = styled.div`
  padding-top: 30px;
  padding-bottom: 150px;
`;

const StyledFlexBanner = styled.div`
    max-width: 960px;
    width: 90vw;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;


const StyledSubtitle = styled.h3`
  font-size: 36px;
  color: #fff;
  @media (max-width: 768px) {
       padding 0 20px
    }
`

const StyledMinTitle = styled.p`
    margin-top: 30px;
    color: #fff;
    font-size:16px
    @media (max-width: 768px) {
       padding 0 20px
    }
`
const StyledInfoBox = styled.div`
 position: relative;
    top: -80px;
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 2px 20px 0 hsla(0,0%,80%,.5);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 50px 30px;
    @media (max-width: 768px) {
       padding: 30px 20px;
       width: 90%;
    }
`;

const StyledTotalMsg = styled.ul`
    padding:0;
    margin:0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
     @media (max-width: 768px) {
       flex-direction: column;
       align-items: center;
    }
`

const StyledTotalLeftLi = styled.li`
   margin-right: 50px;
   font-size: 16px;
    color: #333;
    flex: 1 1 0%;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
     @media (max-width: 768px) {
       margin-right: 0;
       flex-direction: column;
       width:100%
    }
`
const StyledTotalRightLi = styled.li`
   margin-left: 50px;
   font-size: 16px;
    color: #333;
    flex: 1 1 0%;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
       margin-left: 0;
        width:100%;
        flex-direction: column;
    }
`

const StyledLeftLi = styled.li`
   margin-right: 50px;
   font-size: 16px;
    color: #333;
    flex: 1 1 0%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
     @media (max-width: 768px) {
       margin-right: 0;
       flex-direction: column;
        width:100%
    }
`

const StyledLeftLi1 = styled.li`
//    margin-right: 50px;
   font-size: 16px;
    color: #333;
    // flex: 1 1 0%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    width: 43%;
    margin-bottom: 20px;
     @media (max-width: 768px) {
       margin-right: 0;
       flex-direction: column;
        width:100%
    }
`
const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
     @media (max-width: 768px) {
      justify-content: space-between;
      flex-direction: row;
    }
`

const StyledInfoBoxH3 = styled.h3`
 font-size: 18px;
    color: #7896f6;
    margin-bottom: 5px;
    margin-top:0
`
const StyledInfoBoxP = styled.p`
    color: #333;
    margin-top: 5px;
    font-size: 16px;
    margin-bottom:0
`

const StyledInfoBoxNum = styled.p`
    color: #333;
    margin-top: 5px;
    font-size: 16px;
    margin-bottom:0;
    @media (max-width: 768px) {
       max-width:150px;
       word-break:break-all
    }
`

const StyledInfoBoxPRight = styled.p`
    color: #333;
    margin-top: 5px;
    font-size: 16px;
    margin-bottom:0;
     @media (max-width: 768px) {
       text-align:right;
    }
`
const StyledRightLi = styled.li`
   margin-left: 50px;
   font-size: 16px;
    color: #333;
    flex: 1 1 0%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
     @media (max-width: 768px) {
       margin-left: 0;
        width:100%
    }
`
const StyledOtherMsg = styled.ul` 
    padding:0;
    margin:0;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    
`
const StyledOtherMsgSection = styled.section`
    margin-bottom: 5px;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
`

const StyledH2 = styled.h2` 
    font-size: 22px;
    color: #7896f6;
    margin-top: 20px;
`
export default Info;
