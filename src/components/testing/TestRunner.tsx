
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Play } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { runAllTestScenarios, runTestScenario, getAvailableTestScenarios } from '@/lib/testing-scenarios';

type TestResult = {
  passed: boolean;
  message: string;
  data?: any;
};

const TestRunner = () => {
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Record<string, TestResult> | null>(null);
  const [singleResult, setSingleResult] = useState<TestResult | null>(null);

  const handleRunAll = async () => {
    setRunning(true);
    setResults(null);
    setSingleResult(null);
    
    try {
      const allResults = await runAllTestScenarios();
      setResults(allResults);
    } catch (error) {
      console.error("Error running tests:", error);
    } finally {
      setRunning(false);
    }
  };

  const handleRunSingle = async () => {
    if (!selectedTest) return;
    
    setRunning(true);
    setResults(null);
    setSingleResult(null);
    
    try {
      const result = await runTestScenario(selectedTest);
      if (result) {
        setSingleResult(result);
      }
    } catch (error) {
      console.error(`Error running test "${selectedTest}":`, error);
    } finally {
      setRunning(false);
    }
  };

  const formatData = (data: any): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return "Could not format data";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Test Runner</CardTitle>
        <CardDescription>Run tests to validate interactions functionality</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <Select
                value={selectedTest}
                onValueChange={(value) => setSelectedTest(value)}
                disabled={running}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTestScenarios().map((test) => (
                    <SelectItem key={test} value={test}>
                      {test}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleRunSingle} 
                disabled={!selectedTest || running}
                className="w-full sm:w-auto"
              >
                <Play className="mr-2 h-4 w-4" />
                Run Selected
              </Button>
              <Button 
                onClick={handleRunAll} 
                disabled={running}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Run All Tests
              </Button>
            </div>
          </div>

          {running && (
            <Alert>
              <AlertTitle>Running tests...</AlertTitle>
              <AlertDescription>Please wait while the tests are executed.</AlertDescription>
            </Alert>
          )}

          {singleResult && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  {singleResult.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <span className="font-medium">{selectedTest}</span>
                <span className={singleResult.passed ? "text-green-500" : "text-red-500"}>
                  {singleResult.passed ? "PASSED" : "FAILED"}
                </span>
              </div>
              <p className="text-sm text-gray-600">{singleResult.message}</p>
              
              {singleResult.data && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Test Data:</p>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <pre className="text-xs">{formatData(singleResult.data)}</pre>
                  </ScrollArea>
                </div>
              )}
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <h3 className="font-medium">All Test Results</h3>
              <div className="divide-y">
                {Object.entries(results).map(([name, result]) => (
                  <div key={name} className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {result.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <span className="font-medium">{name}</span>
                      <span className={result.passed ? "text-green-500" : "text-red-500"}>
                        {result.passed ? "PASSED" : "FAILED"}
                      </span>
                    </div>
                    <p className="ml-7 text-sm text-gray-600">{result.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">
          These tests validate the functionality of interaction utilities
        </p>
      </CardFooter>
    </Card>
  );
};

export default TestRunner;
