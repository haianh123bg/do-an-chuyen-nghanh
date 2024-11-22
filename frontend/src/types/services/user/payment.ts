

export interface PaymentRequest {
    orderId: string;
    amount: number;
    currency: string;
    description?: string; // Optional field
    paymentMethod: string;
}


export interface PaymentResponse {
    transactionId: string;
    status: string;
    paymentUrl?: string; // Optional field
}

export interface SepayIpnRequest {
    transactionId: string;
    orderId: string;
    status: string;
    signature: string;
    [key: string]: any; 
}
export interface HttpRequest {
    headers: Record<string, string>;
    body: any;
    query: Record<string, string | undefined>;
    params: Record<string, string>;
    method: string;
    url: string;
}


