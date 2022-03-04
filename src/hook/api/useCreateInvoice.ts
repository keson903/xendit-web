import useFetch from "use-http";
import { Invoice } from "../../types/Invoice";

type CreateInvoiceFn = (amount: Number) => Promise<Invoice>;

type CreateInvoiceResponse = Invoice | undefined;

type CreateInvoiceHook = [CreateInvoiceResponse, boolean, CreateInvoiceFn];

function useCreateInvoice(): CreateInvoiceHook {
  const { post, loading, response } = useFetch<Invoice>("/invoice");

  function create(amount: Number) {
    return post({ amount });
  }

  return [response.data, loading, create];
}

export default useCreateInvoice;
