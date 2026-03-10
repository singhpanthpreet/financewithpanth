import React, { useMemo, useRef, useState } from "react";
import { Instagram, Mail, Facebook } from "lucide-react";
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

export default function FinanceWithPanthAboutPage() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const calculatorRef = useRef<HTMLElement | null>(null);
  const connectRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (ref: { current: HTMLElement | null }) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculatorData = useMemo(() => {
    const init = Number(initialInvestment) || 0;
    const monthly = Number(monthlyContribution) || 0;
    const rate = Number(interestRate) || 0;
    const yrs = Number(years) || 0;

    const annualRate = rate / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = yrs * 12;

    let currentValue = init;
    let investedMoney = init;

    const yearlyData: { year: number; invested: number; value: number }[] = [
      { year: 0, invested: init, value: init },
    ];

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

    return { yearlyData, totalInvested, finalValue, totalGrowth };
  }, [initialInvestment, monthlyContribution, interestRate, years]);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-bold">Finance With Panth</div>

          <nav className="flex items-center gap-6 text-sm font-medium text-zinc-700">
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-blue-600">
              About
            </button>
            <button onClick={() => scrollToSection(calculatorRef)} className="hover:text-blue-600">
              Calculator
            </button>
            <button onClick={() => scrollToSection(connectRef)} className="hover:text-blue-600">
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Finance With Panth
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Helping everyday people
              <span className="block text-blue-600">build wealth through simple investing.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              I create practical content about long-term investing, ETFs, and financial discipline.
              No hype, no trading signals — just clear ideas to help people grow their money over time.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection(calculatorRef)}
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-blue-700"
              >
                Compound Interest Calculator
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-blue-200/40 blur-2xl"></div>
              <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white shadow-2xl">
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

      {/* ABOUT ME */}
      <section id="about" ref={aboutRef} className="bg-zinc-50 scroll-mt-24 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">About Me</h2>

          <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-600">
            <p>
              I am Panthpreet Singh, originally from Ludhiana, Punjab, and currently living in
              Surrey, British Columbia, Canada. I work full-time as an SAP ABAP Development
              Consultant.
            </p>
            <p>
              I have more than 7 years of investing experience across the Indian, US, and Canadian
              markets. Over the years, I have focused on understanding long-term investing,
              portfolio stability, and disciplined wealth building.
            </p>
            <p>
              My primary approach is to build stable portfolios through ETFs and fundamentally
              strong companies. I strongly believe that consistent investing and patience are the
              most reliable ways to grow wealth over time.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
              India 🇮🇳 Market
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
              US 🇺🇸 Market
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
              Canada 🇨🇦 Market
            </span>
          </div>

          <div className="mt-8 rounded-3xl bg-blue-600 p-6 text-white shadow-lg">
            <p className="text-sm opacity-80">Experience</p>
            <h3 className="mt-1 text-2xl font-bold">7+ Years Investing Across Global Markets</h3>
            <p className="mt-2 text-sm text-blue-100">
              Focused on long-term investing through ETFs and fundamentally strong companies.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <p className="text-sm text-zinc-500">Focus</p>
              <h3 className="mt-2 text-xl font-semibold">Long-term investing</h3>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <p className="text-sm text-zinc-500">Content</p>
              <h3 className="mt-2 text-xl font-semibold">ETFs, stocks & compounding</h3>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <p className="text-sm text-zinc-500">Goal</p>
              <h3 className="mt-2 text-xl font-semibold">Make investing simple</h3>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTING PHILOSOPHY */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">My Investing Philosophy</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            My approach to investing is based on simplicity, discipline, and long-term thinking.
            Instead of chasing quick profits, I focus on building sustainable wealth over decades.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Long-Term Focus</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Invest with a horizon of decades, not days or weeks.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">ETF First Approach</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Core portfolio built using diversified ETFs.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Strong Companies</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Add fundamentally strong companies for long-term growth.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Power of Compounding</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Consistency and patience allow compounding to work over time.
            </p>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section
        id="calculator"
        ref={calculatorRef}
        className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16"
      >
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Compound Interest Calculator
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            See how your money can grow over time
          </h2>

          <p className="mt-3 text-base leading-7 text-zinc-600">
            Enter values below to compare invested money with portfolio growth.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
            <div className="rounded-3xl bg-zinc-50 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">
                    Initial investment
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">
                    Monthly contribution
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">
                    Interest rate (% per year)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">
                    Length of time (years)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 30"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
                  <p className="text-sm text-zinc-500">Total invested</p>
                  <p className="mt-2 text-xl font-bold">
                    {formatCurrency(calculatorData.totalInvested)}
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
                  <p className="text-sm text-zinc-500">Current value</p>
                  <p className="mt-2 text-xl font-bold text-blue-600">
                    {formatCurrency(calculatorData.finalValue)}
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
                  <p className="text-sm text-zinc-500">Growth earned</p>
                  <p className="mt-2 text-xl font-bold text-emerald-600">
                    {formatCurrency(calculatorData.totalGrowth)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl bg-zinc-50 p-4 sm:p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-bold">Invested Money vs Current Value</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    See how compound growth accelerates over time.
                  </p>
                </div>

                <div className="h-[300px] w-full sm:h-[340px]">
                  {Number(years) > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={calculatorData.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
                          width={80}
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
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                          strokeWidth={3}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-400">
                      Enter values above to see the growth chart
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section id="connect" ref={connectRef} className="border-t bg-zinc-50 scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Connect With Me</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Follow my content across platforms.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <a
              href="https://www.instagram.com/financewithpanth?igsh=MWFsaHl5NW0zcXpnbg%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 transition hover:text-pink-600"
            >
              <Instagram className="h-8 w-8" />
            </a>

            <a
              href="https://tiktok.com/@financewithpanth"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 transition hover:text-black"
            >
              <TikTokIcon className="h-8 w-8" />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=financeiwthpanth@gmail.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Email Panthpreet"
              title="Email Panthpreet"
              className="text-zinc-700 transition hover:text-blue-600"
            >
              <Mail className="h-8 w-8" />
            </a>

            <a
              href="https://www.facebook.com/people/Financewithpanth/61574887317013/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 transition hover:text-blue-700"
            >
              <Facebook className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Finance With Panth — Educational purposes only.
      </footer>
    </div>
  );
}
