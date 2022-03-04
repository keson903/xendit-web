import { useEffect } from "react";
import useFetch from "use-http";
import { Invoice } from "../../types/Invoice";

type GetInvoiceFn = (id: string) => Promise<Invoice>;

type GetInvoiceResponse = Invoice | undefined;

type GetInvoiceHook = [GetInvoiceResponse, boolean, GetInvoiceFn];

function useGetInvoice(id?: string): GetInvoiceHook {
  const { get, loading, response } = useFetch<Invoice>();

  useEffect(() => {
    if (!id) {
      return;
    }

    refresh(id);
  }, [id]);

  function refresh(id: string) {
    return get(`/invoice/${id}`);
  }

  return [response.data, loading, refresh];
}

export default useGetInvoice;
