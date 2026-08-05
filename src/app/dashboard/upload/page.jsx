import UploadExcel from "@/app/components/UploadExcel";
// import UploadCompanyExcel from "@/components/UploadCompanyExcel";

import UploadCompanyExcel from "@/app/components/UploadCompanyExcel";
import UploadCreditCard from "@/app/components/UploadCreditList";
import UploadCreditList from "@/app/components/UploadCreditList";


export default function UploadPage(){

 return(

  <div className="space-y-5">


    <UploadExcel />


    <UploadCompanyExcel />
    <UploadCreditList/>
 
  </div>

 )

}