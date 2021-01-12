import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      console.log(amount)
      handleTransactionReceipt(
        basisCash.stakeShareToBoardroom(amount),
        `Stake ${amount} BXS to the boardroom`,
      );
    },
    [basisCash],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
