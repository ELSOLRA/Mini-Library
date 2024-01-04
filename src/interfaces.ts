//------ Information for a book
export interface Book {
    id: number;
    title: string;
    author: string;
    color: string;  
}

//------ Detailed information about a book
export interface BookDetails {
    title: string;
    author: string;
    plot: string;
    audience: string;
    year: number;
    pages?: number | null;
    publisher: string;
}