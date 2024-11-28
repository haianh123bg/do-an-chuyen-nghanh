
export interface PaymentRequest {
    course: CourseRequest[];
    discountId?: number; 
}

export interface CourseRequest {
    courseId: number;
}

export interface PaymentResponse {
    qrCode: string;
    bankCode: string;
    bankName: string;
    bankIcon: string;
    accountNumber: string;
    accountName: string;
    total: number;
    description: string;
}


export interface SepayIpnRequest {
    gateway: string;             
    transactionDate: string;    
    accountNumber: string;       
    subAccount: string;          
    code: string | null;         
    content: string;            
    transferType: string;        
    description: string;         
    transferAmount: number;     
    referenceCode: string;       
    accumulated: number;         
    id: number;                  
}



