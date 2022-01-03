import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

const TokenData = () => {
  useEffect(() => {    
    checkMarketplace()
  }, []);

  const checkMarketplace = async () => {
    try {
      const encoded = await fcl.send([
        fcl.script`
       import MarketplaceContract from 0xf8d6e0586b0a20c7
        pub fun main(): [UInt64] {
            let account1 = getAccount(0xf8d6e0586b0a20c7)
            let acct1saleRef = account1.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
                .borrow()
                ?? panic("Could not borrow acct2 nft sale reference")
            return acct1saleRef.getIDs()
        }
        `
      ]);
      const decoded = await fcl.decode(encoded);
      console.log(decoded); 
    } catch (error) {
      console.log("NO NFTs FOR SALE")
    }    
  }
  return (
    <div className="token-data">
      
    </div>
  );
};

export default TokenData;