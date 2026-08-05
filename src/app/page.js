// app/page.js
// import Navbar from '@/components/Navbar';

// import Stats from '@/components/Stats';
import CompanyCard from './components/CompanyCard';
import DbblCard from './components/DbblCard';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Stats from './components/Stats';
import UploadCompanyExcel from './components/UploadCompanyExcel';
import UploadExcel from './components/UploadExcel';
import UploadCreditList from './components/UploadCreditList'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Hero />
        <Stats />
      </main>
      <UploadExcel/>
      <UploadCompanyExcel/>
      {/* <CompanyCard/> */}
      <UploadCreditList/>
      {/* <DbblCard></DbblCard> */}
      <Footer />
    </div>
  );
}