import { useEffect, useState } from "react";
import { checkDatabaseConnection } from "../lib/supabase";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function DatabaseConnectionStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">(
    "checking",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const result = await checkDatabaseConnection();
      if (result.success) {
        setStatus("connected");
      } else {
        setStatus("error");
        setErrorMessage(result.error?.message || "Unknown error");
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-4 rounded-md border">
      <h3 className="text-lg font-medium mb-2">Database Connection Status</h3>
      {status === "checking" && (
        <div className="flex items-center text-yellow-600">
          <span className="animate-pulse mr-2">●</span>
          <span>Checking connection...</span>
        </div>
      )}
      {status === "connected" && (
        <div className="flex items-center text-green-600">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Connected to Supabase database</span>
        </div>
      )}
      {status === "error" && (
        <div>
          <div className="flex items-center text-red-600 mb-1">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>Connection error</span>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
