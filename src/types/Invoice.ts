export interface AvailableBank {
  bank_code: string;
  collection_type: string;
  transfer_amount: number;
  bank_branch: string;
  account_holder_name: string;
  identity_amount: number;
}

export interface AvailableEwallet {
  ewallet_type: string;
}

export type InvoiceStatus = "SETTLED" | "PENDING" | "PAID";

export interface Invoice {
  id: string;
  external_id: string;
  user_id: string;
  status: InvoiceStatus;
  merchant_name: string;
  merchant_profile_picture_url: string;
  amount: number;
  paid_amount: number;
  expiry_date: Date;
  invoice_url: string;
  available_banks: AvailableBank[];
  available_ewallets: AvailableEwallet[];
  available_paylaters: any[];
  should_exclude_credit_card: boolean;
  should_send_email: boolean;
  created: Date;
  updated: Date;
  currency: string;
  reminder_date: Date;
  paid_at: Date;
  payment_method: string;
}
