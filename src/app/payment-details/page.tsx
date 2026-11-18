import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { CreditCard, Building2, QrCode, ShieldCheck, AlertCircle } from "lucide-react";

export default function PaymentDetailsPage() {
  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container size="narrow">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Verified Bank Accounts</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Payment Details
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Official corporate bank accounts and verified UPI handles for remitting booking tokens and trip package balances.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="py-14">
        <div className="flex flex-col gap-8">
          {/* Bank Transfer Box */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#14140f] shadow-card flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-[#f0f0eb] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#14140f]">Bank Transfer (NEFT / RTGS / IMPS)</h3>
                <span className="text-xs text-[#6b6b63] font-semibold">Current Account for Corporate Invoicing</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block mb-1">Beneficiary Name</span>
                <strong className="text-base font-extrabold text-[#14140f]">Awara Banjara Adventure (OPC) Pvt. Ltd.</strong>
              </div>

              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block mb-1">Bank Name</span>
                <strong className="text-base font-extrabold text-[#14140f]">HDFC Bank Ltd.</strong>
              </div>

              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block mb-1">Account Number</span>
                <strong className="text-base font-extrabold text-[#14140f] font-mono">50200084920194</strong>
              </div>

              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block mb-1">IFSC Code</span>
                <strong className="text-base font-extrabold text-[#14140f] font-mono">HDFC0001234</strong>
              </div>
            </div>
          </div>

          {/* UPI Payments */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#14140f] shadow-card flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-[#f0f0eb] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold border border-[#14140f]">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#14140f]">UPI Payments</h3>
                <span className="text-xs text-[#6b6b63] font-semibold">Google Pay · PhonePe · Paytm · BHIM</span>
              </div>
            </div>

            <div className="bg-[#f6f6f1] p-6 rounded-2xl border border-[#e2e2dc] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block mb-1">Verified UPI ID</span>
                <strong className="text-lg sm:text-xl font-extrabold text-[#14140f] font-mono">awarabanjara@hdfcbank</strong>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-[#14140f] text-[#d6ff3f] px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#2fa84f]" />
                <span>Verified Business Merchant</span>
              </div>
            </div>
          </div>

          {/* Warning / Important note */}
          <div className="bg-[#fff9e6] rounded-2xl p-6 border border-[#ffe082] flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#78350f] leading-relaxed">
              <strong>Important Notice:</strong> After remitting your 10% token or balance transfer, kindly capture a screenshot of your payment receipt and share it via WhatsApp at <strong>+91 9103910523</strong> along with your Full Name and Booked Trip Title to receive your instant digital booking voucher.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
