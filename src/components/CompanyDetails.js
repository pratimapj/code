import React from 'react';
 import { useSelector } from 'react-redux';


const CompanyDetails = () => {
     const companyInfo = useSelector((state) => state?.data?.companyInfo);
    //  const companyInfo ={}
    console.log('companyInfo hhh', companyInfo)
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
        <div style={{display:'flex', flexDirection:'column'}}>
         <span style={{fontSize:24, fontWeight:'600'}}>{companyInfo?.companyName}</span>
         <span>{companyInfo?.companyMotto}</span>
        </div>
        <span>Since : {companyInfo ? new Date(companyInfo?.companyEst).toLocaleDateString() : ''}</span>
    </div>
  );
};

export default CompanyDetails;
