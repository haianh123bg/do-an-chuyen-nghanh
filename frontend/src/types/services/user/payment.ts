

export interface PaymentRequest {
    orderId: string;
    amount: number;
    currency: string;
    description?: string;
    paymentMethod: string;
}


export interface PaymentResponse {
    transactionId: string;
    status: string;
    paymentUrl?: string;
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


