"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Info, DollarSign, Users, Building, Percent, Briefcase, WalletIcon } from 'lucide-react';

interface ContributionResult {
  label: string;
  value: string;
  icon: React.ElementType;
  details?: string;
}

export default function LankaCalc() {
  const [totalEarnings, setTotalEarnings] = useState<number | string>('');
  const [employeeEPF, setEmployeeEPF] = useState<number>(0);
  const [employerEPF, setEmployerEPF] = useState<number>(0);
  const [employerETF, setEmployerETF] = useState<number>(0);
  const [totalEPF, setTotalEPF] = useState<number>(0);
  const [netSalary, setNetSalary] = useState<number>(0);

  useEffect(() => {
    const earnings = parseFloat(totalEarnings as string);

    if (isNaN(earnings) || earnings < 0) {
      setEmployeeEPF(0);
      setEmployerEPF(0);
      setEmployerETF(0);
      setTotalEPF(0);
      setNetSalary(0);
      return;
    }

    const calculatedEmployeeEPF = earnings * 0.08;
    const calculatedEmployerEPF = earnings * 0.12;
    const calculatedEmployerETF = earnings * 0.03;

    setEmployeeEPF(calculatedEmployeeEPF);
    setEmployerEPF(calculatedEmployerEPF);
    setEmployerETF(calculatedEmployerETF);
    setTotalEPF(calculatedEmployeeEPF + calculatedEmployerEPF);
    setNetSalary(earnings - calculatedEmployeeEPF);

  }, [totalEarnings]);

  const handleEarningsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setTotalEarnings(value);
    }
  };
  
  const formatCurrency = (value: number) => {
    if (isNaN(value)) return "LKR 0.00";
    return `LKR ${value.toFixed(2)}`;
  };

  const contributionItems: ContributionResult[] = [
    { label: "Employee EPF", value: formatCurrency(employeeEPF), icon: Users, details: "8% of Total Earnings" },
    { label: "Employer EPF", value: formatCurrency(employerEPF), icon: Building, details: "12% of Total Earnings" },
    { label: "Employer ETF", value: formatCurrency(employerETF), icon: Briefcase, details: "3% of Total Earnings" },
  ];

  const summaryItems: ContributionResult[] = [
    { label: "Total EPF Contribution", value: formatCurrency(totalEPF), icon: Percent, details: "Employee (8%) + Employer (12%) = 20%" },
    { label: "Net Salary (Take-Home)", value: formatCurrency(netSalary), icon: WalletIcon, details: "Total Earnings - Employee EPF" },
  ];

  const earningsTooltipText = "Total earnings include your basic salary plus any fixed allowances. Overtime payments and bonuses are typically excluded for EPF/ETF calculation purposes, but consult official guidelines for specifics.";

  return (
    <TooltipProvider>
      <Card className="w-full max-w-lg shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">LankaCalc V01</CardTitle>
          <CardDescription className="text-muted-foreground">
            EPF & ETF Contribution Calculator for Sri Lanka
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="totalEarnings" className="text-lg font-medium">Total Monthly Earnings (LKR)</Label>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button type="button" aria-label="Earnings information">
                    <Info className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs shadow-lg" side="top">
                  <p>{earningsTooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="totalEarnings"
              type="text" // Use text to allow empty string and better control parsing
              inputMode="decimal"
              placeholder="e.g., 50000"
              value={totalEarnings}
              onChange={handleEarningsChange}
              className="text-lg h-12 focus:ring-accent focus:border-accent"
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-headline font-semibold mb-4 text-primary">Contribution Breakdown</h3>
            <div className="space-y-3">
              {contributionItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center">
                    <item.icon className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      {item.details && <p className="text-xs text-muted-foreground">{item.details}</p>}
                    </div>
                  </div>
                  <p className="font-semibold text-lg text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-headline font-semibold mb-4 text-primary">Salary Summary</h3>
            <div className="space-y-3">
              {summaryItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center">
                    <item.icon className="h-6 w-6 mr-3 text-accent" />
                     <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      {item.details && <p className="text-xs text-muted-foreground">{item.details}</p>}
                    </div>
                  </div>
                  <p className="font-semibold text-lg text-accent">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
