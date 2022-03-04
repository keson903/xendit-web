import { useEffect, useState } from "react";
import { Invoice } from "../../types/Invoice";

type QueryInvoiceResponse = Invoice | undefined;

type QueryInvoiceHook = [QueryInvoiceResponse];

function useQueryInvoice(id: string): QueryInvoiceHook {
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    const source = new EventSource(`http://localhost:3001/invoice/query/${id}`);

    function onMessage({ data }: { data: string }) {
      setInvoice(JSON.parse(data));
    }

    source.addEventListener("message", onMessage);

    return () => {
      source.removeEventListener("message", onMessage);
    };
  }, []);

  return [invoice];
}

export default useQueryInvoice;
