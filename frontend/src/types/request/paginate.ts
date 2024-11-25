export interface paginate {
    page_no?: number;
    page_size?: number;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    search_key?: string;
    begin?: Date;
    end?: Date;
}
