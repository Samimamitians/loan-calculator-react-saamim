import { useState, useCallback } from 'react';

const useEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState(null);

  // Calculate EMI using the formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = useCallback(() => {
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / 12 / 100;
    const totalMonths = parseFloat(loanTerm) * 12;

    if (principal > 0 && ratePerMonth > 0 && totalMonths > 0) {
      const x = Math.pow(1 + ratePerMonth, totalMonths);
      const monthlyPayment = (principal * ratePerMonth * x) / (x - 1);
      const totalPayment = monthlyPayment * totalMonths;
      const totalInterest = totalPayment - principal;

      // Generate amortization schedule
      const schedule = generateAmortizationSchedule(
        principal,
        ratePerMonth,
        monthlyPayment,
        totalMonths
      );

      setResults({
        monthlyPayment,
        totalPayment,
        totalInterest,
        amortizationSchedule: schedule
      });

      return {
        monthlyPayment,
        totalPayment,
        totalInterest,
        amortizationSchedule: schedule
      };
    }

    return null;
  }, [loanAmount, interestRate, loanTerm]);

  // Generate amortization schedule
  const generateAmortizationSchedule = (principal, ratePerMonth, monthlyPayment, totalMonths) => {
    let balance = principal;
    let totalInterestPaid = 0;
    const schedule = [];

    for (let month = 1; month <= totalMonths && balance > 0; month++) {
      const interestForMonth = balance * ratePerMonth;
      const principalForMonth = monthlyPayment - interestForMonth;
      
      // Adjust for final payment
      const adjustedPrincipal = Math.min(principalForMonth, balance);
      balance -= adjustedPrincipal;
      totalInterestPaid += interestForMonth;

      // Only add yearly entries, first month, and last month to keep the table manageable
      if (month === 1 || month === totalMonths || month % 12 === 0 || balance <= 0) {
        schedule.push({
          month,
          payment: monthlyPayment,
          principalPaid: adjustedPrincipal,
          interestPaid: interestForMonth,
          totalInterestPaid,
          remainingBalance: Math.max(0, balance)
        });
      }
    }

    return schedule;
  };

  const resetCalculator = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
  };

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    results,
    calculateEMI,
    resetCalculator
  };
};

export default useEMICalculator;