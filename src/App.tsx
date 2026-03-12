import React, { useMemo, useRef, useState } from "react";
import { Instagram, Mail, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.12v13.17a2.84 2.84 0 1 1-2.84-2.84c.24 0 .47.03.69.08V9.24a5.96 5.96 0 0 0-.69-.04A5.96 5.96 0 1 0 15.82 15V8.54a7.9 7.9 0 0 0 4.62 1.49V6.95c-.29 0-.57-.03-.85-.08Z" />
    </svg>
  );
}

type ChartRow = {
  year: number;
  invested: number;
  value: number;
};

function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-8 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function InfoCard({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className={`mt-2 text-lg font-bold sm:text-xl ${valueClassName}`}>{value}</p>
    </div>
  );
}

function StatCard({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-200/60">
      <p className="text-sm text-zinc-500">{label}</p>
      <h3 className="mt-2 text-lg font-semibold sm:text-xl">{title}</h3>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-700">{label}</label>
      <input
        type="number"
        min="0"
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const nextValue = e.target.value;

          if (nextValue === "") {
            onChange("");
            return;
          }

          if (Number(nextValue) >= 0) {
            onChange(nextValue);
          }
        }}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600"
      />
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:text-blue-600"
    >
      {children}
    </a>
  );
}

function MarketBadge({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-zinc-200 bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-sm font-semibold text-zinc-700">{label}</p>
    </div>
  );
}

export default function App() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const calculatorRef = useRef<HTMLElement | null>(null);
  const connectRef = useRef<HTMLElement | null>(null);

  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculatorData = useMemo(() => {
    const init = Math.max(0, Number(initialInvestment) || 0);
    const monthly = Math.max(0, Number(monthlyContribution) || 0);
    const rate = Math.max(0, Number(interestRate) || 0);
    const yrs = Math.max(0, Number(years) || 0);

    const monthlyRate = rate / 100 / 12;
    const totalMonths = Math.floor(yrs * 12);

    let currentValue = init;
    let investedMoney = init;

    const yearlyData: ChartRow[] = [{ year: 0, invested: init, value: init }];

    for (let month = 1; month <= totalMonths; month++) {
      currentValue = currentValue * (1 + monthlyRate) + monthly;
      investedMoney += monthly;

      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          invested: Math.round(investedMoney),
          value: Math.round(currentValue),
        });
      }
    }

    const totalInvested = Math.round(investedMoney);
    const finalValue = Math.round(currentValue);
    const totalGrowth = finalValue - totalInvested;

    return {
      yearlyData,
      totalInvested,
      finalValue,
      totalGrowth,
    };
  }, [initialInvestment, monthlyContribution, interestRate, years]);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 sm:justify-end sm:px-6 sm:py-4">
          <nav className="grid w-full max-w-sm grid-cols-3 gap-2 rounded-2xl bg-zinc-100/80 p-1 text-sm font-medium text-zinc-700 sm:flex sm:w-auto sm:max-w-none sm:bg-transparent sm:p-0">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="rounded-xl px-3 py-2 transition hover:bg-white hover:text-blue-600 sm:px-0 sm:py-0 sm:hover:bg-transparent"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(calculatorRef)}
              className="rounded-xl px-3 py-2 transition hover:bg-white hover:text-blue-600 sm:px-0 sm:py-0 sm:hover:bg-transparent"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection(connectRef)}
              className="rounded-xl px-3 py-2 transition hover:bg-white hover:text-blue-600 sm:px-0 sm:py-0 sm:hover:bg-transparent"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-600 sm:text-sm">
              Finance With Panth
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Helping everyday people
              <span className="mt-1 block text-blue-600">
                build wealth through simple investing.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              I create practical content about long-term investing, ETFs, and financial
              discipline. No hype, no trading signals — just clear ideas to help people grow
              their money over time.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => scrollToSection(calculatorRef)}
                className="w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200/70 transition hover:bg-blue-700 sm:w-auto"
              >
                Compound Interest Calculator
              </button>

              <Link
                to="/ai"
                className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 sm:w-auto"
              >
                Open AI Assistant
              </Link>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center md:order-2">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-blue-200/50 blur-3xl" />
              <div className="absolute inset-0 rounded-full border border-blue-100" />
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-[6px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:h-64 sm:w-64 md:h-72 md:w-72">
                <img
                  src="/panth.JPG"
                  alt="Panthpreet Singh"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="scroll-mt-24 bg-zinc-50 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle
            title="About Me"
            description="A simple approach to long-term investing, built around discipline, consistency, and clarity."
          />

          <div className="space-y-4 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            <p>
              I am Panthpreet Singh, originally from Ludhiana, Punjab, and currently living in
              Surrey, British Columbia, Canada. I work full-time as an SAP ABAP Development
              Consultant.
            </p>
            <p>
              I have more than 7 years of investing experience across the Indian, US, and
              Canadian markets. Over the years, I have focused on understanding long-term
              investing, portfolio stability, and disciplined wealth building.
            </p>
            <p>
              My primary approach is to build stable portfolios through ETFs and fundamentally
              strong companies. I strongly believe that consistent investing and patience are the
              most reliable ways to grow wealth over time.
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Market Coverage
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <MarketBadge label="India 🇮🇳" />
              <MarketBadge label="US 🇺🇸" />
              <MarketBadge label="Canada 🇨🇦" />
            </div>
          </div>

          <div className="mt-8 rounded-[28px] bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-200/70">
            <p className="text-sm opacity-80">Experience</p>
            <h3 className="mt-1 text-xl font-bold sm:text-2xl">
              7+ Years Investing Across Global Markets
            </h3>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Focused on long-term investing through ETFs and fundamentally strong companies.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
            <StatCard label="Focus" title="Long-term investing" />
            <StatCard label="Content" title="ETFs, stocks & compounding" />
            <StatCard label="Goal" title="Make investing simple" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-[28px] border border-zinc-200/80 bg-white px-5 py-8 shadow-sm sm:px-8">
          <SectionTitle
            title="My Investing Philosophy"
            description="My approach to investing is based on simplicity, discipline, and long-term thinking. Instead of chasing quick profits, I focus on building sustainable wealth over decades."
            centered
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Approach" title="Consistency over hype" />
            <StatCard label="Mindset" title="Patience compounds wealth" />
            <StatCard label="Strategy" title="Simple beats complicated" />
          </div>
        </div>
      </section>

      <section
        id="calculator"
        ref={calculatorRef}
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16"
      >
        <SectionTitle
          eyebrow="Compound Interest Calculator"
          title="See how your money can grow over time"
          description="Enter values below to compare invested money with portfolio growth."
        />

        <div className="rounded-[28px] border border-zinc-200/80 bg-white p-3 shadow-lg shadow-zinc-200/70 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <div className="rounded-[24px] border border-zinc-200/70 bg-zinc-50 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <InputField
                  label="Initial investment"
                  placeholder="e.g. 10000"
                  value={initialInvestment}
                  onChange={setInitialInvestment}
                />
                <InputField
                  label="Monthly contribution"
                  placeholder="e.g. 500"
                  value={monthlyContribution}
                  onChange={setMonthlyContribution}
                />
                <InputField
                  label="Interest rate (% per year)"
                  placeholder="e.g. 10"
                  value={interestRate}
                  onChange={setInterestRate}
                />
                <InputField
                  label="Length of time (years)"
                  placeholder="e.g. 30"
                  value={years}
                  onChange={setYears}
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard
                  label="Total invested"
                  value={formatCurrency(calculatorData.totalInvested)}
                />
                <InfoCard
                  label="Current value"
                  value={formatCurrency(calculatorData.finalValue)}
                  valueClassName="text-blue-600"
                />
                <InfoCard
                  label="Growth earned"
                  value={formatCurrency(calculatorData.totalGrowth)}
                  valueClassName="text-emerald-600"
                />
              </div>

              <div className="mt-4 rounded-[24px] border border-zinc-200/70 bg-zinc-50 p-4 sm:p-5">
                <div className="mb-3">
                  <h3 className="text-base font-bold sm:text-lg">
                    Invested Money vs Current Value
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    See how compound growth accelerates over time.
                  </p>
                </div>

                <div className="h-[260px] w-full sm:h-[320px] md:h-[340px]">
                  {Number(years) > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={calculatorData.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis
                          width={70}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
                        />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="invested"
                          stroke="#71717a"
                          strokeWidth={3}
                          dot={false}
                          name="Invested"
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                          strokeWidth={3}
                          dot={false}
                          name="Portfolio Value"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-center text-sm text-zinc-400">
                      Enter values above to see the growth chart
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="connect"
        ref={connectRef}
        className="scroll-mt-24 border-t bg-zinc-50 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-[28px] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle
              title="Connect With Me"
              description="Follow my content across platforms."
              centered
            />

            <div className="flex flex-wrap justify-center gap-4">
              <SocialLink
                href="https://www.instagram.com/financewithpanth?igsh=MWFsaHl5NW0zcXpnbg%3D%3D"
                label="Instagram"
              >
                <Instagram className="h-7 w-7" />
              </SocialLink>

              <SocialLink href="https://tiktok.com/@financewithpanth" label="TikTok">
                <TikTokIcon className="h-7 w-7" />
              </SocialLink>

              <SocialLink href="mailto:financewithpanth@gmail.com" label="Email Panthpreet">
                <Mail className="h-7 w-7" />
              </SocialLink>

              <SocialLink
                href="https://www.facebook.com/people/Financewithpanth/61574887317013/"
                label="Facebook"
              >
                <Facebook className="h-7 w-7" />
              </SocialLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white px-4 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Finance With Panth — Educational purposes only.
      </footer>
    </div>
  );
}
